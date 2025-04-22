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
          bottom: { xs: 16, sm: 24 },
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
    <Box sx={{ 
      width: '100%',
      maxWidth: { 
        xs: '100%',   // 0-599px
        sm: 600,      // 600-899px
        md: 900,      // 900-1199px
        lg: 1200,     // 1200-1535px
        xl: 1440      // 1536px+
      },
      margin: '0 auto',
      position: 'relative',
      px: { xs: 2, sm: 3 } // Match layout padding
    }}>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ 
            position: 'relative', 
            height: { xs: 300, sm: 400, md: 500 } 
          }}>
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

            {/* Centered Content */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { 
                  xs: '90%', 
                  sm: '80%', 
                  md: '70%' 
                },
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: { xs: 1.5, sm: 3 },
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 1, sm: 2 }
              }}
            >
              <Typography 
                variant="h3"
                color="white"
                fontWeight={700}
                sx={{ 
                  fontSize: { 
                    xs: '1.75rem',  // 35px
                    sm: '2rem',     // 40px
                    md: '2.5rem'    // 50px
                  },
                  mb: { xs: 4, sm: 6 }
                }}
              >
                {slide.title}
              </Typography>

              <Typography 
                color="white"
                sx={{ 
                  fontSize: { 
                    xs: '1rem',     // 16px
                    sm: '1.125rem', // 18px
                    md: '1.25rem'   // 20px
                  },
                  lineHeight: { xs: 1.4, sm: 1.6 }
                }}
              >
                {slide.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>

      {/* Thumbnail Gallery */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: { xs: 1, sm: 2 }, 
        mt: { xs: 1, sm: 2 },
        px: { xs: 2, sm: 0 }
      }}>
        {slides.map((slide, index) => (
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