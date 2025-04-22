import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Image from 'next/image'



const Categories = () => {
  return (
    <Box
    paddingBottom={4}
    >
      <Typography
        variant='h5'
        textAlign='center'
      >
        SHOP BY CATEGORY
      </Typography>

      <Box
        height={{ xs: 300, sm: 400, md: 500 }}
        width='100%'
        margin='auto'
        display="flex"
      >
        {/* Left Half */}
        <Box
          width="50%"
          p={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 200, md: 300 },
              marginBottom: { xs: 4 }
            }}
          >
            <Image
              src='/Body/Category/Image1.png'
              alt='Tuna Cuts'
              fill
              quality={70}
              style={{
                objectFit: 'cover',
                borderRadius: '4px' // optional for styling
              }}
            />
          </Box>

          <Box textAlign='center'>
            <Button
              variant="contained"
              sx={{ textAlign: 'Left', backgroundColor: '#f68b1f', fontWeight: 900, letterSpacing: 4, transform: 'scale(1)',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.15)',
                  bgcolor: 'black'
                } }}
            >
              Seafood
            </Button>
          </Box>
        </Box>

        {/* Right Half */}
        <Box
          width="50%"
          p={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 200, md: 300 },
              marginBottom: { xs: 4 }
            }}
          >
            <Image
              src='/Body/Category/Image2.png'
              alt='Tuna Cuts'
              fill
              quality={70}
              style={{
                objectFit: 'cover',
                borderRadius: '4px' // optional for styling
              }}
            />
          </Box>

          <Box textAlign='center'>
            <Button
              variant="contained"
              sx={{ textAlign: 'Left', backgroundColor: '#f68b1f', fontWeight: 900, letterSpacing: 4, transform: 'scale(1)',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.15)',
                  bgcolor: 'black'
                } }}
            >
              Farm
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Categories;