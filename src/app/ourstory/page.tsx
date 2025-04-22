import Box from '@mui/material/Box'
import Footer from '@/modules/Footer/Footer';
import { Typography } from '@mui/material';


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

        <Box
        border='2px solid red'
        marginTop={{ xs: 15}}></Box>

        <Box>
          <Typography 
          variant='h4' 
          textAlign='center'
          marginBottom={{ xs: 4}}>
            About Us
          </Typography>

          <Typography
          textAlign='center'
          marginBottom={{ xs: 4}}>
          We are passionate fishmongers rooted in the heart of the Caribbean, committed to bringing the freshest catch from our island waters to your table. With a deep respect for the sea and the communities who depend on it, our business is built on quality, sustainability, and trust.
          </Typography>
          
        </Box>

        <Box>
          <Typography 
          variant='h4' 
          textAlign='center'
          marginBottom={{ xs: 4}}>
            Our Journey
          </Typography>

          <Typography
          textAlign='center'
          marginBottom={{ xs: 4}}>
          Born from generations of fishing tradition, our story began on the shores of a small coastal village where fishing isn’t just a job—it’s a way of life. From humble beginnings, we’ve grown into a trusted name in seafood, connecting local fishers to homes, hotels, and restaurants across the region.
          </Typography>

        </Box>


        <Box>
          <Typography 
          variant='h4' 
          textAlign='center'
          marginBottom={{ xs: 4}}>
            Our Commitment to Sustainability
          </Typography>

          <Typography
          textAlign='center'
          marginBottom={{ xs: 4}}>
          We believe in responsible fishing. That means working closely with local fishers to support traditional techniques, avoid overfishing, and protect our marine ecosystems. Every fish we sell is traceable and caught with care.
          </Typography>

        </Box>


        <Box>
          <Typography 
          variant='h4' 
          textAlign='center'
          marginBottom={{ xs: 4}}>
            How We Work
          </Typography>

          <Typography
          textAlign='center'
          marginBottom={{ xs: 4}}>
          We source directly from the boat, clean and process your order with the highest hygiene standards, and deliver straight to your door or preferred pickup point. Fresh, fast, and fuss-free.
          </Typography>

        </Box>


        <Box>
          <Typography 
          variant='h4' 
          textAlign='center'
          marginBottom={{ xs: 4}}>
            Our Community
          </Typography>

          <Typography
          textAlign='center'
          marginBottom={{ xs: 4}}>
          We proudly support Caribbean fishers and coastal families by creating a reliable market for their catch. A portion of our profits goes back into training and equipment support to improve livelihoods and fishing practices.
          </Typography>

        </Box>


        <Box>
          <Typography 
          variant='h4' 
          textAlign='center'
          marginBottom={{ xs: 4}}>
            Where We Operate
          </Typography>

          <Typography
          textAlign='center'
          marginBottom={{ xs: 4}}>
          Headquartered in Bioche, St. Peters, we serve customers throughout the island and across nearby Caribbean nations. Regional deliveries and export options are available on request.
          </Typography>

        </Box>


        <Box>
          <Typography 
          variant='h4' 
          textAlign='center'
          marginBottom={{ xs: 4}}>
            Let’s Connect
          </Typography>

          <Typography
          textAlign='center'
          marginBottom={{ xs: 4}}>
          Have a special request or want to partner with us? Get in touch—we’re always happy to hear from fellow seafood lovers!
          </Typography>

        </Box>

        
      </Box>

      {/* Sticky footer */}
      <Footer />
    </Box>
  );
}

export default page;