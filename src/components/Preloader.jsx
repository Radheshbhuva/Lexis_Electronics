import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ progress }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // Particles
    const particles = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 2,
        vx: -1 + Math.random() * 2,
        vy: -1 + Math.random() * 2,
        baseOpacity: 0.2 + Math.random() * 0.3,
        opacity: 0,
        color: Math.random() > 0.5 ? '#F2A900' : '#00D2FF',
        time: Math.random() * 100
      })
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.02

      // Draw particles
      particles.forEach(p => {
        p.time += 0.05
        p.opacity = p.baseOpacity + Math.sin(p.time) * 0.1
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.save()
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.shadowBlur = 15
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw central beam
      const centerX = canvas.width / 2
      const beamOpacity = 0.3 + Math.sin(time * 2) * 0.2
      const gradient = ctx.createLinearGradient(centerX, 0, centerX, canvas.height)
      gradient.addColorStop(0, 'rgba(242, 169, 0, 0)')
      gradient.addColorStop(0.5, `rgba(242, 169, 0, ${beamOpacity})`)
      gradient.addColorStop(1, 'rgba(242, 169, 0, 0)')

      ctx.save()
      ctx.strokeStyle = gradient
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX, 0)
      ctx.lineTo(centerX, canvas.height)
      ctx.stroke()
      ctx.restore()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-deep-space flex flex-col items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Canvas with blur */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(1px)' }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8">
          {/* Left Dot */}
          <motion.span
            className="w-3 h-3 bg-lexis-gold rounded-full mr-4"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-space-grotesk light-text tracking-tight"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(242,169,0,0)',
                  '0 0 30px rgba(242,169,0,0.5)',
                  '0 0 20px rgba(242,169,0,0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              LEXIS
            </motion.h1>
            <h2 className="text-sm md:text-base font-space-grotesk text-white tracking-[0.5em] mt-2">
              ELECTRONICS
            </h2>
          </div>

          {/* Right Dot */}
          <motion.span
            className="w-3 h-3 bg-photon-blue rounded-full ml-4"
            animate={{ opacity: [1, 0.2, 1], scale: [1.2, 0.8, 1.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-industrial-steel rounded-full overflow-hidden mb-4 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-lexis-gold via-yellow-300 to-photon-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-gray-400 text-xs font-light tracking-widest"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Igniting Brilliance...
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
