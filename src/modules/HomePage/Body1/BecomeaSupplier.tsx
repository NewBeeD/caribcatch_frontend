
import Stack  from "@mui/material/Stack";
import Typography  from "@mui/material/Typography";
import Link from "next/link";



const BecomeaSupplier = () => {
  
  return (
    
    <Stack
    height={{ xs: 300}}
    direction='column'
    textAlign='center'
    justifyContent='center'
    alignItems='center'
    >

      <Typography
      paddingTop={{ xs: 4}}
      paddingBottom={{ xs: 8}}
      variant="h5">
        Experience Caribbean Taste
      </Typography>

      <Stack spacing={1}>

        <Link href='#'>
          <Typography sx={{ textDecoration: 'underline', width: {xs: 220}, backgroundColor: 'rgb(0,0,0,0.5)'}}>Shop Now</Typography>
        </Link>

        <Typography>or</Typography>

        <Link href='#'>
          <Typography sx={{ textDecoration: 'underline', width: {xs: 220}, backgroundColor: 'rgb(0,0,0,0.5)'}}>Become a Supplier</Typography>
        </Link>
      </Stack>
      
    </Stack>
  );
}

export default BecomeaSupplier;