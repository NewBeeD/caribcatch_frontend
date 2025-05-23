

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Suspense } from 'react'
import CheckoutPage from '@/modules/Checkout/CheckoutPage'




import Footer from '@/modules/Footer/Footer'



const page = () => {
  
  
  
  return (
    
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden', // Prevents horizontal scroll
      }}
    >
      {/* Main content container */}
      <Box component="main" sx={{ flex: 1 }}>


        <Suspense >

          <CheckoutPage />
          
        </Suspense>

        
      </Box>

      {/* Sticky footer */}
      <Footer />
    </Box>
  );
}

export default page;