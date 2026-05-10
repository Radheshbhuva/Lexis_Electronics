import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Send, Loader } from 'lucide-react'

export default function ContactBeacon() {
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: '', phone: '', message: '' })

      // Auto-reset submitted state
      setTimeout(() => {
        setIsSubmitted(false)
      }, 4000)
    }, 2000)
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-32 bg-deep-space relative overflow-hidden">
      {/* Background Beacon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(242,169,0,0.1) 0%, rgba(0,210,255,0.05) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-photon-blue font-semibold mb-2 block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
            Let's <span className="light-text">Illuminate</span> Together
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or need custom lighting solutions? Reach out to us.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Column 1 - Form */}
          <motion.div
            className="glass-card p-8 md:p-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full bg-industrial-steel/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-lexis-gold/50 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full bg-industrial-steel/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-lexis-gold/50 focus:outline-none transition-colors"
                  placeholder="+91"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Message</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-industrial-steel/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-lexis-gold/50 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your lighting requirements..."
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                  isSubmitted 
                    ? 'bg-green-600 text-white' 
                    : isSubmitting
                    ? 'bg-industrial-steel text-gray-400 cursor-not-allowed'
                    : 'glow-button text-deep-space font-bold'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-white rounded-full flex items-center justify-center"
                    >
                      <span className="text-green-600 text-xs">✓</span>
                    </motion.div>
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Column 2 - Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Location Card */}
            <div className="glass-card p-6 relative overflow-hidden">
              {/* Beacon Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-lexis-gold/20 blur-2xl rounded-full" />

              <div className="flex items-start space-x-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-lexis-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-lexis-gold w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 font-space-grotesk">Our Location</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Ramji Rental, Gajera Compound,<br />
                    near Gajera School, Mota Varachha,<br />
                    Surat, Gujarat 394105
                  </p>
                </div>
              </div>

              {/* Simulated Map */}
              <div className="h-48 rounded-xl bg-industrial-steel/50 relative overflow-hidden">
                {/* Grid Pattern */}
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className="border border-white/5" />
                  ))}
                </div>

                {/* Location Beacon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* Ripple Rings */}
                  <motion.div 
                    className="absolute inset-0 w-12 h-12 border border-lexis-gold rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 3], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.div 
                    className="absolute inset-0 w-12 h-12 border border-lexis-gold rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 3], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1, ease: 'easeOut' }}
                  />
                  
                  {/* Core Dot */}
                  <div className="w-4 h-4 bg-lexis-gold rounded-full relative z-10" />
                  
                  {/* Vertical Beam */}
                  <motion.div 
                    className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-t from-lexis-gold to-transparent"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Phone */}
              <motion.a
                href="tel:09601291330"
                className="glass-card p-6 flex flex-col items-center justify-center text-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="text-lexis-gold w-6 h-6 mb-2" />
                <span className="text-sm font-semibold text-white">096012 91330</span>
                <span className="text-xs text-gray-500 mt-1">Call Us</span>
              </motion.a>

              {/* Hours */}
              <motion.div
                className="glass-card p-6 flex flex-col items-center justify-center text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="text-lexis-gold w-6 h-6 mb-2" />
                <span className="text-sm font-semibold text-white">Mon-Sat</span>
                <span className="text-xs text-gray-500 mt-1">9:30 AM - 7:00 PM</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
