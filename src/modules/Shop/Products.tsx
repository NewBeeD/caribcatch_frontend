'use client'

import { useEffect, useState } from "react";
import { HttpTypes } from "@medusajs/types"
import sdk from '@/lib/sdk'


import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ProductCard from "./ProductCard";
import { Typography } from "@mui/material";


export default function Products() {

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<
    HttpTypes.StoreProduct[]
  >([])



  useEffect(() => {
    if (!loading) {
      return 
    }

    sdk.store.product.list({
      fields: `*variants.calculated_price`,
    })
    .then(({ products: dataProducts }) => {

      setProducts(dataProducts)
      setLoading(false)
    })
  }, [loading])


  if (loading) {
    return <div><Skeleton sx={{ minHeight: '100vh',
      width: '100%'}}/></div>;
  }


  return (

    <Box 
    mt={{xs: 6, sm: 10}} 
    px={3}>
      
      <Typography variant="h4" gutterBottom>
        Our Products
      </Typography>

      <Box
        component="div"
        sx={{
          display: "grid",
          gap: 2,    // spacing between items
          // at each breakpoint, 2 columns of equal width:
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
          },
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
    
    
    // <Box
    // border='2px solid green'
    // marginTop={6}>

    //     <Typography>
          
    //     </Typography>


    //   <div className="product-grid">
    //     {products.map((product) => (

    //       <Stack 
    //       key={product.id} 
    //       direction={{ xs: 'row', sm: 'column'}} 
    //       spacing={4}>

    //         <ProductCard product={product} />

    //       </Stack>

    //     ))}
    //   </div>
    // </Box>
  );
}