// components/SlickCarousel.tsx
'use client'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@mui/material'
import { Settings } from 'react-slick'

import Image from 'next/image';

export type MedusaImage = {
  id: string
  url: string
  alt?: string
  metadata?: Record<string, unknown> | null
  rank?: number
  product_id?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}


type SlickCarouselProps = {
  images: MedusaImage[]
  settings?: Settings
}

const defaultSettings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

const ProductImages = ({ images, settings = defaultSettings }: SlickCarouselProps) => {

  console.log(images)

  return (
    <Box 
    sx={{ px: 2 }}
    >
      
      <Slider {...settings}>
        
        {images.map((image) => (
          <Box 
          key={image.id || image.url}
          width='100%'
          height={{ xs: 300}} 
          sx={{ px: 1, position: 'relative', }}>
            
            
            <Image
              src={image.url}
              alt={image.alt || 'Product image'}
              fill
              quality={80}
              style={{
                width: '100%',
                objectFit: 'cover',
                borderRadius: '8px'
              }}

            />
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default ProductImages