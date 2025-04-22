import Box  from "@mui/material/Box";
import Stack  from "@mui/material/Stack";
import Typography  from "@mui/material/Typography";



const OurStory = () => {
  
  
  return (
  
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
      {/* Content */}

      <Box
        marginBottom={{ xs: 4}}
        >

          <Typography
          variant="h6"
          sx={{ textAlign: 'Left'}}>
            Our Story
          </Typography>

        </Box>


        <Box>

          <Typography 
          sx={{ fontSize: {xs: '10px', sm: '16px', md: '20px'}, textAlign: 'left'}}
          >
          “Born from a fisherman’s boat and a farmer’s field, we started by hand-delivering Dominica’s freshest harvests and catch to neighbors. Today, we’re your direct link to the island’s vibrant flavors—and the hardworking hands that bring them to life.”
          </Typography>

        </Box>
    </Box>


    {/* Right Half */}
    <Box
      width="50%"
      sx={{
        backgroundImage: "url('/Body/Section5/Image1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "grayscale(100%)"
      }}
    />
  </Box>

  );
}

export default OurStory;