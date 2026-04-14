'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  slug: string
  indication: string
  format: string
  price: string
  priceNumber: number
  plants: string[]
  badge?: string
  description: string
}

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
    >
      <div className="p-6">
        {product.badge && (
          <span className="inline-block bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-medium mb-4">
            {product.badge}
          </span>
        )}
        <h3 className="font-heading text-2xl font-bold text-forest-dark mb-2">
          {product.name}
        </h3>
        <p className="text-earth/70 text-sm mb-4">{product.indication}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-forest font-medium">Format:</span>
            <span className="text-earth/80">{product.format}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-forest font-medium">Prix:</span>
            <span className="text-earth/80 font-semibold">{product.price}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.plants.map((plant) => (
              <span
                key={plant}
                className="bg-forest-light text-forest-dark px-2 py-1 rounded text-xs"
              >
                {plant}
              </span>
            ))}
          </div>
        </div>

        <p className="text-earth/60 text-sm mb-6 italic">
          {product.description}
        </p>

        <div className="flex gap-3">
          <a
            href={`https://wa.me/22170000000?text=Je%20souhaite%20commander%20${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-forest hover:bg-forest-dark text-white px-4 py-3 rounded-full font-medium text-center transition-colors"
          >
            Commander
          </a>
          <Link
            href={`/produits#${product.slug}`}
            className="px-4 py-3 border-2 border-forest text-forest hover:bg-forest hover:text-white rounded-full font-medium transition-colors"
          >
            Détails
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
