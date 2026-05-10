import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductHero from './components/ProductHero'
import ProductCategories from './components/ProductCategories'
import ProductFilter from './components/ProductFilter'
import ProductGrid from './components/ProductGrid'
import ProductQuickView from './components/ProductQuickView'
import ProductCompare from './components/ProductCompare'
import { products, productCategories } from './data/productsData'
import './ProductsPage.css'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [compareList, setCompareList] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [isGridView, setIsGridView] = useState(true)

  useEffect(() => {
    let result = [...products]

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.applications.some(app => app.toLowerCase().includes(query))
      )
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.reviews - a.reviews
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating
      }
      if (sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      }
      return 0
    })

    setFilteredProducts(result)
  }, [selectedCategory, sortBy, searchQuery])

  const handleQuickView = (product) => {
    setQuickViewProduct(product)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseQuickView = () => {
    setQuickViewProduct(null)
    document.body.style.overflow = 'unset'
  }

  const handleCompare = (product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.filter(p => p.id !== product.id)
      }
      if (prev.length < 3) {
        return [...prev, product]
      }
      return prev
    })
  }

  return (
    <motion.div 
      className="products-page bg-deep-space text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ProductHero />
      
      <ProductCategories 
        categories={productCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="max-width-container py-12">
        <ProductFilter 
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isGridView={isGridView}
          onViewChange={setIsGridView}
          compareCount={compareList.length}
          onToggleCompare={() => setShowCompare(!showCompare)}
        />

        <ProductGrid 
          products={filteredProducts}
          isGridView={isGridView}
          onQuickView={handleQuickView}
          onCompare={handleCompare}
          compareList={compareList}
        />
      </div>

      <AnimatePresence>
        {quickViewProduct && (
          <ProductQuickView 
            product={quickViewProduct}
            onClose={handleCloseQuickView}
          />
        )}

        {showCompare && (
          <ProductCompare 
            compareList={compareList}
            onClose={() => setShowCompare(false)}
            onRemove={handleCompare}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
