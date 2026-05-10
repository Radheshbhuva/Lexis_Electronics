import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  Play, Pause, X, Maximize2, ChevronLeft, ChevronRight,
  Filter, Grid3X3, LayoutGrid, Film, Camera, Image as ImageIcon,
  MapPin, Calendar, Tag, Download, Share2, Heart, Eye,
  Zap, Building2, Warehouse, Shield, Clock
} from 'lucide-react';
import './GalleryPage.css';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  // VIDEOS (8 items)
  {
    id: 'vid-1',
    type: 'video',
    title: 'UFO Highbay Light Installation - Industrial Warehouse',
    description: 'Watch our 150W UFO Highbay lights transform a 50,000 sq ft warehouse into a brilliantly illuminated workspace.',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8be3619883?auto=format&fit=crop&w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-large-warehouse-with-shelves-and-boxes-33246-large.mp4',
    poster: 'https://images.unsplash.com/photo-1586528116311-ad8be3619883?auto=format&fit=crop&w=1200&q=80',
    duration: '2:45',
    category: 'highbay-lights',
    location: 'GIDC Industrial Estate, Sachin, Surat',
    date: '2024-01-15',
    featured: true,
    views: 15420,
    tags: ['warehouse', 'industrial', 'highbay', 'UFO light', 'installation']
  },
  {
    id: 'vid-2',
    type: 'video',
    title: 'Stadium Flood Light Setup - Sports Complex',
    description: 'Professional stadium lighting installation for a cricket ground. 500W ArenaPro lights delivering broadcast-quality illumination.',
    thumbnail: 'https://images.unsplash.com/photo-1524143710777-6693526ca3cd?auto=format&fit=crop&w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-stadium-at-night-with-bright-lights-4244-large.mp4',
    poster: 'https://images.unsplash.com/photo-1524143710777-6693526ca3cd?auto=format&fit=crop&w=1200&q=80',
    duration: '4:12',
    category: 'stadium-lights',
    location: 'Sports Complex, Adajan, Surat',
    date: '2024-02-20',
    featured: true,
    views: 23450,
    tags: ['stadium', 'cricket', 'sports lighting', 'ArenaPro', '500W']
  },
  {
    id: 'vid-3',
    type: 'video',
    title: 'Smart Street Light Installation - Smart City Project',
    description: 'IoT-enabled 90W smart street lights with remote monitoring capabilities installed across a tech park campus.',
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-highway-at-night-34538-large.mp4',
    poster: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    duration: '3:30',
    category: 'street-lights',
    location: 'Tech Park, VIP Road, Surat',
    date: '2024-03-10',
    featured: true,
    views: 8930,
    tags: ['smart city', 'IoT', 'street light', 'solar', 'wireless control']
  },
  {
    id: 'vid-4',
    type: 'video',
    title: 'Commercial Office Lighting Transformation',
    description: 'Complete office lighting makeover with LED panel lights and track lights creating a modern, productive workspace.',
    thumbnail: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-modern-office-interior-with-desks-and-computers-42777-large.mp4',
    poster: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    duration: '5:00',
    category: 'commercial-lights',
    location: 'Corporate Hub, Ring Road, Surat',
    date: '2024-04-05',
    featured: false,
    views: 12450,
    tags: ['office', 'commercial', 'panel light', 'track light', 'modern']
  },
  {
    id: 'vid-5',
    type: 'video',
    title: 'Industrial Flood Light Testing',
    description: 'Stress testing our IP66 rated 200W flood lights under extreme water and dust conditions.',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-working-with-welding-sparks-at-night-42861-large.mp4',
    poster: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    duration: '1:50',
    category: 'flood-lights',
    location: 'Testing Lab, Lexis Factory, Surat',
    date: '2024-04-20',
    featured: false,
    views: 5600,
    tags: ['flood light', 'testing', 'IP66', 'waterproof']
  },
  {
    id: 'vid-6',
    type: 'video',
    title: 'PAR Light Showcase - Retail Store',
    description: 'Dynamic accent lighting using our high-CRI PAR lights in a luxury fashion boutique.',
    thumbnail: 'https://images.unsplash.com/photo-1441986305356-274e51917be2?auto=format&fit=crop&w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-man-walking-through-a-clothing-store-42795-large.mp4',
    poster: 'https://images.unsplash.com/photo-1441986305356-274e51917be2?auto=format&fit=crop&w=1200&q=80',
    duration: '2:15',
    category: 'par-lights',
    location: 'Luxury Mall, Dumas Road, Surat',
    date: '2024-05-02',
    featured: false,
    views: 7200,
    tags: ['PAR light', 'retail', 'boutique', 'accent lighting']
  },
  {
    id: 'vid-7',
    type: 'video',
    title: 'Highway Street Light Drone View',
    description: 'Stunning aerial view of the newly installed Lexis street lights along the outer ring road.',
    thumbnail: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-night-with-traffic-42799-large.mp4',
    poster: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=1200&q=80',
    duration: '3:00',
    category: 'street-lights',
    location: 'Outer Ring Road, Surat',
    date: '2024-05-15',
    featured: true,
    views: 18500,
    tags: ['drone', 'highway', 'street light', 'aerial']
  },
  {
    id: 'vid-8',
    type: 'video',
    title: 'Highbay Lights in Auto Assembly Plant',
    description: 'Our linear and UFO highbay lights providing uniform illumination for a precision auto assembly line.',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-automobile-manufacturing-line-with-robotic-arms-42848-large.mp4',
    poster: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    duration: '4:05',
    category: 'highbay-lights',
    location: 'Auto Hub, Hazira, Surat',
    date: '2024-05-25',
    featured: false,
    views: 9400,
    tags: ['auto plant', 'manufacturing', 'highbay', 'precision']
  },

  // PHOTOS (16 items)
  {
    id: 'photo-1',
    type: 'photo',
    title: 'Facade Lighting - Commercial Complex',
    description: 'Dramatically illuminating the architectural features of a modern commercial building with our 50W linear flood lights.',
    thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    category: 'flood-lights',
    location: 'Commercial Hub, Vesu, Surat',
    date: '2024-01-20',
    featured: true,
    views: 12000,
    resolution: '1920x1080',
    tags: ['facade', 'architecture', 'flood light', 'commercial']
  },
  {
    id: 'photo-2',
    type: 'photo',
    title: 'Textile Mill Highbay Lighting',
    description: 'High-efficiency UFO highbay lights providing 500 lux illumination at the floor level of a large textile weaving unit.',
    thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80',
    category: 'highbay-lights',
    location: 'Textile SEZ, Sachin, Surat',
    date: '2024-02-05',
    featured: true,
    views: 8500,
    resolution: '1920x1080',
    tags: ['textile', 'mill', 'highbay', 'UFO']
  },
  {
    id: 'photo-3',
    type: 'photo',
    title: 'Urban Street Lighting Project',
    description: 'Lexis 120W LED street lights providing uniform, glare-free lighting along a major city avenue.',
    thumbnail: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1200&q=80',
    category: 'street-lights',
    location: 'Gaurav Path, Surat',
    date: '2024-02-18',
    featured: false,
    views: 6300,
    resolution: '1920x1080',
    tags: ['street light', 'urban', 'city', 'avenue']
  },
  {
    id: 'photo-4',
    type: 'photo',
    title: 'Indoor Sports Arena Lighting',
    description: 'Shadow-free illumination for a badminton and tennis academy using our specialized asymmetric flood lights.',
    thumbnail: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=80',
    category: 'stadium-lights',
    location: 'Sports Academy, Pal, Surat',
    date: '2024-03-01',
    featured: true,
    views: 10500,
    resolution: '1920x1080',
    tags: ['indoor sports', 'arena', 'flood light', 'sports']
  },
  {
    id: 'photo-5',
    type: 'photo',
    title: 'Luxury Retail Track Lighting',
    description: 'High-end jewelry showroom illuminated with our precision beam track lights and COB downlights.',
    thumbnail: 'https://images.unsplash.com/photo-1582037928869-346754f7590c?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1582037928869-346754f7590c?auto=format&fit=crop&w=1200&q=80',
    category: 'commercial-lights',
    location: 'Jewels Street, Surat',
    date: '2024-03-15',
    featured: false,
    views: 7400,
    resolution: '1920x1080',
    tags: ['retail', 'showroom', 'track light', 'COB']
  },
  {
    id: 'photo-6',
    type: 'photo',
    title: 'Hotel Banquet Hall PAR Lights',
    description: 'Creating the perfect ambiance with our dimmable, color-tunable PAR lights for a grand wedding reception.',
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    category: 'par-lights',
    location: 'Grand Hotel, Dumas, Surat',
    date: '2024-03-28',
    featured: true,
    views: 14000,
    resolution: '1920x1080',
    tags: ['hotel', 'banquet', 'PAR light', 'ambiance']
  },
  {
    id: 'photo-7',
    type: 'photo',
    title: 'Outdoor Parking Lot Flood Lights',
    description: 'Wide-beam 100W flood lights providing safe and bright illumination for a large mall parking area.',
    thumbnail: 'https://images.unsplash.com/photo-1590674854385-d5bf589f596b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1590674854385-d5bf589f596b?auto=format&fit=crop&w=1200&q=80',
    category: 'flood-lights',
    location: 'Central Mall, Surat',
    date: '2024-04-02',
    featured: false,
    views: 5200,
    resolution: '1920x1080',
    tags: ['parking', 'flood light', 'outdoor', 'mall']
  },
  {
    id: 'photo-8',
    type: 'photo',
    title: 'Cold Storage Highbay Lighting',
    description: 'IP65 rated highbay lights operating perfectly at -20°C in a large frozen food cold storage facility.',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8be3619883?auto=format&fit=crop&w=800&q=80', // Reusing warehouse image
    src: 'https://images.unsplash.com/photo-1586528116311-ad8be3619883?auto=format&fit=crop&w=1200&q=80',
    category: 'highbay-lights',
    location: 'Cold Chain Ltd, Hazira, Surat',
    date: '2024-04-10',
    featured: false,
    views: 4800,
    resolution: '1920x1080',
    tags: ['cold storage', 'highbay', 'IP65', 'industrial']
  },
  {
    id: 'photo-9',
    type: 'photo',
    title: 'Bridge LED Lighting Project',
    description: 'Dynamic RGB flood lights and linear wall washers transforming a river bridge into a night landmark.',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    category: 'flood-lights',
    location: 'Tapi River Bridge, Surat',
    date: '2024-04-18',
    featured: true,
    views: 16500,
    resolution: '1920x1080',
    tags: ['bridge', 'RGB', 'landmark', 'flood light']
  },
  {
    id: 'photo-10',
    type: 'photo',
    title: 'Modern Office LED Panels',
    description: 'Ultra-slim, flicker-free LED panel lights providing comfortable lighting for a large IT workspace.',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c564bd248275?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1504384308090-c564bd248275?auto=format&fit=crop&w=1200&q=80',
    category: 'commercial-lights',
    location: 'IT Park, Surat',
    date: '2024-04-25',
    featured: false,
    views: 6100,
    resolution: '1920x1080',
    tags: ['office', 'LED panel', 'workspace', 'IT']
  },
  {
    id: 'photo-11',
    type: 'photo',
    title: 'Cricket Ground Flood Lighting',
    description: '400W stadium flood lights providing high-mast illumination for night cricket matches.',
    thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    category: 'stadium-lights',
    location: 'District Stadium, Surat',
    date: '2024-05-01',
    featured: true,
    views: 11200,
    resolution: '1920x1080',
    tags: ['cricket', 'stadium', 'flood light', 'high mast']
  },
  {
    id: 'photo-12',
    type: 'photo',
    title: 'Warehouse Racking Highbay Lights',
    description: 'Linear highbay lights optimized for narrow aisles in a high-density warehouse racking system.',
    thumbnail: 'https://images.unsplash.com/photo-1553413294-275982aa60ac?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1553413294-275982aa60ac?auto=format&fit=crop&w=1200&q=80',
    category: 'highbay-lights',
    location: 'Logistics Park, Surat',
    date: '2024-05-08',
    featured: false,
    views: 5400,
    resolution: '1920x1080',
    tags: ['warehouse', 'racking', 'linear highbay', 'aisle']
  },
  {
    id: 'photo-13',
    type: 'photo',
    title: 'Art Gallery Spot Lighting',
    description: 'High-CRI PAR lights showcasing artworks with precise color rendering and zero UV emission.',
    thumbnail: 'https://images.unsplash.com/photo-1531053159509-3220fe4fa9ee?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1531053159509-3220fe4fa9ee?auto=format&fit=crop&w=1200&q=80',
    category: 'par-lights',
    location: 'City Art Gallery, Surat',
    date: '2024-05-12',
    featured: false,
    views: 4200,
    resolution: '1920x1080',
    tags: ['art gallery', 'spotlight', 'PAR light', 'CRI']
  },
  {
    id: 'photo-14',
    type: 'photo',
    title: 'Residential Complex Street Lights',
    description: 'Sleek, modern 60W street lights enhancing safety and aesthetics in a premium residential township.',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    category: 'street-lights',
    location: 'Premium Township, Surat',
    date: '2024-05-18',
    featured: false,
    views: 5900,
    resolution: '1920x1080',
    tags: ['residential', 'street light', 'township', 'safety']
  },
  {
    id: 'photo-15',
    type: 'photo',
    title: 'Industrial High-Temperature Highbay',
    description: 'Specialized highbay lights operating in a high-temperature forging unit with advanced thermal management.',
    thumbnail: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    category: 'highbay-lights',
    location: 'Forging Unit, Surat',
    date: '2024-05-22',
    featured: true,
    views: 7100,
    resolution: '1920x1080',
    tags: ['industrial', 'forging', 'high temperature', 'highbay']
  },
  {
    id: 'photo-16',
    type: 'photo',
    title: 'Underpass LED Lighting',
    description: 'Continuous linear LED flood lights providing high visibility and safety in a busy city underpass.',
    thumbnail: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80',
    category: 'flood-lights',
    location: 'City Underpass, Surat',
    date: '2024-05-28',
    featured: false,
    views: 6800,
    resolution: '1920x1080',
    tags: ['underpass', 'flood light', 'safety', 'urban']
  }
];

