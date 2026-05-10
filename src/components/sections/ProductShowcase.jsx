import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, RotateCcw, Zap, Shield, Thermometer } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei'

const products = [
  {
    id: 1,
    name: 'Industrial Highbay Light (UFO)',
    category: 'Industrial',
    description: 'High-performance LED highbay designed for warehouses and industrial facilities. Superior heat dissipation with aerospace-grade aluminum housing.',
    specs: ['100-240V AC', '100W-200W', 'IP65 Rating', '50000 Hours Life'],
    color: '#F2A900',
    gradient: 'from-amber-500/20 to-orange-500/5'
  },
  {
    id: 2,
    name: 'Stadium Light',
    category: 'Sports & Arena',
    description: 'Professional-grade stadium lighting with precision optics for uniform illumination. Engineered for large venues and outdoor sports complexes.',
    specs: ['200-500W', '90° Beam Angle', 'IP66 Rating', 'CRI >80'],
    color: '#00D2FF',
    gradient: 'from-blue-500/20 to-cyan-500/5'
  },
  {
    id: 3,
    name: 'Flood Light',
    category: 'Outdoor',
    description: 'Versatile flood lighting solution for security, facades, and outdoor areas. Wide coverage with energy-efficient LED technology.',
    specs: ['50W-150W', '120° Beam', 'IP65 Rating', '30000 Hours'],
    color: '#10B981',
    gradient: 'from-emerald-500/20 to-green-500/5'
  }
]

// 3D Models with tuned geometry and lighting
function UFOModel({ color, isExploded }) {
  const meshRef = useRef()
  const bodyY = isExploded ? -0.5 : 0
  const lensY = isExploded ? 0.5 : 0

  return (
    <group ref={meshRef} rotation={[0.2, 0, 0]}>
      {/* Hook on top for hanging */}
      <mesh position={[0, bodyY + 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.04, 16, 100]} />
        <meshStandardMaterial color="#0B0C10" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Upper Driver Box */}
      <mesh position={[0, bodyY + 0.15, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.2, 16]} />
        <meshStandardMaterial color="#1F2833" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Main Body (Heat Sink base) */}
      <mesh position={[0, bodyY, 0]}>
        <cylinderGeometry args={[1.2, 1.6, 0.3, 32]} />
        <meshStandardMaterial color="#1F2833" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Angled Fins for better realism */}
      {[...Array(24)].map((_, i) => (
        <mesh key={i} position={[0, bodyY, 0]} rotation={[0, (i * Math.PI) / 12, 0]}>
          <boxGeometry args={[0.03, 0.25, 1.5]} />
          <meshStandardMaterial color="#0B0C10" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Lens Plate */}
      <mesh position={[0, bodyY - 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.3, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0} transparent opacity={0.1} />
      </mesh>

      {/* Actual LED matrix inside lens */}
      <group position={[0, bodyY - 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {[...Array(3)].map((_, ring) => {
          const count = (ring + 1) * 6
          const radius = (ring + 1) * 0.35
          return [...Array(count)].map((_, i) => {
            const angle = (i * Math.PI * 2) / count
            return (
              <mesh key={`${ring}-${i}`} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
                <boxGeometry args={[0.05, 0.05, 0.01]} />
                <meshBasicMaterial color={color} />
              </mesh>
            )
          })
        })}
      </group>

      {/* Floating Exploded Ring */}
      {isExploded && (
        <mesh position={[0, lensY, 0]}>
          <torusGeometry args={[1.3, 0.03, 16, 100]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
        </mesh>
      )}
    </group>
  )
}

function StadiumModel({ color, isExploded }) {
  const bodyZ = isExploded ? -0.6 : 0
  
  return (
    <group rotation={[0.3, -0.5, 0]}>
      {/* Heavy Duty Mounting Bracket */}
      <mesh position={[0, 0, bodyZ - 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 16, 100, Math.PI]} />
        <meshStandardMaterial color="#0B0C10" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Heat Sink Fins on back */}
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[i * 0.24 - 1.08, 0, bodyZ - 0.15]}>
          <boxGeometry args={[0.02, 1.6, 0.2]} />
          <meshStandardMaterial color="#0B0C10" metalness={0.8} />
        </mesh>
      ))}

      {/* Main Body Chassis */}
      <mesh position={[0, 0, bodyZ]}>
        <boxGeometry args={[2.4, 1.8, 0.2]} />
        <meshStandardMaterial color="#1F2833" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* 4 Separate LED Pods for realism */}
      {[...Array(2)].map((_, x) => 
        [...Array(2)].map((_, y) => (
          <group key={`${x}-${y}`} position={[x * 1.1 - 0.55, y * 0.8 - 0.4, bodyZ + 0.11]}>
            <mesh>
              <boxGeometry args={[0.9, 0.6, 0.05]} />
              <meshStandardMaterial color="#0B0C10" metalness={0.9} />
            </mesh>
            {/* LED grid in each pod */}
            {[...Array(4)].map((_, i) => 
              [...Array(3)].map((_, j) => (
                <mesh key={`${i}-${j}`} position={[i * 0.2 - 0.3, j * 0.15 - 0.15, 0.03]}>
                  <sphereGeometry args={[0.04, 16, 16]} />
                  <meshBasicMaterial color={color} />
                </mesh>
              ))
            )}
          </group>
        ))
      )}

      {/* Retaining Frame if Exploded */}
      {isExploded && (
        <mesh position={[0, 0, 0.6]}>
          <boxGeometry args={[2.6, 2.0, 0.05]} />
          <meshStandardMaterial color={color} wireframe />
        </mesh>
      )}
    </group>
  )
}

