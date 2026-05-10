import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function ProductHero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.6
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      speed: 1 + Math.random() * 2,
      width: 1 + Math.random() * 3,
      length: 50 + Math.random() * 100,
      opacity: 0.1 + Math.random() * 0.4
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.y -= p.speed
        if (p.y + p.length < 0) {
          p.y = canvas.height + Math.random() * 100
          p.x = Math.random() * canvas.width
        }

        const gradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.length)
        gradient.addColorStop(0, `rgba(0, 210, 255, ${p.opacity})`)
        gradient.addColorStop(1, 'rgba(0, 210, 255, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(p.x, p.y, p.width, p.length)
      })

      animationFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative h-[60vh] overflow-hidden flex items-center justify-center bg-deep-space">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-photon-blue/10 rounded-full filter blur-3xl"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.span 
          className="text-photon-blue uppercase tracking-widest text-sm font-semibold mb-4 block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Catalog
        </motion.span>
        <motion.h1 
          className="text-5xl md:text-6xl font-bold font-space-grotesk mb-6 bg-gradient-to-r from-white via-photon-blue to-lexis-gold bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Premium Lighting Solutions
        </motion.h1>
        <motion.p 
          className="text-white/60 text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Precision-engineered LED systems for industrial, commercial, and architectural excellence.
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-white/10 pt-8">
          {[
            { value: '50+', label: 'Products' },
            { value: 'IP65+', label: 'Rating' },
            { value: '10k+', label: 'Customers' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
            >
              <div className="text-3xl font-bold font-space-grotesk text-lexis-gold">{stat.value}</div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="text-photon-blue w-6 h-6" />
        </motion.div>
      </div>
    </div>
  )
}