const categories = [
  { id: 'all', label: 'All', icon: Grid3X3 },
  { id: 'flood-lights', label: 'Flood Lights', icon: Camera },
  { id: 'highbay-lights', label: 'Highbay Lights', icon: Warehouse },
  { id: 'street-lights', label: 'Street Lights', icon: MapPin },
  { id: 'stadium-lights', label: 'Stadium Lights', icon: Shield },
  { id: 'commercial-lights', label: 'Commercial Lights', icon: Building2 },
  { id: 'par-lights', label: 'PAR Lights', icon: Zap }
];

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeMediaType, setActiveMediaType] = useState('all'); // 'all', 'photo', 'video'
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isMasonry, setIsMasonry] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  const videoRef = useRef(null);
  const heroRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtering Logic
  useEffect(() => {
    let result = [...galleryData];

    if (activeFilter !== 'all') {
      result = result.filter(item => item.category === activeFilter);
    }

    if (activeMediaType !== 'all') {
      result = result.filter(item => item.type === activeMediaType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter(item => 
        selectedTags.every(tag => item.tags.includes(tag))
      );
    }

    // Sort: featured first, then date
    result.sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return new Date(b.date) - new Date(a.date);
    });

    setFilteredItems(result);
    setCurrentPage(1);
  }, [activeFilter, activeMediaType, searchQuery, selectedTags]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: heroRef.current?.offsetHeight || 0, behavior: 'smooth' });
  };

  // Lightbox Handlers
  const openLightbox = (item, index) => {
    setSelectedItem(item);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    setIsPlaying(true); // Auto play video if it is video
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedItem(null);
    setIsPlaying(false);
  };

  const navigateLightbox = (direction) => {
    let newIndex = lightboxIndex + direction;
    if (newIndex < 0) newIndex = filteredItems.length - 1;
    if (newIndex >= filteredItems.length) newIndex = 0;
    setLightboxIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
    setIsPlaying(true);
  };

  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleShare = (item) => {
    navigator.clipboard.writeText(`${window.location.origin}/gallery?item=${item.id}`);
    alert('Link copied to clipboard!');
  };

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === ' ') {
        e.preventDefault();
        if (selectedItem?.type === 'video') {
          setIsPlaying(prev => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxIndex, filteredItems, selectedItem]);

  // Video play/pause effect
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, selectedItem]);

  return (
    <div className="gallery-page text-white font-sans">
      {/* Hero Section */}
      <section ref={heroRef} className="gallery-hero min-h-[40vh] flex items-center justify-center relative overflow-hidden">
        <div className="gallery-hero-canvas bg-deep-space absolute inset-0">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 48c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM54 24c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM54 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z\' fill=\'%23F2A900\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>
        </div>
        
        <div className="gallery-hero-content relative z-10 text-center px-4 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-photon-blue text-sm uppercase tracking-widest font-semibold mb-2 block"
          >
            Our Work
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 font-space-grotesk"
          >
            Lighting <span className="text-white">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto"
          >
            Explore our installations and see how Lexis Electronics transforms spaces across Gujarat with premium LED solutions.
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 max-w-3xl mx-auto"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-lexis-gold">24+</h3>
              <p className="text-xs text-gray-500 uppercase">Installations</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-photon-blue">8</h3>
              <p className="text-xs text-gray-500 uppercase">Video Tours</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">16</h3>
              <p className="text-xs text-gray-500 uppercase">Photo Galleries</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-lexis-gold">6</h3>
              <p className="text-xs text-gray-500 uppercase">Categories</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="gallery-filter-bar bg-[#0B0C10]/90 backdrop-blur-xl border-y border-white/5 sticky top-[70px] md:top-[80px] z-30 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-lexis-gold transition-colors text-white"
              />
            </div>

            {/* Media Type & View Toggle */}
            <div className="flex gap-4 items-center w-full md:w-auto justify-between md:justify-end">
              <div className="media-type-toggle">
                <button
                  onClick={() => setActiveMediaType('all')}
                  className={`media-type-option ${activeMediaType === 'all' ? 'active' : ''}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveMediaType('photo')}
                  className={`media-type-option ${activeMediaType === 'photo' ? 'active' : ''}`}
                >
                  <ImageIcon size={14} className="mr-1" /> Photos
                </button>
                <button
                  onClick={() => setActiveMediaType('video')}
                  className={`media-type-option ${activeMediaType === 'video' ? 'active' : ''}`}
                >
                  <Film size={14} className="mr-1" /> Videos
                </button>
              </div>

              <div className="flex border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setIsMasonry(true)}
                  className={`p-2 transition-colors ${isMasonry ? 'bg-lexis-gold text-0B0C10' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setIsMasonry(false)}
                  className={`p-2 transition-colors ${!isMasonry ? 'bg-lexis-gold text-0B0C10' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                >
                  <Grid3X3 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const count = cat.id === 'all' 
                ? galleryData.length 
                : galleryData.filter(i => i.category === cat.id).length;
              
              if (count === 0 && cat.id !== 'all') return null;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`category-filter-btn flex items-center gap-2 transition-all ${activeFilter === cat.id ? 'active' : ''}`}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                  <span className="count">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tags */}
        {selectedTags.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-3 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500">Active Tags:</span>
            {selectedTags.map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-lexis-gold/20 text-lexis-gold text-xs px-2 py-1 rounded-full">
                {tag}
                <button onClick={() => toggleTag(tag)} className="hover:text-white"><X size={12} /></button>
              </span>
            ))}
            <button onClick={() => setSelectedTags([])} className="text-xs text-gray-400 hover:text-white underline">Clear all</button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 mt-4 text-sm text-gray-500">
        Showing {filteredItems.length} of {galleryData.length} items
      </div>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className={isMasonry ? "gallery-masonry" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="gallery-skeleton mb-6">
                <div className="gallery-skeleton-thumbnail"></div>
                <div className="gallery-skeleton-content">
                  <div className="gallery-skeleton-line w-3/4"></div>
                  <div className="gallery-skeleton-line w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="gallery-empty py-20 flex flex-col items-center justify-center text-center">
            <div className="gallery-empty-icon mb-4 bg-white/5 p-4 rounded-full">
              <Camera size={40} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">No gallery items found</h3>
            <p className="text-gray-500 mb-4 max-w-md">Try adjusting your filters or search terms to find what you are looking for.</p>
            <button
              onClick={() => { setActiveFilter('all'); setActiveMediaType('all'); setSearchQuery(''); setSelectedTags([]); }}
              className="bg-lexis-gold text-0B0C10 px-6 py-2 rounded-xl font-medium hover:bg-white transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={isMasonry ? "gallery-masonry" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
            {currentItems.map((item, index) => {
              const globalIndex = indexOfFirstItem + index;
              const isLiked = likedItems.includes(item.id);
              const isLoaded = loadedImages[item.id];
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`gallery-masonry-item ${isMasonry ? 'mb-6' : ''}`}
                >
                  <div className="gallery-card group" onClick={() => openLightbox(item, globalIndex)}>
                    {/* Thumbnail */}
                    <div className="gallery-thumbnail relative bg-white/5">
                      {!isLoaded && (
                        <div className="absolute inset-0 gallery-skeleton-thumbnail"></div>
                      )}
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        loading="lazy"
                        onLoad={() => handleImageLoad(item.id)}
                        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                      />
                      
                      {/* Video Indicator */}
                      {item.type === 'video' && isLoaded && (
                        <div className="video-play-btn">
                          <Play size={20} className="text-white fill-white ml-0.5" />
                        </div>
                      )}

                      {/* Badges */}
                      <div className="category-badge">
                        <span className="w-1.5 h-1.5 rounded-full bg-photon-blue mr-1"></span>
                        {item.category.replace('-', ' ')}
                      </div>

                      {item.featured && (
                        <div className="featured-badge">
                          <span>★</span> Featured
                        </div>
                      )}

                      <div className="duration-badge">
                        {item.type === 'video' ? <Clock size={12} className="mr-1" /> : <ImageIcon size={12} className="mr-1" />}
                        {item.type === 'video' ? item.duration : item.resolution}
                      </div>

                      {/* Hover Overlay */}
                      <div className="gallery-hover-overlay">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                          className={`overlay-action-btn ${isLiked ? 'liked' : ''}`}
                        >
                          <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                        </button>
                        <button className="overlay-action-btn" onClick={(e) => { e.stopPropagation(); handleShare(item); }}>
                          <Share2 size={14} />
                        </button>
                        <button className="overlay-action-btn">
                          <Maximize2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="gallery-card-content">
                      <h3 className="gallery-card-title group-hover:text-lexis-gold transition-colors">{item.title}</h3>
                      <div className="gallery-card-meta">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {item.location}
                        </span>
                      </div>
                      <div className="gallery-card-meta justify-between text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> {item.views.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* Tags */}
                      <div className="gallery-card-tags mt-3">
                        {item.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag} 
                            className="gallery-tag"
                            onClick={(e) => { e.stopPropagation(); toggleTag(tag); }}
                          >
                            #{tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs text-gray-600 self-center">+{item.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="gallery-pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && selectedItem && (
          <div className="lightbox-overlay">
            <div className="lightbox-backdrop" onClick={closeLightbox}></div>
            
            <div className="lightbox-content max-w-6xl w-full mx-4">
              <button className="lightbox-close hover:bg-red-500 hover:text-white transition-colors" onClick={closeLightbox}>
                <X size={20} />
              </button>

              <button className="lightbox-nav lightbox-nav-left" onClick={() => navigateLightbox(-1)}>
                <ChevronLeft size={24} />
              </button>
              <button className="lightbox-nav lightbox-nav-right" onClick={() => navigateLightbox(1)}>
                <ChevronRight size={24} />
              </button>

              {/* Media Container */}
              <div className="lightbox-media bg-black/80 flex items-center justify-center">
                {selectedItem.type === 'video' ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video
                      ref={videoRef}
                      src={selectedItem.src}
                      poster={selectedItem.poster}
                      controls
                      autoPlay
                      className="max-h-[60vh] max-w-full"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                    {!isPlaying && (
                      <button 
                        className="absolute inset-0 flex items-center justify-center bg-black/30 group"
                        onClick={() => setIsPlaying(true)}
                      >
                        <div className="w-16 h-16 rounded-full bg-lexis-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={24} className="text-0B0C10 fill-0B0C10 ml-1" />
                        </div>
                      </button>
                    )}
                  </div>
                ) : (
                  <img 
                    src={selectedItem.src} 
                    alt={selectedItem.title} 
                    className="max-h-[60vh] max-w-full object-contain"
                  />
                )}
              </div>

              {/* Info Panel */}
              <div className="lightbox-info w-full bg-[#1F2833]/90 backdrop-blur-xl p-6 rounded-b-2xl border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="lightbox-info-title text-xl font-bold text-white mb-2">{selectedItem.title}</h2>
                    <p className="lightbox-info-description text-gray-400 text-sm mb-4">{selectedItem.description}</p>
                    
                    <div className="lightbox-info-meta flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
                      <span className="lightbox-info-meta-item flex items-center gap-1">
                        <MapPin size={12} /> {selectedItem.location}
                      </span>
                      <span className="lightbox-info-meta-item flex items-center gap-1">
                        <Calendar size={12} /> {selectedItem.date}
                      </span>
                      <span className="lightbox-info-meta-item flex items-center gap-1">
                        <Eye size={12} /> {selectedItem.views.toLocaleString()} views
                      </span>
                      <span className="lightbox-info-meta-item flex items-center gap-1 capitalize">
                        <Tag size={12} /> {selectedItem.category.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {selectedItem.tags.map(tag => (
                        <span key={tag} className="text-xs bg-white/5 px-2.5 py-1 rounded-full text-gray-400">#{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="lightbox-info-actions shrink-0 flex flex-wrap gap-2">
                    <button 
                      onClick={() => toggleLike(selectedItem.id)}
                      className={`lightbox-action-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${likedItems.includes(selectedItem.id) ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-white/5 text-white border-white/10'} border`}
                    >
                      <Heart size={14} fill={likedItems.includes(selectedItem.id) ? "currentColor" : "none"} />
                      <span>{likedItems.includes(selectedItem.id) ? 'Liked' : 'Like'}</span>
                    </button>
                    <button 
                      onClick={() => handleShare(selectedItem)}
                      className="lightbox-action-btn flex items-center gap-2 bg-white/5 text-white border border-white/10 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      <Share2 size={14} />
                      <span>Share</span>
                    </button>
                    {selectedItem.type === 'photo' && (
                      <a 
                        href={selectedItem.src} 
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lightbox-action-btn flex items-center gap-2 bg-lexis-gold text-0B0C10 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white transition-colors"
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="thumbnail-strip mt-6 pt-4 border-top border-white/5 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2">
                  {filteredItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`thumbnail-strip-item flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${idx === lightboxIndex ? 'border-lexis-gold scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                      onClick={() => { setLightboxIndex(idx); setSelectedItem(item); setIsPlaying(true); }}
                    >
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
