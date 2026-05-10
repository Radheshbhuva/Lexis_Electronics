import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Import new components
import StoryCanvas from '@/components/sections/StoryCanvas'
import ProductShowcase from '@/components/sections/ProductShowcase'
import ImageTransitionWall from '@/components/sections/ImageTransitionWall'
import TrustConstellation from '@/components/sections/TrustConstellation'
import ContactBeacon from '@/components/sections/ContactBeacon'

export default function HomePage() {
  return (
    <div className="bg-deep-space text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-photon-blue/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lexis-gold/10 rounded-full filter blur-3xl animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-widest text-photon-blue font-semibold mb-4 block">
              Illuminating the Future
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-space-grotesk mb-6 leading-tight">
              Premium LED Lighting <br />
              <span className="light-text">Engineered for Excellence</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-10 font-inter">
              Leading manufacturer of industrial and commercial LED solutions in Surat, Gujarat. 
              We deliver cutting-edge technology, unmatched efficiency, and durability since 2011.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/products" className="glow-button flex items-center">
              Explore Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="#contact" className="px-8 py-4 rounded-full border border-white/10 hover:border-lexis-gold hover:text-lexis-gold transition-all duration-300 backdrop-blur-sm">
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="photon-line" />
        </div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Story Canvas (About) */}
      <StoryCanvas />

      {/* Image Transition Wall (Gallery) */}
      <ImageTransitionWall />

      {/* Trust Constellation (Reviews) */}
      <TrustConstellation />

      {/* Contact Beacon */}
      <ContactBeacon />
    </div>
  )
}
