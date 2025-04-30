import Image from "next/image";

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Section1 = () => {
  return (
    
    <Box
    component='section'

      sx={{position: "relative",
        height: {xs: "55vh", sm: '65vh'},
        marginTop: {xs: "50px", sm: '0px'},
        paddingTop: "64px",}}
    >
      {/* Background Image */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Image
          src="/Body/Section1/MainImage2.jpg"
          fill
          style={{ objectFit: "cover" }}
          priority
          alt="Main Body Image"
          quality={90}
        />
      </Box>

      {/* Centered Content with Enhancements */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          color: "white",
          padding: "2rem",
          textAlign: "center",
          background: "radial-gradient(circle, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)",
 // semi-transparent overlay
        }}
      >
        <h1 
        style={{ maxWidth: "600px", fontSize: "1.5rem" }}>
          Serving the highest quality produce to our quality customers.
        </h1>

        <Button 
        variant="contained" 
        sx={{ marginTop: {xs: 8}, width: {xs: 150}, height: {xs: 60}, fontSize: {xs: '20px'}, fontWeight: 900, backgroundColor: '#f68b1f', transform: 'scale(1)',
        transition: 'transform 0.2s ease, background-color 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          bgcolor: 'black'
        }}}>
          SHOP NOW
        </Button>


      </Box>
    </Box>
  );
};

export default Section1;
