import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import ProductCard3D from './ProductCard3D'

export default function ProductGrid({ products, isGridView, onQuickView, onCompare, compareList }) {
  return (
    <div className="relative min-h-[400px]">
      <AnimatePresence mode="popLayout">
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-[400px] text-white/40"
          >
            <Sparkles size={48} className="mb-4 text-lexis-gold/50" />
            <p className="text-lg font-space-grotesk">No products found</p>
            <p className="text-sm">Try adjusting your filters or search query</p>
          </motion.div>
        ) : (
          <motion.div 
            className={`grid gap-8 ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
            layout
          >
            {products.map((product) => (
              <ProductCard3D
                key={product.id}
                product={product}
                isGridView={isGridView}
                onQuickView={onQuickView}
                onCompare={onCompare}
                isCompared={compareList.some(p => p.id === product.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
