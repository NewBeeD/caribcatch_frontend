// components/SlickCarousel.tsx
'use client'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@mui/material'
import { Settings } from 'react-slick'

import { useState, useRef } from 'react';

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
}



const ProductImages = ({ images }: SlickCarouselProps) => {
  

  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //     }
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ],
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <Box
        sx={{
          width: { xs: 6, sm: 8 },
          height: { xs: 6, sm: 8 },
          backgroundColor: currentSlide === i ? 'primary.main' : 'grey.500',
          borderRadius: '50%',
          transition: 'background-color 0.3s',
          margin: '0 4px',
          cursor: 'pointer',
        }}
      />
    ),
  }

  return (
    <Box 
    sx={{ 
      px: 2,
      width: '100%', // Ensure full width container
      maxWidth: { sm: 800, md: 1200 }, // Adjust as needed
      margin: '0 auto' // Center the container
    }}
    >
      
      <Slider ref={sliderRef} {...settings}>
        
        {images.map((image) => (
          <Box 
          key={image.id || image.url}
          sx={{ 
            position: 'relative',
            width: '100% !important', // Force full width
            height: { xs: 300, sm: 500 },
            px: 1,
          }}
          >
            
            
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
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </Box>
        ))}
      </Slider>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: { xs: 1, sm: 2 }, 
        mt: { xs: 1, sm: 2 },
        px: { xs: 2, sm: 0 }
      }}>
        {images.map((slide, index) => (
          <Box
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            sx={{
              width: { xs: 60, sm: 80, md: 100 },
              height: { xs: 45, sm: 60, md: 75 },
              border: currentSlide === index ? 2 : 1,
              borderColor: currentSlide === index ? 'primary.main' : 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              cursor: 'pointer',
              opacity: currentSlide === index ? 1 : 0.7,
              transition: 'all 0.3s',
            }}
          >
            <Box
              component="img"
              src={slide.url}
              alt='Image of current fish'
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ProductImages