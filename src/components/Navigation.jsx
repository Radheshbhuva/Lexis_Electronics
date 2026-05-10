import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/#about' },
  { name: 'Reviews', path: '/#reviews' },
  { name: 'Contact', path: '/#contact' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    return (location.pathname + location.hash) === path;
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-deep-space/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-beacon-pulse absolute inline-flex h-full w-full rounded-full bg-lexis-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lexis-gold"></span>
            </span>
            <span className="text-xl font-bold font-space-grotesk light-text">LEXIS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div 
              className="flex space-x-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link
                    to={item.path}
                    className={`relative group font-medium text-sm transition-colors hover:text-lexis-gold ${
                      isActive(item.path) ? 'text-lexis-gold' : 'text-white/70'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute left-0 -bottom-1 h-0.5 bg-lexis-gold transition-all duration-300 ${
                      isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <div className="flex items-center space-x-4">
              <a href="tel:09601291330" className="flex items-center text-sm text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                096012 91330
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-lexis-gold transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-deep-space/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium transition-colors hover:text-lexis-gold ${
                    isActive(item.path) ? 'text-lexis-gold' : 'text-white/70'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <a href="tel:09601291330" className="flex items-center text-white/70 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  096012 91330
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
