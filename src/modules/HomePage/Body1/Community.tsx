import Box  from "@mui/material/Box";
import Stack  from "@mui/material/Stack";
import Typography  from "@mui/material/Typography";



const Community = () => {
  
  
  return (
    
<Box
  height={{ xs: 300, sm: 400 }}
  width='100%'
  margin='auto'
  display="flex"
  flexDirection='row-reverse'
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
            Community
          </Typography>

        </Box>


        <Box>

          <Typography 
          sx={{ fontSize: {xs: '10px', sm: '16px', md: '20px'}, textAlign: 'left'}}
          >
          We’re more than a marketplace—we’re a movement. Every order supports Dominican farmers and fishers, preserves traditional agriculture, and helps build sustainable food systems for future generations. Together, we’re growing stronger communities, one harvest at a time.
          </Typography>

        </Box>
  </Box>

  {/* Right Half */}
  <Box
      minHeight='100%'
      minWidth='50%'
      sx={{ backgroundImage: "url('/Body/Section5/Image2.png')", backgroundSize: "cover",
        backgroundPosition: "center", filter: "grayscale(100%)",}} />
</Box>
  );
}

export default Community;