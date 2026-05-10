import { motion, useScroll } from 'framer-motion'

export default function FiberProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-50"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left',
        background: 'linear-gradient(90deg, transparent, #00D2FF, #F2A900)',
        boxShadow: '0 0 10px #00D2FF, 0 0 20px #00D2FF',
      }}
    />
  )
}
