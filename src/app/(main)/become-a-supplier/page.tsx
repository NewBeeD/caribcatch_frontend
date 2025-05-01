import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { Typography } from '@mui/material';


import Footer from '@/modules/Footer/Footer';


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
      <Box component="main" sx={{ flex: 1 }} marginBottom={4}>

        <Box
        border='2px solid red'
        marginTop={{ xs: 8}}>

          <Typography 
          variant='h4'
          textAlign='center'>
            Become a Supplier
          </Typography>

        </Box>

        <Box>

          <Typography>
            Partner with Us
          </Typography>

          <Typography>
          Are you a local fisherman or farmer with high-quality seafood or produce to offer? Join our growing network of trusted suppliers and let us help you bring your catch or crops to a wider market. At Fish & Fig, we’re passionate about supporting local livelihoods and building strong, fair partnerships.
          </Typography>

        </Box>


        <Box>

          <Typography>Why Supply Us?</Typography>

          <Stack
          marginTop={{xs: 4}} 
          spacing={2}>

            <Box>

              <Typography>Fair prices</Typography>

              <Typography>
              We value your hard work and offer competitive, transparent pricing for your goods. No middlemen, no hidden fees—just honest business.
              </Typography>

            </Box>

            <Box>

              <Typography>Reliable Purchasing</Typography>

              <Typography>
              We buy consistently and in volume. Whether it’s a daily catch or weekly harvest, you can count on us for regular orders and timely payments.
              </Typography>

            </Box>

            <Box>

              <Typography>Community First</Typography>

              <Typography>
              We prioritize working with local, small-scale farmers and fishermen who share our values of sustainability, quality, and community development.
              </Typography>

            </Box>

            <Box>

              <Typography>Expand Your Reach</Typography>

              <Typography>
              By partnering with us, your products will be featured on our platform, reaching homes, restaurants, and businesses across the island and region.
              </Typography>

            </Box>

          </Stack>
          
        </Box>

        <Box marginTop={{ xs: 4}}>

          <Typography>What We Are Looking For</Typography>


          <Box>

            <Typography>Fresh Seafood</Typography>

            <Stack spacing={2}>

              <Typography>Snapper, Tuna, Lobster, and more</Typography>
              <Typography>Properly handled and stored catch</Typography>

            </Stack>
          </Box>

          <Box>

            <Typography>Fresh Produce</Typography>

            <Stack spacing={2}>

              <Typography>Yams, Bananas, Plaintains, Herbs, Greens, and Fruits </Typography>
              <Typography>Harvested with care and free from harmful chemicals</Typography>

            </Stack>
          </Box>


        </Box>


        <Box marginTop={{ xs: 4}}>

          <Typography>How to Get Started</Typography>

          <Typography>
          Fill out the form below or contact us directly. We’ll review your information, arrange a short interview or site visit if needed, and set you up as a registered supplier.
          </Typography>

          <form>

            <Stack
            spacing={0}>

              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ width: {xs: 180}}}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ width: {xs: 180}}}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: {xs: 180}}}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>



        <Box marginTop={4}>

          <Typography>Join Us in Feeding the Caribbean</Typography>

          <Typography>
          Together, we can build a stronger food system that values the land, the sea, and the people behind every product. Let’s grow together!
          </Typography>
        </Box>

        


        
      </Box>

      {/* Sticky footer */}
      <Footer />
    </Box>
  );
}

export default page;