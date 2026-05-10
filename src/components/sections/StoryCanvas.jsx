import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Factory, Cpu, MapPin } from 'lucide-react'

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

const storyData = [
  {
    year: '2011',
    title: 'The Spark of Innovation',
    description: 'Founded in the industrial heart of Surat, Lexis Electronics began with a simple vision: to manufacture LED lighting that combines durability with brilliant performance. Starting from a small workshop, we focused on quality materials and precision manufacturing.',
    icon: <Factory size={24} />,
    color: 'from-amber-500/20 to-amber-500/5'
  },
  {
    year: '2016',
    title: 'Mastering the Craft',
    description: 'Invested in advanced manufacturing technology and quality-approved materials. Every component, from heat sinks to LED chips, undergoes rigorous testing. Expanded our product line to include UFO Highbay, Flood Lights, and specialized industrial lighting solutions.',
    icon: <Cpu size={24} />,
    color: 'from-blue-500/20 to-blue-500/5'
  },
  {
    year: '2024',
    title: 'Illuminating India',
    description: 'Powering industries, stadiums, and infrastructure projects across Gujarat and beyond. Trusted by thousands for premium, reliable lighting solutions. Our products light up warehouses, factories, sports complexes, and commercial spaces with unmatched quality.',
    icon: <MapPin size={24} />,
    color: 'from-emerald-500/20 to-emerald-500/5'
  }
]

export default function StoryCanvas() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      )

      // Panels animation
      const panels = gsap.utils.toArray('.story-panel')
      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom-=100',
              end: 'top center',
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 relative bg-deep-space overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Title Section */}
      <div className="text-center mb-24 max-w-3xl mx-auto px-4">
        <span className="text-sm uppercase tracking-widest text-photon-blue font-semibold mb-2 block">
          Our Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
          From <span className="light-text">Spark</span> to Splendor
        </h2>
        <p className="text-gray-400">
          A decade of engineering excellence, illuminating the path forward.
        </p>
      </div>

      {/* Timeline Structure */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Vertical Connecting Line */}
        <div 
          ref={lineRef}
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lexis-gold via-photon-blue to-lexis-gold origin-top opacity-30 transform -translate-x-1/2"
        />

        <div className="space-y-24">
          {storyData.map((item, index) => (
            <div 
              key={item.year}
              className={`story-panel flex items-center justify-between ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content Side */}
              <div className={`flex-1 flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <motion.div 
                  className={`glass-card p-8 max-w-lg relative bg-gradient-to-br ${item.color} border border-white/5`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Year Badge */}
                  <div className="inline-flex items-center space-x-2 bg-deep-space/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 mb-4">
                    <span className="text-lexis-gold">{item.icon}</span>
                    <span className="font-bold font-space-grotesk text-white">{item.year}</span>
                  </div>

                  <h3 className={`text-2xl font-bold font-space-grotesk mb-2 text-white ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-gray-400 text-sm font-inter leading-relaxed ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Center Dot */}
              <div className="relative flex items-center justify-center w-24">
                <motion.div 
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-lexis-gold to-photon-blue z-10"
                  whileHover={{ scale: 1.5 }}
                  style={{
                    boxShadow: '0 0 10px rgba(242,169,0,0.5)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(242,169,0,0.5)',
                      '0 0 20px rgba(0,210,255,0.5)',
                      '0 0 10px rgba(242,169,0,0.5)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="absolute inset-0 rounded-full animate-ping bg-lexis-gold opacity-75" />
                </motion.div>
              </div>

              {/* Spacer Side */}
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="photon-line" />
      </div>
    </section>
  )
}
