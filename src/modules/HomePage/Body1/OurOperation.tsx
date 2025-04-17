'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const OurOperation = () => {
  const slides = [
    {
      title: "Suppliers",
      image: "/Body/Section3/Image1.png",
      description: "Trusted local farmers & fishermen committed to sustainability. Fresh, ethically sourced seafood and produce, always top-quality."
    },
    {
      title: "Handling",
      image: "/Body/Section3/Image2.png",
      description: "Inspected, cleaned, and stored in temperature-controlled environments—preserving freshness and safety from harvest to delivery."
    },
    {
      title: "Packaging",
      image: "/Body/Section3/Image3.png",
      description: "Eco-friendly, insulated packaging with ice packs or vacuum-sealing. Delivered fast—farm-to-fork or ocean-to-table, never frozen!"
    }
  ]


  const sliderRef = useRef<Slider>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    appendDots: (dots: React.ReactNode) => (
      <Box
        component="ul"
        sx={{ 
          position: 'absolute',
          bottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {dots}
      </Box>
    ),
    customPaging: (i: number) => (
      <Box
        sx={{
          width: 8,
          height: 8,
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
    <Box sx={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative', height: 400 }}>
            <Box
              component="img"
              src={slide.image}
              alt={slide.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Centered Box */}

            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 2,
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography 
              color="white"
              marginBottom={10}
              fontWeight={700}
              sx={{ fontSize: {xs: '35px'}}}>

                {slide.title}
              </Typography>

              <Typography variant="h5" color="white"
              sx={{ fontSize: {xs: '20px'}}}>

                {slide.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>

      {/* Thumbnail Gallery */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            sx={{
              width: 80,
              height: 60,
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
              src={slide.image}
              alt={slide.title}
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

export default OurOperation