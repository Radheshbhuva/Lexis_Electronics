export const productCategories = [
  { id: 'flood-lights', name: 'Flood Lights', icon: 'Zap', description: 'High-intensity outdoor lighting solutions for wide coverage', color: '#F2A900' },
  { id: 'highbay-lights', name: 'Highbay Lights (UFO)', icon: 'Cpu', description: 'Industrial-grade ceiling lights for warehouses and factories', color: '#00D2FF' },
  { id: 'street-lights', name: 'Street Lights', icon: 'MapPin', description: 'Energy-efficient road and pathway illumination', color: '#10B981' },
  { id: 'stadium-lights', name: 'Stadium Lights', icon: 'Trophy', description: 'Professional sports and arena lighting systems', color: '#8B5CF6' },
  { id: 'commercial-lights', name: 'Commercial Lights', icon: 'Building2', description: 'Elegant lighting for offices, malls, and commercial spaces', color: '#F59E0B' },
  { id: 'par-lights', name: 'PAR Lights', icon: 'Lightbulb', description: 'Versatile PAR series for accent and display lighting', color: '#EC4899' }
]

export const products = [
  // FLOOD LIGHTS
  {
    id: 1,
    name: 'Lexis ProFlood 100W',
    category: 'flood-lights',
    subCategory: 'Standard Flood',
    price: 2499,
    rating: 4.8,
    reviews: 124,
    image: '/images/products/proflood-100w.jpg',
    thumbnail: '/images/products/proflood-100w-thumb.jpg',
    badge: 'BESTSELLER',
    specs: {
      wattage: '100W',
      lumens: '12000 LM',
      beamAngle: '120°',
      ipRating: 'IP65',
      cri: '>80',
      lifespan: '50000 Hrs',
      voltage: '100-240V AC',
      material: 'Aluminum Die-cast',
      colorTemp: '6500K',
      warranty: '2 Years'
    },
    description: 'The Lexis ProFlood 100W is our flagship flood light, perfect for general outdoor illumination. It features a robust die-cast aluminum body for superior heat dissipation and long life.',
    features: [
      'Aerospace-grade aluminum housing',
      'Advanced optical lens for uniform light distribution',
      'Surge protection up to 4KV',
      'Corrosion-resistant powder coating',
      'Easy installation with adjustable bracket',
      'High-efficacy LED chips'
    ],
    applications: [
      'Building facades',
      'Security lighting',
      'Parking lots',
      'Industrial yards'
    ],
    isNew: false,
    isBestseller: true,
    inStock: true,
    colors: ['#0B0C10', '#1F2833']
  },
  {
    id: 2,
    name: 'Lexis MegaFlood 200W',
    category: 'flood-lights',
    subCategory: 'High Power Flood',
    price: 4999,
    rating: 4.9,
    reviews: 85,
    image: '/images/products/megaflood-200w.jpg',
    thumbnail: '/images/products/megaflood-200w-thumb.jpg',
    badge: 'POPULAR',
    specs: {
      wattage: '200W',
      lumens: '24000 LM',
      beamAngle: '90°',
      ipRating: 'IP66',
      cri: '>85',
      lifespan: '50000 Hrs',
      voltage: '100-277V AC',
      material: 'Aluminum+PC',
      colorTemp: '5000K',
      warranty: '3 Years'
    },
    description: 'Engineered for high-mast and large area lighting, the MegaFlood 200W delivers exceptional brightness. Its IP66 rating ensures reliable performance in extreme weather conditions.',
    features: [
      'High-power output for large areas',
      'IP66 weather-proof sealing',
      'Tempered glass cover',
      'Independent driver compartment',
      'Multiple mounting options',
      'Low glare design'
    ],
    applications: [
      'Sports complexes',
      'Construction sites',
      'Large warehouses',
      'Airport aprons'
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    colors: ['#0B0C10']
  },
  {
    id: 3,
    name: 'Lexis SlimFlood 50W',
    category: 'flood-lights',
    subCategory: 'Slim Profile',
    price: 1299,
    rating: 4.6,
    reviews: 210,
    image: '/images/products/slimflood-50w.jpg',
    thumbnail: '/images/products/slimflood-50w-thumb.jpg',
    badge: 'NEW',
    specs: {
      wattage: '50W',
      lumens: '6000 LM',
      beamAngle: '140°',
      ipRating: 'IP65',
      cri: '>82',
      lifespan: '40000 Hrs',
      voltage: '100-240V AC',
      material: 'Aluminum+Glass',
      colorTemp: '3000K/6500K Switchable',
      warranty: '2 Years'
    },
    description: 'A compact and sleek flood light that doesn\'t compromise on power. The SlimFlood 50W features color temperature switching to match your ambiance needs.',
    features: [
      'Ultra-slim architectural design',
      'CCT switchable (Warm/Cool)',
      'Highly reflective reflector',
      'No UV or IR radiation',
      'Instant start without flickering',
      'Energy saving up to 80%'
    ],
    applications: [
      'Garden lighting',
      'Signboard lighting',
      'Balcony areas',
      'Pathway lighting'
    ],
    isNew: true,
    isBestseller: false,
    inStock: true,
    colors: ['#FFFFFF', '#1F2833']
  },
  {
    id: 4,
    name: 'Lexis RGB Flood 150W',
    category: 'flood-lights',
    subCategory: 'RGB Color',
    price: 6999,
    rating: 4.7,
    reviews: 45,
    image: '/images/products/rgb-flood-150w.jpg',
    thumbnail: '/images/products/rgb-flood-150w-thumb.jpg',
    badge: 'PREMIUM',
    specs: {
      wattage: '150W',
      lumens: '18000 LM',
      beamAngle: '100°',
      ipRating: 'IP66',
      cri: '>90',
      lifespan: '45000 Hrs',
      voltage: '100-277V AC',
      material: 'Die-cast Aluminum',
      colorTemp: 'RGB+3000K-6500K',
      warranty: '3 Years'
    },
    description: 'Bring dynamic color to your architecture with the RGB Flood 150W. Controlled via remote or smart app, it offers millions of colors and pure white light.',
    features: [
      'Millions of RGB colors',
      'Smart app and remote control',
      'DMX compatible for complex setups',
      'Memory function for last settings',
      'Robust weather-proof housing',
      'High CRI for accurate color'
    ],
    applications: [
      'Architectural highlighting',
      'Event venues',
      'Stage lighting',
      'Hotel facades'
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    colors: ['#FF0000', '#00FF00', '#0000FF']
  },

  // HIGHBAY LIGHTS
  {
    id: 5,
    name: 'Lexis UFO Highbay 100W',
    category: 'highbay-lights',
    subCategory: 'UFO Series',
    price: 3499,
    rating: 4.8,
    reviews: 156,
    image: '/images/products/ufo-100w.jpg',
    thumbnail: '/images/products/ufo-100w-thumb.jpg',
    badge: 'BESTSELLER',
    specs: {
      wattage: '100W',
      lumens: '14000 LM',
      beamAngle: '90°',
      ipRating: 'IP65',
      cri: '>80',
      lifespan: '50000 Hrs',
      voltage: '100-277V AC',
      material: 'Aluminum+PC Lens',
      colorTemp: '6500K',
      warranty: '3 Years'
    },
    description: 'The UFO Highbay 100W provides powerful overhead lighting with a compact, modern design. Ideal for industrial spaces with ceiling heights up to 20 feet.',
    features: [
      'High luminous efficacy 140lm/W',
      'Fin-type heat sink for cooling',
      'Hook or bracket mount',
      'Anti-glare PC lens',
      'Dust and moisture proof',
      '0-10V dimming available'
    ],
    applications: [
      'Warehouses',
      'Manufacturing plants',
      'Gymnasiums',
      'Large retail stores'
    ],
    isNew: false,
    isBestseller: true,
    inStock: true,
    colors: ['#0B0C10']
  },
  {
    id: 6,
    name: 'Lexis UFO Highbay 150W',
    category: 'highbay-lights',
    subCategory: 'UFO Series',
    price: 4999,
    rating: 4.9,
    reviews: 92,
    image: '/images/products/ufo-150w.jpg',
    thumbnail: '/images/products/ufo-150w-thumb.jpg',
    badge: 'POPULAR',
    specs: {
      wattage: '150W',
      lumens: '21000 LM',
      beamAngle: '60°/90°/120°',
      ipRating: 'IP65',
      cri: '>85',
      lifespan: '50000 Hrs',
      voltage: '100-277V AC',
      material: 'Heavy-duty Aluminum',
      colorTemp: '5000K',
      warranty: '3 Years'
    },
    description: 'A higher power UFO highbay for demanding industrial environments. Offers multiple beam angle options to suit different ceiling heights and layouts.',
    features: [
      'Interchangeable lens options',
      'Aerospace aluminum housing',
      'Top-tier LED driver',
      'Excellent thermal management',
      'Sleek aesthetic profile',
      'Saves up to 70% energy'
    ],
    applications: [
      'Heavy industries',
      'Exhibition halls',
      'Aircraft hangars',
      'Large auditoriums'
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    colors: ['#0B0C10']
  },
  {
    id: 7,
    name: 'Lexis Linear Highbay 200W',
    category: 'highbay-lights',
    subCategory: 'Linear Series',
    price: 5999,
    rating: 4.7,
    reviews: 34,
    image: '/images/products/linear-200w.jpg',
    thumbnail: '/images/products/linear-200w-thumb.jpg',
    badge: 'NEW',
    specs: {
      wattage: '200W',
      lumens: '28000 LM',
      beamAngle: '60°x120°',
      ipRating: 'IP65',
      cri: '>85',
      lifespan: '50000 Hrs',
      voltage: '100-277V AC',
      material: 'Aluminum Extrusion',
      colorTemp: '4000K/5000K',
      warranty: '3 Years'
    },
    description: 'Perfect for warehouse aisles and long corridors, the Linear Highbay provides a rectangular light distribution pattern to maximize efficiency.',
    features: [
      'Rectangular light pattern',
      'Extruded aluminum structure',
      'Perfect for aisle lighting',
      'Low maintenance design',
      'High impact resistance',
      'Easy chain or surface mount'
    ],
    applications: [
      'Warehouse aisles',
      'Indoor sports courts',
      'Logistics centers',
      'Assembly lines'
    ],
    isNew: true,
    isBestseller: false,
    inStock: true,
    colors: ['#FFFFFF']
  },

  // STREET LIGHTS
  {
    id: 8,
    name: 'Lexis StreetPro 60W',
    category: 'street-lights',
    subCategory: 'Standard Street',
    price: 2999,
    rating: 4.7,
    reviews: 180,
    image: '/images/products/streetpro-60w.jpg',
    thumbnail: '/images/products/streetpro-60w-thumb.jpg',
    badge: 'BESTSELLER',
    specs: {
      wattage: '60W',
      lumens: '8400 LM',
      beamAngle: 'Type II/III',
      ipRating: 'IP66',
      cri: '>75',
      lifespan: '60000 Hrs',
      voltage: '100-240V AC',
      material: 'Die-cast Aluminum',
      colorTemp: '5700K',
      warranty: '5 Years'
    },
    description: 'The StreetPro 60W offers reliable and efficient lighting for urban and rural roads. Its specialized lens ensures minimal light pollution.',
    features: [
      'Batwing light distribution',
      'Tool-less entry for maintenance',
      'Wind resistance design',
      'Surge protection up to 10KV',
      'Photocell sensor compatible',
      'Die-cast anti-corrosion body'
    ],
    applications: [
      'Urban roads',
      'Residential streets',
      'Campus pathways',
      'Public parks'
    ],
    isNew: false,
    isBestseller: true,
    inStock: true,
    colors: ['#6B7280']
  },
  {
    id: 9,
    name: 'Lexis Solar Street 40W',
    category: 'street-lights',
    subCategory: 'Solar Series',
    price: 5499,
    rating: 4.6,
    reviews: 65,
    image: '/images/products/solar-street-40w.jpg',
    thumbnail: '/images/products/solar-street-40w-thumb.jpg',
    badge: 'ECO',
    specs: {
      wattage: '40W LED',
      lumens: '5600 LM',
      beamAngle: 'Type II',
      ipRating: 'IP67',
      cri: '>75',
      lifespan: '50000 Hrs',
      voltage: '12V DC Solar',
      material: 'Aluminum+SS304',
      colorTemp: '5000K',
      warranty: '5 Years Panel'
    },
    description: 'A fully autonomous solar street light with integrated battery and controller. Ideal for areas without access to the power grid.',
    features: [
      'All-in-one integrated design',
      'High-efficiency MPPT controller',
      'Lithium Ferro Phosphate battery',
      'PIR motion sensor included',
      'Zero electricity cost',
      'Dusk to dawn automatic operation'
    ],
    applications: [
      'Rural areas',
      'Farm houses',
      'Remote sites',
      'Perimeter security'
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    colors: ['#6B7280']
  },
  {
    id: 10,
    name: 'Lexis Smart Street 90W',
    category: 'street-lights',
    subCategory: 'Smart Series',
    price: 7999,
    rating: 4.8,
    reviews: 28,
    image: '/images/products/smart-street-90w.jpg',
    thumbnail: '/images/products/smart-street-90w-thumb.jpg',
    badge: 'SMART',
    specs: {
      wattage: '90W',
      lumens: '12600 LM',
      beamAngle: 'Type III',
      ipRating: 'IP67',
      cri: '>80',
      lifespan: '60000 Hrs',
      voltage: '100-277V AC',
      material: 'Die-cast+PC',
      colorTemp: '3000K-5700K Tunable',
      warranty: '5 Years'
    },
    description: 'The ultimate smart street light featuring NEMA socket for IoT controllers. Allows for centralized monitoring and dynamic dimming.',
    features: [
      'Smart city IoT ready',
      'Dynamic dimming schedules',
      'Color temperature tuning',
      'Power consumption monitoring',
      'Fault detection alerts',
      'Heavy duty surge protection'
    ],
    applications: [
      'Smart city projects',
      'Highways',
      'Commercial zones',
      'Municipal roads'
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    colors: ['#1F2833']
  },

  // STADIUM LIGHTS
  {
    id: 11,
    name: 'Lexis ArenaPro 500W',
    category: 'stadium-lights',
    subCategory: 'Professional Stadium',
    price: 14999,
    rating: 4.9,
    reviews: 15,
    image: '/images/products/arenapro-500w.jpg',
    thumbnail: '/images/products/arenapro-500w-thumb.jpg',
    badge: 'PROFESSIONAL',
    specs: {
      wattage: '500W',
      lumens: '70000 LM',
      beamAngle: '15°/30°/60°',
      ipRating: 'IP67',
      cri: '>90',
      lifespan: '60000 Hrs',
      voltage: '200-480V AC',
      material: 'Aviation Aluminum',
      colorTemp: '5600K',
      warranty: '5 Years'
    },
    description: 'Designed for professional sports arenas and high-definition TV broadcasting. Features precise beam control and flicker-free operation.',
    features: [
      'Flicker-free for slow-mo TV',
      'High CRI >90 for true colors',
      'Laser pointer for aiming',
      'Advanced cooling system',
      'Remote driver option',
      'Wind load tested design'
    ],
    applications: [
      'Cricket stadiums',
      'Football grounds',
      'Racetracks',
      'Large outdoor arenas'
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    colors: ['#0B0C10']
  },
  {
    id: 12,
    name: 'Lexis MiniStadium 300W',
    category: 'stadium-lights',
    subCategory: 'Amateur Stadium',
    price: 8999,
    rating: 4.7,
    reviews: 42,
    image: '/images/products/ministadium-300w.jpg',
    thumbnail: '/images/products/ministadium-300w-thumb.jpg',
    badge: 'VALUE',
    specs: {
      wattage: '300W',
      lumens: '42000 LM',
      beamAngle: '30°/60°',
      ipRating: 'IP66',
      cri: '>85',
      lifespan: '50000 Hrs',
      voltage: '100-240V AC',
      material: 'Die-cast Aluminum',
      colorTemp: '5000K',
      warranty: '3 Years'
    },
    description: 'Perfect for local sports clubs and community fields. Offers professional quality at a price point accessible for smaller venues.',
    features: [
      'Great value for performance',
      'Precision lens optics',
      'Heavy duty bracket',
      'Corrosion resistant finish',
      'Low wind resistance',
      'Easy aiming scale'
    ],
    applications: [
      'School sports fields',
      'Tennis courts',
      'Local community parks',
      'Industrial complexes'
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    colors: ['#1F2833']
  },

  // COMMERCIAL LIGHTS
  {
    id: 13,
    name: 'Lexis PanelPro 36W',
    category: 'commercial-lights',
    subCategory: 'LED Panel',
    price: 899,
    rating: 4.8,
    reviews: 320,
    image: '/images/products/panelpro-36w.jpg',
    thumbnail: '/images/products/panelpro-36w-thumb.jpg',
    badge: 'BESTSELLER',
    specs: {
      wattage: '36W',
      lumens: '4320 LM',
      beamAngle: '120°',
      ipRating: 'IP20',
      cri: '>90',
      lifespan: '50000 Hrs',
      voltage: '100-240V AC',
      material: 'Aluminum Frame+PS',
      colorTemp: '3000K/4000K/6500K',
      warranty: '2 Years'
    },
    description: 'Ultra-slim back-lit LED panel for T-bar ceilings. Provides soft, uniform light without glare, perfect for office environments.',
    features: [
      'Ultra-thin 10mm profile',
      'Back-lit for uniform light',
      'No yellowing PMMA guide',
      'UGR <19 low glare option',
      'Flicker-free driver',
      'Suspended or recessed mount'
    ],
    applications: [
      'Modern offices',
      'Hospitals',
      'Schools & universities',
      'Retail stores'
    ],
    isNew: false,
    isBestseller: true,
    inStock: true,
    colors: ['#FFFFFF']
  },
  {
    id: 14,
    name: 'Lexis TrackLight 30W',
    category: 'commercial-lights',
    subCategory: 'Track Light',
    price: 1499,
    rating: 4.7,
    reviews: 110,
    image: '/images/products/tracklight-30w.jpg',
    thumbnail: '/images/products/tracklight-30w-thumb.jpg',
    badge: 'POPULAR',
    specs: {
      wattage: '30W',
      lumens: '3600 LM',
      beamAngle: '24°/36°',
      ipRating: 'IP20',
      cri: '>95',
      lifespan: '45000 Hrs',
      voltage: '100-240V AC',
      material: 'Aluminum+Glass Lens',
      colorTemp: '3000K/4000K',
      warranty: '2 Years'
    },
    description: 'High CRI track light for retail and display applications. Features 360-degree rotation and 90-degree tilt for precise aiming.',
    features: [
      'CRI >95 for true colors',
      '360° rotation, 90° tilt',
      'Changeable beam angles',
      'Global 3-circuit adapter',
      'Pure aluminum heat sink',
      'Deep anti-glare design'
    ],
    applications: [
      'Art galleries',
      'Retail showrooms',
      'Fashion boutiques',
      'Jewelry stores'
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    colors: ['#000000', '#FFFFFF']
  },
  {
    id: 15,
    name: 'Lexis Downlight Pro 20W',
    category: 'commercial-lights',
    subCategory: 'Downlight',
    price: 699,
    rating: 4.6,
    reviews: 145,
    image: '/images/products/downlight-20w.jpg',
    thumbnail: '/images/products/downlight-20w-thumb.jpg',
    badge: 'PREMIUM',
    specs: {
      wattage: '20W',
      lumens: '2400 LM',
      beamAngle: '60°',
      ipRating: 'IP44',
      cri: '>90',
      lifespan: '45000 Hrs',
      voltage: '100-240V AC',
      material: 'Aluminum+PC',
      colorTemp: '2700K-5000K Tunable',
      warranty: '2 Years'
    },
    description: 'Premium recessed downlight with deep reflector for low glare. Offers smooth dimming and tunable white features.',
    features: [
      'Deep cut-off for low glare',
      'Triac & 0-10V dimmable',
      'IP44 suitable for bathrooms',
      'Spring clips for easy fit',
      'External driver included',
      'Excellent color consistency'
    ],
    applications: [
      'Hotel lobbies',
      'High-end residential',
      'Conference rooms',
      'Reception areas'
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    colors: ['#FFFFFF']
  },

  // PAR LIGHTS
  {
    id: 16,
    name: 'Lexis PAR38 18W',
    category: 'par-lights',
    subCategory: 'PAR38 Series',
    price: 599,
    rating: 4.6,
    reviews: 88,
    image: '/images/products/par38-18w.jpg',
    thumbnail: '/images/products/par38-18w-thumb.jpg',
    badge: 'BESTSELLER',
    specs: {
      wattage: '18W',
      lumens: '1800 LM',
      beamAngle: '25°/40°',
      ipRating: 'IP65',
      cri: '>82',
      lifespan: '30000 Hrs',
      voltage: '100-240V AC',
      material: 'Aluminum+Glass',
      colorTemp: '3000K/6500K',
      warranty: '1 Year'
    },
    description: 'Standard PAR38 bulb with E27 base. Perfect for accent lighting and outdoor fixtures with its IP65 rating.',
    features: [
      'Standard E27 screw base',
      'IP65 water resistant',
      'Glass front cover',
      'Direct retrofit for halogen',
      'No warm-up time',
      'Saves 85% energy'
    ],
    applications: [
      'Landscape spot lighting',
      'Track fixtures',
      'Recessed cans',
      'Display lighting'
    ],
    isNew: false,
    isBestseller: true,
    inStock: true,
    colors: ['#FFFFFF']
  },
  {
    id: 17,
    name: 'Lexis PAR56 RGBW 36W',
    category: 'par-lights',
    subCategory: 'PAR56 Series',
    price: 1299,
    rating: 4.7,
    reviews: 54,
    image: '/images/products/par56-rgbw-36w.jpg',
    thumbnail: '/images/products/par56-rgbw-36w-thumb.jpg',
    badge: 'NEW',
    specs: {
      wattage: '36W',
      lumens: '3600 LM',
      beamAngle: '25°',
      ipRating: 'IP65',
      cri: 'N/A(RGBW)',
      lifespan: '40000 Hrs',
      voltage: '100-240V AC',
      material: 'Aluminum+PMMA',
      colorTemp: 'RGB+White',
      warranty: '1 Year'
    },
    description: 'Powerful RGBW PAR56 lamp for stage and architectural lighting. Combines rich colors with a pure white chip for versatility.',
    features: [
      'Dedicated warm white chip',
      'DMX512 control compatible',
      'Die-cast housing for cooling',
      'Smooth color mixing',
      'Strobe and fade effects',
      'High-power LED chips'
    ],
    applications: [
      'Stage wash lighting',
      'Swimming pools (with fixture)',
      'Event backdrops',
      'Fountain lighting'
    ],
    isNew: true,
    isBestseller: false,
    inStock: true,
    colors: ['#0B0C10']
  }
]

export const sortOptions = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Newest', value: 'newest' }
]

export const comparisonFeatures = [
  'wattage', 'lumens', 'beamAngle', 'ipRating', 'cri', 'lifespan', 'voltage', 'material', 'colorTemp', 'warranty'
]
