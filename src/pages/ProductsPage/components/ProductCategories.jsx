import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Cpu, MapPin, Trophy, Building2, Lightbulb, Box } from 'lucide-react'
import { products } from '../data/productsData'

const iconMap = {
  'flood-lights': Zap,
  'highbay-lights': Cpu,
  'street-lights': MapPin,
  'stadium-lights': Trophy,
  'commercial-lights': Building2,
  'par-lights': Lightbulb,
  'all': Box
}

export default function ProductCategories({ categories, selectedCategory, onSelectCategory }) {
  const getProductCount = (categoryId) => {
    if (categoryId === 'all') return products.length
    return products.filter(p => p.category === categoryId).length
  }

  const allCategories = [
    { id: 'all', name: 'All Products', color: '#00D2FF' },
    ...categories
  ]

  return (
    <div className="border-b border-white/5 bg-industrial-steel/20 backdrop-blur-sm sticky top-20 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto py-4 gap-6 no-scrollbar">
          {allCategories.map((cat, index) => {
            const Icon = iconMap[cat.id] || Box
            const isActive = selectedCategory === cat.id

            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex-shrink-0 flex items-center gap-3 px-4 py-2 rounded-lg transition-colors relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                >
                  <Icon size={18} />
                </div>
                <div className="text-left">
                  <div className={`font-space-grotesk text-sm font-semibold ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {cat.name}
                  </div>
                  <div className="text-xs text-white/40">
                    {getProductCount(cat.id)} Products
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-lexis-gold"
                    layoutId="activeCategory"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
