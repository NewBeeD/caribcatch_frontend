import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'



const OurMission = () => {
  
  
  return (
    
    <Box 
    width="100%"
    height={{ xs: 300}}
    display='flex'
    alignItems='center'
    justifyContent='center'
    >

      <Stack 
      direction='column'
      textAlign='center'
      >

        <Box 
        textAlign='center'
        width={{ xs: 400, sm: 550, md: 800, lg: 900}}
        paddingX={{ xs: 2}}
        >
          <Typography
          
          sx={{ lineHeight: {xs: '28px', sm: '30px'}, letterSpacing: { sm: '1px'}, fontSize: {sm: '20px'}}}>
          Our mission is to deliver fresh produce straight from local farms and sustainably sourced seafood directly from coastal waters to your table—combining speed, quality, and support for local farmers and fishers.
          </Typography>
        </Box>

        <Stack>

        </Stack>

      </Stack>
    </Box>
  );
}

export default OurMission;