import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Preloader from './components/Preloader'
import FiberProgress from './components/FiberProgress'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import WhatsAppButton from './components/common/WhatsAppButton/WhatsAppButton'
import ProductsPage from './pages/ProductsPage'
import GalleryPage from './pages/GalleryPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

function AppContent() {
  const location = useLocation()
  
  return (
    <div className="bg-deep-space text-white min-h-screen">
      <FiberProgress />
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            } 
          />
          <Route 
            path="/products" 
            element={
              <PageTransition>
                <ProductsPage />
              </PageTransition>
            } 
          />
          <Route 
            path="/gallery" 
            element={
              <PageTransition>
                <GalleryPage />
              </PageTransition>
            } 
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(33)

  useEffect(() => {
    document.body.style.opacity = '1'

    const timer1 = setTimeout(() => {
      setProgress(100)
    }, 2500)

    const timer2 = setTimeout(() => {
      setLoading(false)
    }, 3300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (loading) {
    return <Preloader progress={progress} />
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}
