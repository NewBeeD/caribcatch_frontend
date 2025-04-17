import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


import Image from 'next/image'
import Link from 'next/link'


const ProductList = () => {
  
  return (
    
    <Box
    height={{xs: 350}}
    paddingTop={5}
    position='relative'
    marginTop={{ xs: 3}}
    >
      <Box>

        <Image
        alt='Background Image'
        src="/Body/Section4/Image1.png" 
        fill
        />
        
        
      </Box>


      <Box
      position='absolute'
      width={{ xs: 180}}
      height={{ xs: 180}}
      sx={{ backgroundColor: 'rgb(0, 0, 0, 0.5)'}}
      left={{ xs: 10}}
      textAlign='left'
      paddingLeft={{ xs: 1}}
      paddingTop={{ xs: 2}}>

        <Typography
        color='white'
        variant='body2'
        marginBottom={{ xs: 6}}
        >
          Learn about the different products sold from our company.
        </Typography>

        <Link 
        href='#'
        >

          <Box
          color='white' 
          sx={{ textDecoration: 'underline'}}>
            Our Products
          </Box>
        </Link>

        

      </Box>

    </Box>
  );
}

export default ProductList;