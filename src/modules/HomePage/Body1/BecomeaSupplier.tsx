
import Stack  from "@mui/material/Stack";
import Typography  from "@mui/material/Typography";
import Button from '@mui/material/Button'
import Link from "next/link";




const BecomeaSupplier = () => {


  
  return (
    
    <Stack
    height={{ xs: 300}}
    marginTop={{ xs: 2}}
    direction='column'
    textAlign='center'
    justifyContent='center'
    alignItems='center'
    sx={{ backgroundColor: '#737373'}}
    >

      <Typography
      paddingBottom={{ xs: 3}}
      variant="h5"
      color="white">
        Experience Caribbean Taste
      </Typography>

      <Stack spacing={1}>

        <Link href='/shop'>
          <Button
          variant="contained"
          sx={{ backgroundColor: '#f68b1f', fontWeight: 900, letterSpacing: 2, transform: 'scale(1)',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            '&:hover': {
              transform: 'scale(1.15)',
              bgcolor: 'black'
            }}}
          >
            Shop Now
          </Button>

        </Link>


        <Typography 
        color="white"
        fontWeight={900}>or</Typography>

        <Link href='/become-a-supplier'>
          <Button
          variant="contained"
          sx={{ backgroundColor: '#f68b1f', fontWeight: 900, letterSpacing: 2, transform: 'scale(1)',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            '&:hover': {
              transform: 'scale(1.15)',
              bgcolor: 'black'
            }}}
          >
            Become a Supplier
          </Button>

        </Link>

      </Stack>
      
    </Stack>
  );
}

export default BecomeaSupplier;