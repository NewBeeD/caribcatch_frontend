import Box  from "@mui/material/Box";
import Stack  from "@mui/material/Stack";
import Typography  from "@mui/material/Typography";



const OurStory = () => {
  
  
  return (
    
    <Stack
    height={{ xs: 300, sm: 600}}
    width={{ sm: 900}}
    direction='row'
    textAlign='center'
    justifyContent='center'
    alignItems='center'
    margin='auto'>

      <Stack
      minHeight='100%'
      minWidth='50%'
      direction='column'
      paddingTop={{ xs: 6}}
      paddingLeft={{ xs: 2}}
      >

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
          sx={{ fontSize: '10px', textAlign: 'left'}}
          >
          “Born from a fisherman’s boat and a farmer’s field, we started by hand-delivering Dominica’s freshest harvests and catch to neighbors. Today, we’re your direct link to the island’s vibrant flavors—and the hardworking hands that bring them to life.”
          </Typography>

        </Box>

      </Stack>

      <Box
      minHeight='100%'
      minWidth='50%'
      sx={{ backgroundImage: "url('/Body/Section5/Image1.png')", backgroundSize: "cover",
        backgroundPosition: "center", filter: "grayscale(100%)",}} />


    </Stack>
  );
}

export default OurStory;