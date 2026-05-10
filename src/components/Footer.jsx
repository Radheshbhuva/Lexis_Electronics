import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-deep-space border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-beacon-pulse absolute inline-flex h-full w-full rounded-full bg-lexis-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-lexis-gold"></span>
              </span>
              <span className="text-xl font-bold font-space-grotesk text-white">LEXIS ELECTRONICS</span>
            </div>
            <p className="text-white/60 text-sm max-w-md">
              Leading manufacturer of LED Flood Lights, Street Lights, Highbay Lights & Commercial Lighting Solutions in Surat, Gujarat since 2011. Premium quality, advanced technology.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Products', path: '/products' },
                { name: 'About Us', path: '/#about' },
                { name: 'Gallery', path: '/#gallery' },
                { name: 'Reviews', path: '/#reviews' },
                { name: 'Contact', path: '/#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-lexis-gold text-sm transition-colors inline-block"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {[
                { icon: <Facebook className="w-5 h-5" />, href: '#' },
                { icon: <Instagram className="w-5 h-5" />, href: '#' },
                { icon: <Youtube className="w-5 h-5" />, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-lexis-gold hover:border-lexis-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Lexis Electronics. All rights reserved.
            </p>
          </div>
        </div>

        {/* Photon Line Separator */}
        <div className="photon-line mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
          <span>Made with ❤️ in Surat, Gujarat</span>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-white/60 hover:text-lexis-gold transition-colors"
          >
            <span>Scroll to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