function FloodModel({ color, isExploded }) {
  const glassZ = isExploded ? 0.6 : 0.11
  
  return (
    <group rotation={[0.2, 0.3, 0]}>
      {/* U-Bracket */}
      <mesh position={[0, -0.9, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.3]} />
        <meshStandardMaterial color="#0B0C10" metalness={0.9} />
      </mesh>
      <mesh position={[-0.8, -0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.0, 0.05, 0.1]} />
        <meshStandardMaterial color="#0B0C10" metalness={0.9} />
      </mesh>
      <mesh position={[0.8, -0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.0, 0.05, 0.1]} />
        <meshStandardMaterial color="#0B0C10" metalness={0.9} />
      </mesh>

      {/* Main Housing */}
      <mesh>
        <boxGeometry args={[1.6, 1.2, 0.3]} />
        <meshStandardMaterial color="#1F2833" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Angled Reflector Chamber */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.4, 1.0, 0.15]} />
        <meshStandardMaterial color="#E2E8F0" metalness={1.0} roughness={0.0} />
      </mesh>
      
      {/* Grid of COB LEDs in center */}
      <group position={[0, 0, 0.13]}>
        {[...Array(3)].map((_, i) => 
          [...Array(3)].map((_, j) => (
            <mesh key={`${i}-${j}`} position={[i * 0.15 - 0.15, j * 0.15 - 0.15, 0]}>
              <boxGeometry args={[0.08, 0.08, 0.01]} />
              <meshBasicMaterial color={color} />
            </mesh>
          ))
        )}
      </group>

      {/* Glass Front Cover with Bezel */}
      <mesh position={[0, 0, glassZ]}>
        <boxGeometry args={[1.5, 1.1, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.4} roughness={0} />
      </mesh>
      <mesh position={[0, 0, glassZ + 0.01]}>
        <boxGeometry args={[1.6, 1.2, 0.03]} />
        <meshStandardMaterial color="#0B0C10" wireframe />
      </mesh>
    </group>
  )
}

function LEDFixture({ product, isExploded }) {
  if (product.id === 1) return <UFOModel color={product.color} isExploded={isExploded} />
  if (product.id === 2) return <StadiumModel color={product.color} isExploded={isExploded} />
  return <FloodModel color={product.color} isExploded={isExploded} />
}

