"use client" // include with Next.js 13+

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import ProductImages from '@/modules/Shop/ProductImages'
import QuantitySelector from '@/modules/Shop/QuantitySelector'
import { MedusaImage } from '@/modules/Shop/ProductImages'

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import sdk from '@/lib/sdk'

type Params = {
  params: {
    handle: string
  }
}

export default function Product({ params: { handle } }: Params) {
  
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<
    HttpTypes.StoreProduct | undefined
  >()
  const handleQuantityChange = (quantity: number) => {
    // console.log('Quantity changed:', quantity);
    // Add your cart logic here
  };

  useEffect(() => {
    if (!loading) {
      return 
    }

    sdk.store.product.list({
      handle,
      fields: `*variants.calculated_price,+variants.inventory_quantity`,
    })
    .then(({ products }) => {
      if (products.length) {
        setProduct(products[0])
      }
      setLoading(false)
    })
  }, [loading])

  return (
    
    <Box
    marginTop={{xs: 8}}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden', // Prevents horizontal scroll
    }}>

      {loading && <span>Loading...</span>}
      {!loading && !product && <span>Product not found</span>}
      {product && (
        <>
          <h1>{product.title}</h1>

          <ProductImages images={product.images as MedusaImage[]} />

          {/* {product.images?.map((image) => (
            <img src={image.url} key={image.id} />
          ))} */}

          <Box 
          border='2px solid red'
          marginTop={{ xs: 4}}
          >

            <Box>

              <Typography
              sx={{ paddingLeft: {xs: 2}}}>
              Starting at ${product.variants[0].calculated_price?.calculated_amount} per pound
              </Typography>

            </Box>


            <Box
            paddingLeft={{ xs: 2}}
            marginTop={{ xs: 0.5}}>

              <QuantitySelector 
                max={product.variants[0].inventory_quantity||10} 
                onQuantityChange={handleQuantityChange}
              />


            </Box>




          </Box>

          {(product.options?.length || 0) > 0 && (
            <ul>
              {product.options!.map((option) => (
                <li key={option.id}>
                  {option.title}
                  <ul>
                    {option.values?.map((optionValue) => (
                      <li id={optionValue.id}>{optionValue.value}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          
        </>
      )}
    </Box>
  )
}