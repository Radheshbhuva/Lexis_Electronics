import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Zap, Shield, Thermometer, Star, Lightbulb, Scale } from 'lucide-react'

export default function ProductQuickView({ product, onClose }) {
  const [activeTab, setActiveTab] = useState('specs')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-deep-space/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div 
        className="glass-card-strong w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col md:flex-row"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 z-20"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image/Glow */}
        <div className="w-full md:w-1/2 bg-white/5 flex items-center justify-center relative overflow-hidden min-h-[300px] md:min-h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-photon-blue/10 to-lexis-gold/10" />
          <div className="absolute w-64 h-64 bg-photon-blue/20 rounded-full filter blur-3xl animate-pulse" />
          <Lightbulb className="w-32 h-32 text-lexis-gold/50 relative z-10" />
          
          {product.badge && (
            <span className="absolute top-6 left-6 text-xs font-semibold uppercase tracking-wider bg-lexis-gold text-deep-space px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-photon-blue uppercase tracking-widest text-xs font-semibold">
                {product.subCategory}
              </span>
              <div className="flex items-center gap-1 text-lexis-gold">
                <Star size={16} className="fill-current" />
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-white/40 text-xs">({product.reviews})</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold font-space-grotesk mb-2">{product.name}</h2>
            <div className="text-2xl font-bold text-lexis-gold">₹{product.price.toLocaleString()}</div>
          </div>

          <p className="text-white/60 text-sm mb-6">{product.description}</p>

          {/* Tabs */}
          <div className="flex border-b border-white/5 mb-6">
            {['specs', 'features', 'applications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-grow py-2 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-photon-blue"
                    layoutId="quickViewTab"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              {activeTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="grid grid-cols-2 gap-4 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-photon-blue" />
                    <div>
                      <p className="text-white/40 text-xs">Power</p>
                      <p className="font-semibold">{product.specs.wattage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-lexis-gold" />
                    <div>
                      <p className="text-white/40 text-xs">Lumens</p>
                      <p className="font-semibold">{product.specs.lumens}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-green-500" />
                    <div>
                      <p className="text-white/40 text-xs">IP Rating</p>
                      <p className="font-semibold">{product.specs.ipRating}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer size={16} className="text-orange-500" />
                    <div>
                      <p className="text-white/40 text-xs">Lifespan</p>
                      <p className="font-semibold">{product.specs.lifespan}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Voltage</p>
                    <p className="font-semibold">{product.specs.voltage}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Warranty</p>
                    <p className="font-semibold">{product.specs.warranty}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.ul
                  key="features"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-2 text-sm"
                >
                  {product.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Check size={14} className="text-photon-blue" />
                      <span className="text-white/80">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              {activeTab === 'applications' && (
                <motion.div
                  key="applications"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex flex-wrap gap-2"
                >
                  {product.applications.map((app, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/80 border border-white/10">
                      {app}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 mt-8 border-t border-white/5 pt-6">
            <button className="glow-button flex-grow">Enquire Now</button>
            <button className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
              <Scale size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
