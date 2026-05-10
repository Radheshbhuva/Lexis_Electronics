import React from 'react'
import { motion } from 'framer-motion'
import { X, Scale, Lightbulb } from 'lucide-react'

export default function ProductCompare({ compareList, onClose, onRemove }) {
  const features = [
    { key: 'wattage', label: 'Wattage' },
    { key: 'lumens', label: 'Lumens' },
    { key: 'ipRating', label: 'IP Rating' },
    { key: 'beamAngle', label: 'Beam Angle' },
    { key: 'cri', label: 'CRI' },
    { key: 'lifespan', label: 'Lifespan' },
    { key: 'warranty', label: 'Warranty' }
  ]

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-deep-space/95 backdrop-blur-lg border-t border-white/10"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Scale className="text-photon-blue" size={24} />
            <h2 className="text-xl font-bold font-space-grotesk">Compare Products ({compareList.length}/3)</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {compareList.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <p className="mb-2">No products selected for comparison</p>
            <p className="text-sm">Add up to 3 products to compare their specifications</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="w-1/4 p-4 text-left text-white/40 font-medium">Product</th>
                  {compareList.map(product => (
                    <th key={product.id} className="p-4 text-left border-l border-white/5 relative">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center">
                          <Lightbulb size={16} className="text-lexis-gold" />
                        </div>
                        <div>
                          <p className="font-semibold text-white line-clamp-1">{product.name}</p>
                          <p className="text-lexis-gold text-xs">₹{product.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => onRemove(product)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                        title="Remove"
                      >
                        <X size={12} />
                      </button>
                    </th>
                  ))}
                  {/* Empty Slots */}
                  {[...Array(3 - compareList.length)].map((_, i) => (
                    <th key={`empty-${i}`} className="p-4 text-left border-l border-white/5 text-white/20">
                      <div className="flex items-center gap-3 justify-center h-10 border border-dashed border-white/10 rounded">
                        <span className="text-xs">Add Product</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map(feature => (
                  <tr key={feature.key} className="border-t border-white/5">
                    <td className="p-4 font-medium text-white/60">{feature.label}</td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-4 border-l border-white/5 text-white/80">
                        {product.specs[feature.key] || 'N/A'}
                      </td>
                    ))}
                    {[...Array(3 - compareList.length)].map((_, i) => (
                      <td key={`empty-val-${i}`} className="p-4 border-l border-white/5"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  )
}
