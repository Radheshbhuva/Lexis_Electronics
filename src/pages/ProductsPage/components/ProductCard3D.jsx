import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, Scale, Zap, Shield, Star, Lightbulb } from 'lucide-react'

export default function ProductCard3D({ product, isGridView, onQuickView, onCompare, isCompared }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isGridView) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * 8 // Max 8 degrees
    const rotateY = ((centerX - x) / centerX) * 8 // Max 8 degrees
    
    setRotate({ x: rotateX, y: rotateY })
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setGlowPosition({ x: 50, y: 50 })
  }

  const badgeColors = {
    'BESTSELLER': 'bg-lexis-gold text-deep-space',
    'POPULAR': 'bg-photon-blue text-deep-space',
    'NEW': 'bg-green-500 text-white',
    'PREMIUM': 'bg-purple-500 text-white',
    'PROFESSIONAL': 'bg-indigo-500 text-white',
    'VALUE': 'bg-gray-500 text-white',
    'ECO': 'bg-emerald-500 text-white',
    'SMART': 'bg-cyan-500 text-white'
  }

  if (!isGridView) {
    return (
      <motion.div 
        className="glass-card p-4 flex flex-col md:flex-row gap-6 items-center hover-lift"
        layout
      >
        <div className="w-full md:w-48 h-32 bg-white/5 rounded-lg flex items-center justify-center relative overflow-hidden flex-shrink-0">
          <Lightbulb className="w-12 h-12 text-white/20" />
          {product.badge && (
            <span className={`absolute top-2 left-2 text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeColors[product.badge]}`}>
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold font-space-grotesk">{product.name}</h3>
            <div className="flex items-center gap-1 text-lexis-gold">
              <Star size={14} className="fill-current" />
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
          </div>
          <p className="text-white/60 text-sm mb-4">{product.description}</p>
          <div className="flex flex-wrap gap-4 text-xs text-white/40 mb-4">
            <div className="flex items-center gap-1">
              <Zap size={14} className="text-photon-blue" />
              <span>{product.specs.wattage}</span>
            </div>
            <div className="flex items-center gap-1">
              <Lightbulb size={14} className="text-lexis-gold" />
              <span>{product.specs.lumens}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield size={14} className="text-green-500" />
              <span>{product.specs.ipRating}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <div className="text-2xl font-bold text-lexis-gold mb-2">₹{product.price.toLocaleString()}</div>
          <button 
            onClick={() => onQuickView(product)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
          >
            <Eye size={16} />
            <span>Quick View</span>
          </button>
          <button 
            onClick={() => onCompare(product)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${isCompared ? 'bg-photon-blue text-deep-space' : 'bg-industrial-steel/50 hover:bg-industrial-steel'}`}
          >
            <Scale size={16} />
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className="glass-card overflow-hidden cursor-pointer relative group"
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(0, 210, 255, 0.15), transparent 50%)`
        }}
      />

      {/* Scan Line Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-photon-blue/5 to-transparent h-1/2 w-full animate-scan" style={{ animationDuration: '3s' }} />
      </div>

      {/* Image Area */}
      <div className="h-56 bg-white/5 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-photon-blue/10 to-lexis-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Lightbulb className="w-20 h-20 text-white/10 group-hover:text-lexis-gold/30 transition-colors duration-500 transform group-hover:scale-110" />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${badgeColors[product.badge]}`}>
            {product.badge}
          </span>
        )}

        {/* Action Buttons on Hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-deep-space/60 backdrop-blur-sm">
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-deep-space hover:bg-lexis-gold transition-colors"
            title="Quick View"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onCompare(product); }}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isCompared ? 'bg-photon-blue text-deep-space' : 'bg-white/10 text-white hover:bg-white/20'}`}
            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
          >
            <Scale size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold font-space-grotesk group-hover:text-photon-blue transition-colors">{product.name}</h3>
          <div className="flex items-center gap-1 text-lexis-gold">
            <Star size={14} className="fill-current" />
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>
        </div>
        <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        {/* Key Specs */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mb-4 text-center text-xs">
          <div>
            <p className="text-white/40 mb-1">Power</p>
            <p className="font-semibold text-photon-blue">{product.specs.wattage}</p>
          </div>
          <div>
            <p className="text-white/40 mb-1">Lumens</p>
            <p className="font-semibold text-lexis-gold">{product.specs.lumens}</p>
          </div>
          <div>
            <p className="text-white/40 mb-1">Rating</p>
            <p className="font-semibold text-white">{product.specs.ipRating}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="text-2xl font-bold text-lexis-gold">₹{product.price.toLocaleString()}</div>
          <div className="text-white/40 text-xs">{product.reviews} Reviews</div>
        </div>
      </div>
    </motion.div>
  )
}
