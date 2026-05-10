import React from 'react'
import { Search, Grid, List, Scale } from 'lucide-react'

export default function ProductFilter({ 
  sortBy, 
  onSortChange, 
  searchQuery, 
  onSearchChange, 
  isGridView, 
  onViewChange, 
  compareCount, 
  onToggleCompare 
}) {
  return (
    <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      {/* Search */}
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white focus:border-lexis-gold/50 focus:outline-none transition-colors text-sm"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
      </div>

      <div className="flex flex-wrap items-center gap-4 justify-between w-full md:w-auto">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-sm">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-deep-space/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-lexis-gold/50 focus:outline-none transition-colors text-sm"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange(true)}
            className={`p-2 transition-colors ${isGridView ? 'bg-photon-blue text-deep-space' : 'text-white/60 hover:text-white'}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => onViewChange(false)}
            className={`p-2 transition-colors ${!isGridView ? 'bg-photon-blue text-deep-space' : 'text-white/60 hover:text-white'}`}
          >
            <List size={18} />
          </button>
        </div>

        {/* Compare Button */}
        <button
          onClick={onToggleCompare}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-industrial-steel/50 hover:bg-industrial-steel transition-colors text-sm"
        >
          <Scale size={18} className="text-photon-blue" />
          <span>Compare</span>
          {compareCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-lexis-gold text-deep-space rounded-full text-xs flex items-center justify-center font-bold">
              {compareCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
