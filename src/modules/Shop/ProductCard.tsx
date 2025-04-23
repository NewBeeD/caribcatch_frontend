import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';


import Image from 'next/image';

import { HttpTypes } from '@medusajs/types';
import Link from 'next/link';


interface ProductCardProps {
  product: HttpTypes.StoreProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  
  return (

    <Box>

      <Link href={`/shop/${product.handle}`}>

        <Box
        width='100%'
        height={{ xs: 300}}
        sx={{ position: 'relative',}}
        >

          <Image 
          src={product.images[0].url}
          alt={product.title}
          fill
          
          quality={80}
          style={{
            objectFit: 'cover',
            borderRadius: '4px' // optional for styling
          }}
          loading='lazy'
          />

        </Box>

        <Box>

          <Typography>
            {product.title}
          </Typography>

        </Box>

        <Box>

        <Typography variant="body2" >
        ${product.variants[0].calculated_price?.calculated_amount}
      </Typography>

        </Box>
      
      </Link>


    </Box>

  );
}

export default ProductCard;