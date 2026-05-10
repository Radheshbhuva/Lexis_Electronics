import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'MOANA JETHVA (MONA)',
    text: 'They created a magical atmosphere with their beautiful designs. The lighting transformed our space completely into something extraordinary.',
    rating: 5,
    theme: 'magical'
  },
  {
    name: 'Nirali Sarikhada',
    text: 'The lighting designs were unique and eye-catching. Everyone who visits our space compliments the ambiance and quality of illumination.',
    rating: 5,
    theme: 'creative'
  },
  {
    name: 'Jinal Rokad',
    text: 'The lighting quality was premium and the setup was completed on time. Professional service throughout the entire process from selection to installation.',
    rating: 5,
    theme: 'premium'
  }
]

export default function TrustConstellation() {
  const [activeReview, setActiveReview] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const setSize = () => {
      const parent = canvas.parentElement
      canvas.width = parent.offsetWidth
      canvas.height = 500
    }
    setSize()
    window.addEventListener('resize', setSize)

    const stars = []
    const starCount = 100

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#F2A900' : '#FFFFFF',
        opacity: Math.random(),
        pulseSpeed: 0.005 + Math.random() * 0.02,
        time: Math.random() * 100
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw stars
      stars.forEach(s => {
        s.time += s.pulseSpeed
        s.opacity = (Math.sin(s.time) + 1) / 2

        ctx.save()
        ctx.fillStyle = s.color
        ctx.globalAlpha = s.opacity
        
        if (s.opacity > 0.6) {
          ctx.shadowBlur = 15
          ctx.shadowColor = s.color
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw connections
      ctx.save()
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.lineWidth = 0.5
            const avgOpacity = (stars[i].opacity + stars[j].opacity) / 2
            const edgeOpacity = (1 - distance / 100) * avgOpacity
            ctx.strokeStyle = `rgba(242, 169, 0, ${edgeOpacity})`
            ctx.stroke()
          }
        }
      }
      ctx.restore()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const getThemeGradient = (theme) => {
    switch (theme) {
      case 'magical':
        return 'from-purple-500/20 to-pink-500/5'
      case 'creative':
        return 'from-blue-500/20 to-cyan-500/5'
      case 'premium':
        return 'from-amber-500/20 to-yellow-500/5'
      default:
        return 'from-gray-500/20 to-gray-500/5'
    }
  }

  return (
    <section className="py-32 bg-deep-space relative overflow-hidden">
      {/* Canvas Background */}
      <div className="absolute inset-0 h-[500px] opacity-50">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-photon-blue font-semibold mb-2 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
            Trust <span className="light-text">Constellation</span>
          </h2>
          
          {/* Google Rating Badge */}
          <motion.div 
            className="glass-card inline-flex items-center space-x-4 px-6 py-3 mt-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  <Star size={20} fill="#F2A900" stroke="#F2A900" />
                </motion.div>
              ))}
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold font-space-grotesk light-text block leading-none">5.0</span>
              <span className="text-xs text-gray-400">Google Rating</span>
            </div>
          </motion.div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className={`glass-card p-8 relative cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                activeReview === index ? 'border-lexis-gold/30 scale-105 shadow-lg shadow-lexis-gold/5' : 'hover:border-white/10'
              }`}
              onClick={() => setActiveReview(index)}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Theme Background Animation */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${getThemeGradient(review.theme)} z-0`} 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              <div className="relative z-10">
                <Quote size={32} className="text-lexis-gold/30 mb-4" />
                <p className="text-gray-300 text-sm font-inter leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="flex space-x-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F2A900" stroke="#F2A900" />
                  ))}
                </div>
                <div className="border-t border-white/5 pt-4">
                  <h3 className="text-sm font-semibold text-white font-space-grotesk">
                    {review.name}
                  </h3>
                  <p className="text-xs text-gray-500">Verified Reviewer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Read All Reviews Link */}
        <div className="text-center">
          <motion.a
            href="https://www.google.com/search?q=Lexis+Electronics+Surat+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-photon-blue hover:text-white flex items-center justify-center space-x-2 w-max mx-auto transition-colors"
            whileHover={{ x: 5 }}
          >
            <span>Read all reviews</span>
            <span className="text-xs">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
