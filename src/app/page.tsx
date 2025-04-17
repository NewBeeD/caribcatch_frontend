import Box  from "@mui/material/Box";
import Stack  from "@mui/material/Stack";
import Typography  from "@mui/material/Typography";

import Section1 from "@/modules/HomePage/Body1/Section1";
import OurMission from "@/modules/HomePage/Body1/OurMission";
import OurOperation from "@/modules/HomePage/Body1/OurOperation";
import ProductList from "@/modules/HomePage/Body1/ProductList";
import BecomeaSupplier from "@/modules/HomePage/Body1/BecomeaSupplier";
import OurStory from "@/modules/HomePage/Body1/OurStory";
import Community from "@/modules/HomePage/Body1/Community";

import Footer from "@/modules/Footer/Footer";



export default function Home() {
  
  
  
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
        <Section1 />
        <OurMission />
        <OurOperation />
        <ProductList />
        <BecomeaSupplier />
        <OurStory />
        <Community />
      </Box>

      {/* Sticky footer */}
      <Footer />
    </Box>

  );
}
