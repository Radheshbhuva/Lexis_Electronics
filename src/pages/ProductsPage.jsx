import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Search } from 'lucide-react'
import { products, productCategories } from '@/pages/ProductsPage/data/productsData.js'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', ...productCategories.map(c => c.name)]

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || 
      productCategories.find(c => c.id === p.category)?.name === selectedCategory
    
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="bg-deep-space text-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm uppercase tracking-widest text-lexis-gold font-semibold mb-2 block">Our Catalog</span>
            <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">Precision Engineered Lighting</h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Explore our range of high-performance LED solutions designed for industrial and commercial applications.
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-industrial-steel/50 border border-white/10 rounded-full px-6 py-3 pl-12 text-white focus:border-lexis-gold/50 focus:outline-none transition-colors"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-lexis-gold border-lexis-gold text-deep-space font-semibold'
                    : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card overflow-hidden hover-lift flex flex-col h-full"
              >
                {/* Product Image/Icon area */}
                <div className="h-48 bg-white/5 flex items-center justify-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-photon-blue/10 to-lexis-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Lightbulb className="w-16 h-16 text-white/20 group-hover:text-lexis-gold transition-colors duration-500" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider bg-deep-space/80 text-white/80 px-3 py-1 rounded-full border border-white/5">
                    {productCategories.find(c => c.id === product.category)?.name || product.category}
                  </span>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-wider bg-lexis-gold text-deep-space px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-space-grotesk mb-2">{product.name}</h3>
                  <p className="text-white/60 text-sm mb-4 flex-grow">{product.description}</p>
                  
                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mb-6 text-center text-xs">
                    <div>
                      <p className="text-white/40 mb-1">Power</p>
                      <p className="font-semibold text-photon-blue">{product.specs.wattage}</p>
                    </div>
                    <div>
                      <p className="text-white/40 mb-1">Lumens</p>
                      <p className="font-semibold text-lexis-gold">{product.specs.lumens}</p>
                    </div>
                    <div>
                      <p className="text-white/40 mb-1">Rating</p>
                      <p className="font-semibold text-white">{product.specs.ipRating}</p>
                    </div>
                  </div>

                  <button className="glow-button w-full text-sm py-3">
                    Request Quote
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
