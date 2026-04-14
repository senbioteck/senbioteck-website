'use client'

import { motion } from 'framer-motion'

interface Plant {
  name: string
  latinName: string
  benefit: string
  country: string
  image?: string
}

interface PlantCardProps {
  plant: Plant
  index?: number
}

export default function PlantCard({ plant, index = 0 }: PlantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-5 shadow-md card-hover text-center"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-forest-light flex items-center justify-center">
        <span className="text-3xl">🌿</span>
      </div>
      <h4 className="font-heading font-semibold text-lg text-forest-dark">
        {plant.name}
      </h4>
      <p className="text-forest/70 text-sm italic mb-2">{plant.latinName}</p>
      <p className="text-earth/80 text-sm mb-2">{plant.benefit}</p>
      <p className="text-gold text-xs font-medium">{plant.country}</p>
    </motion.div>
  )
}
