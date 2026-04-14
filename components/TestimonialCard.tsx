'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  name: string
  city: string
  country: string
  quote: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="bg-forest-light/50 rounded-xl p-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center">
          <span className="text-white font-heading font-semibold">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-heading font-semibold text-forest-dark">
            {testimonial.name}
          </p>
          <p className="text-earth/60 text-sm">
            {testimonial.city}, {testimonial.country}
          </p>
        </div>
      </div>
      <p className="text-earth/80 italic">"{testimonial.quote}"</p>
    </motion.div>
  )
}
