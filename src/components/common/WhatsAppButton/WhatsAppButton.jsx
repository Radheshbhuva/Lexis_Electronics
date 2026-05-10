import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, HelpCircle, Package, Wrench, FileText, Percent, Clock, Check } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryForm, setInquiryForm] = useState({ name: '', phone: '', message: '', product: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const panelRef = useRef(null);

  // Business hours: Mon-Sat, 9:30 AM - 7:00 PM IST
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      // Get time in IST
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const day = istTime.getDay(); // 0 is Sunday, 1 is Monday...
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();

      const currentMinutes = hours * 60 + minutes;
      const startMinutes = 9 * 60 + 30; // 9:30 AM
      const endMinutes = 19 * 60; // 7:00 PM

      const isWorkingDay = day >= 1 && day <= 6; // Mon-Sat
      const isWorkingHour = currentMinutes >= startMinutes && currentMinutes <= endMinutes;

      setIsOnline(isWorkingDay && isWorkingHour);
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Tooltip auto-hide
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && !event.target.closest('.whatsapp-main-button')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const inquiryTypes = [
    { id: 'quote', icon: FileText, label: 'Get Quote', color: '#F2A900', message: 'Hi Lexis Electronics, I would like to get a quote for your LED lighting products.' },
    { id: 'product', icon: Package, label: 'Product Info', color: '#00D2FF', message: 'Hi Lexis Electronics, I need information about your products. Can you help me choose the right lighting solution?' },
    { id: 'support', icon: Wrench, label: 'Technical Support', color: '#10B981', message: 'Hi Lexis Electronics, I need technical support regarding installation/maintenance.' },
    { id: 'bulk', icon: Percent, label: 'Bulk Order', color: '#8B5CF6', message: 'Hi Lexis Electronics, I want to place a bulk order. Please share your best prices.' },
    { id: 'custom', icon: HelpCircle, label: 'Other Inquiry', color: '#F59E0B', message: '' }
  ];

  const handleInquirySelect = (type) => {
    setSelectedInquiry(type);
    setInquiryForm({ ...inquiryForm, message: type.message });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryForm({ ...inquiryForm, [name]: value });
  };

  const openWhatsApp = () => {
    if (!inquiryForm.name || !inquiryForm.phone) {
      alert('Name and Phone are required.');
      return;
    }
    if (selectedInquiry?.id === 'custom' && !inquiryForm.message) {
      alert('Please enter a message.');
      return;
    }
    if (inquiryForm.phone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid phone number with at least 10 digits.');
      return;
    }

    setIsSubmitting(true);

    const fullMessage = `New Inquiry - Lexis Electronics

👤 Name: ${inquiryForm.name}
📱 Phone: ${inquiryForm.phone}
🔍 Inquiry Type: ${selectedInquiry?.label || 'Custom'}
📦 Product Interest: ${inquiryForm.product || 'N/A'}

💬 Message:
${inquiryForm.message}`;

    const encodedMessage = encodeURIComponent(fullMessage);
    const phoneNumber = '919601291330';
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(url, '_blank');
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setSelectedInquiry(null);
        setInquiryForm({ name: '', phone: '', message: '', product: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="whatsapp-container">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="whatsapp-tooltip absolute right-20 top-1/2 -translate-y-1/2 bg-[#1F2833]/95 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/10 shadow-xl whitespace-nowrap"
          >
            Chat with us on WhatsApp!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-main-button whatsapp-float relative w-16 h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white shadow-2xl z-50 hover:scale-110 transition-transform duration-300"
      >
        {/* Pulsing Rings */}
        <div className="whatsapp-pulse-ring"></div>
        <div className="whatsapp-pulse-ring whatsapp-pulse-ring-delayed"></div>

        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}

        {/* Status Dot */}
        <div className={`absolute top-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${isOnline ? 'bg-[#10B981]' : 'bg-[#F59E0B]'} status-dot-pulse`}></div>
      </motion.button>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="whatsapp-panel absolute bottom-20 right-0 w-[380px] max-h-[600px] bg-[#0B0C10]/90 backdrop-blur-xl rounded-[24px] border border-[#F2A900]/15 shadow-2xl flex flex-col overflow-hidden z-40"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366]/20 to-[#128C7E]/20 p-6 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Lexis Electronics</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`}></div>
                    <span className="text-xs text-gray-300">
                      {isOnline ? 'Online - Typically replies within minutes' : 'Offline - We\'ll respond when back'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-[#F2A900] text-xs">★</span>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">5.0</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 whatsapp-panel-scroll">
              {!selectedInquiry ? (
                <>
                  <p className="text-sm text-gray-400 mb-3">Choose inquiry type:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {inquiryTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => handleInquirySelect(type)}
                          className="inquiry-card p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-2 text-center hover:bg-white/10 transition-colors"
                          style={{ borderColor: `rgba(${parseInt(type.color.slice(1, 3), 16)}, ${parseInt(type.color.slice(3, 5), 16)}, ${parseInt(type.color.slice(5, 7), 16)}, 0.1)` }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = type.color}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                        >
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${type.color}20`, color: type.color }}>
                            <Icon size={20} />
                          </div>
                          <span className="text-xs font-medium text-white">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="text-xs text-gray-400 hover:text-white self-start flex items-center gap-1"
                  >
                    ← Back to options
                  </button>

                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={inquiryForm.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="whatsapp-input w-full bg-deep-space/80 bg-[#0B0C10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25D366]/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={inquiryForm.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="whatsapp-input w-full bg-deep-space/80 bg-[#0B0C10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25D366]/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Product Interest</label>
                      <select
                        name="product"
                        value={inquiryForm.product}
                        onChange={handleInputChange}
                        className="whatsapp-input w-full bg-deep-space/80 bg-[#0B0C10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25D366]/50 transition-colors"
                      >
                        <option value="">Select a product</option>
                        <option value="Flood Light">Flood Light</option>
                        <option value="Street Light">Street Light</option>
                        <option value="Highbay UFO">Highbay UFO</option>
                        <option value="Stadium Light">Stadium Light</option>
                        <option value="Commercial Light">Commercial Light</option>
                        <option value="PAR Light">PAR Light</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Message</label>
                      <textarea
                        name="message"
                        value={inquiryForm.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="whatsapp-input w-full bg-deep-space/80 bg-[#0B0C10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25D366]/50 transition-colors resize-none"
                        placeholder="Type your message here..."
                      />
                    </div>

                    <button
                      onClick={openWhatsApp}
                      disabled={isSubmitting || isSubmitted}
                      className={`whatsapp-submit-shimmer w-full py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Opening WhatsApp...</span>
                        </>
                      ) : isSubmitted ? (
                        <>
                          <Check size={20} className="checkmark-animate" />
                          <span>Opening...</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle size={20} />
                          <span>Start WhatsApp Chat</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">
                📍 Surat, Gujarat | ⏰ Mon-Sat, 9:30 AM - 7:00 PM
              </p>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <Phone size={12} />
                <span>096012 91330</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppButton;