export default function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(0)
  const [isExploded, setIsExploded] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      const sectionProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height)
      
      if (sectionProgress > 0 && sectionProgress < 1) {
        const index = Math.min(
          Math.floor(sectionProgress * products.length),
          products.length - 1
        )
        setActiveProduct(index)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentProduct = products[activeProduct]

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-deep-space relative overflow-hidden"
    >
      {/* Subtle Star field in background of 3D section */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-industrial-steel/10 to-transparent pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-16 relative z-10">
        <span className="text-sm uppercase tracking-widest text-photon-blue font-semibold mb-2 block">
          Our Products
        </span>
        <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
          Product <span className="light-text">Luminary</span> Collection
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="max-w-4xl mx-auto h-[700px] perspective-1000 relative flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg preserve-3d"
          >
            <div className={`glass-card p-8 relative overflow-hidden bg-gradient-to-br ${currentProduct.gradient}`}>
              {/* Light Beam Effect */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-64 opacity-30 blur-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${currentProduct.color}, transparent)`,
                }}
              />

              {/* 3D Model Canvas */}
              <div className="relative mb-6 h-64 w-full cursor-grab active:cursor-grabbing">
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                  <ambientLight intensity={0.3} />
                  
                  {/* Highly dynamic lighting rig */}
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D2FF" />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F2A900" />
                  <directionalLight position={[0, 5, 0]} intensity={1.0} />
                  
                  {/* Studio setup environment mapped for metallic reflection */}
                  <Environment preset="studio" />
                  
                  <LEDFixture product={currentProduct} isExploded={isExploded} />
                  
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
                </Canvas>
              </div>

              {/* Content */}
              <div className="text-center relative z-10">
                <span className="text-xs uppercase tracking-widest text-white/50 mb-1 block">
                  {currentProduct.category}
                </span>
                <h3 className="text-2xl font-bold font-space-grotesk mb-2 text-white">
                  {currentProduct.name}
                </h3>
                <p className="text-gray-400 text-sm font-inter leading-relaxed mb-6">
                  {currentProduct.description}
                </p>

                {/* Exploded View */}
                <AnimatePresence>
                  {isExploded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-6"
                    >
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-white/5 hover:scale-105 transition-transform flex flex-col items-center">
                          <Shield className="w-4 h-4 text-lexis-gold mb-1" />
                          <span>IP Rating</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 hover:scale-105 transition-transform flex flex-col items-center">
                          <Thermometer className="w-4 h-4 text-photon-blue mb-1" />
                          <span>Thermal Mgmt</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 hover:scale-105 transition-transform flex flex-col items-center">
                          <Zap className="w-4 h-4 text-lexis-gold mb-1" />
                          <span>High Efficiency</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 hover:scale-105 transition-transform flex flex-col items-center">
                          <RotateCcw className="w-4 h-4 text-photon-blue mb-1" />
                          <span>50000hrs Life</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Toggle Button */}
                <button
                  onClick={() => setIsExploded(!isExploded)}
                  className="text-xs text-white/70 hover:text-white flex items-center justify-center mx-auto space-x-1"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>{isExploded ? 'Close Details' : 'View Technical Specs'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {products.map((p, index) => (
            <button
              key={p.id}
              onClick={() => setActiveProduct(index)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                activeProduct === index
                  ? 'bg-lexis-gold border-lexis-gold text-deep-space'
                  : 'bg-industrial-steel border-white/5 text-gray-400 hover:border-white/10'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: activeProduct === index ? '#0B0C10' : p.color 
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Specs Grid */}
      <div className="max-w-4xl mx-auto mt-32 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentProduct.specs.map((spec, index) => (
            <motion.div
              key={index}
              className="glass-card p-4 text-center hover:border-lexis-gold/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-sm font-space-grotesk font-semibold text-white">
                {spec}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
