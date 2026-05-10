import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const galleryData = [
  { id: 1, title: 'Warehouse Installation', location: 'Surat Industrial Zone' },
  { id: 2, title: 'Stadium Lighting', location: 'Sports Complex, Surat' },
  { id: 3, title: 'Factory Floor', location: 'GIDC, Sachin' },
  { id: 4, title: 'Outdoor Security', location: 'Residential Complex' },
  { id: 5, title: 'Commercial Space', location: 'Ring Road, Surat' },
  { id: 6, title: 'Parking Area', location: 'Mall, Adajan' }
]

export default function ImageTransitionWall() {
  const [scanIndex, setScanIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanIndex((prev) => (prev + 1) % galleryData.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="reviews" className="py-32 bg-deep-space relative overflow-hidden">
      {/* Title */}
      <div className="text-center mb-16 px-4">
        <span className="text-sm uppercase tracking-widest text-photon-blue font-semibold mb-2 block">
          Gallery
        </span>
        <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
          The <span className="light-text">Lexis Effect</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Watch as our lights transform ordinary spaces into brilliantly illuminated environments.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryData.map((item, index) => {
          const isActive = scanIndex === index || hoveredIndex === index
          
          return (
            <motion.div
              key={item.id}
              className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* BEFORE STATE (Always visible as base) */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4">
                <span className="absolute top-4 left-4 text-xs font-semibold text-gray-500 tracking-wider">
                  BEFORE
                </span>
                {/* Dark room shape */}
                <div className="w-3/4 h-3/4 rounded-lg bg-gray-800/30 border border-white/5 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-700/50" />
                </div>
              </div>

              {/* AFTER STATE (Revealed by clipPath) */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-amber-900/50 to-deep-space flex flex-col items-center justify-center p-4 transition-all duration-700 ease-in-out"
                style={{
                  clipPath: isActive ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                }}
              >
                <span className="absolute top-4 right-4 text-xs font-semibold text-lexis-gold tracking-wider">
                  AFTER
                </span>
                
                {/* Illuminated room shape */}
                <div className="w-3/4 h-3/4 rounded-lg bg-gradient-to-br from-lexis-gold/20 to-transparent border border-lexis-gold/30 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Light Beam Effect */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full bg-gradient-to-b from-lexis-gold/30 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="w-8 h-8 rounded-full bg-lexis-gold shadow-lg shadow-lexis-gold/50 z-10" />
                  
                  {/* Sparkle Dots */}
                  {[
                    { top: '20%', left: '30%' },
                    { top: '40%', left: '70%' },
                    { top: '60%', left: '20%' },
                    { top: '70%', left: '60%' },
                    { top: '30%', left: '50%' }
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-yellow-300 rounded-full absolute"
                      style={pos}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 1 + i * 0.2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>

                {/* Scan Line */}
                {isActive && (
                  <motion.div 
                    className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-lexis-gold to-transparent"
                    style={{
                      boxShadow: '0 0 10px #F2A900, 0 0 20px #F2A900',
                    }}
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </div>

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                <h3 className="text-sm font-medium text-white">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.location}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
