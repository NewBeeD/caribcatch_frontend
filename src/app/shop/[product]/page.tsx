"use client"

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import ProductImages from '@/modules/Shop/ProductImages'
import QuantitySelector from '@/modules/Shop/QuantitySelector'
import { MedusaImage } from '@/modules/Shop/ProductImages'
import VariantPrices from '@/lib/VariantPrices/VariantPrices'
import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import sdk from '@/lib/sdk'
import { useParams } from 'next/navigation'
import { Button } from '@mui/material'

import { Suspense } from 'react'

import { useCart } from '@/lib/CartContext/CartContext'

import Footer from '@/modules/Footer/Footer'

type Params = {
  params: {
    handle: string
  }
}

interface ProductVariance {
  title: string[]
  price: number
  inventory_quantity?: number
}

interface MedusaProduct extends HttpTypes.StoreProduct {
  variants: (HttpTypes.StoreProductVariant & {
    calculated_price?: {
      calculated_amount: number
    }
    inventory_quantity?: number
  })[]
}

export default function Product({ params: { handle } }: Params) {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<MedusaProduct | undefined>()
  const [prod_variants, setProd_Variants] = useState<ProductVariance[]>([])
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({})
  const [selectedPrice, setSelectedPrice] = useState<number>(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariance | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const { product: prod_handle } = useParams()

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
  }

  const handleOptionChange = (optionId: string, selectedValue: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [optionId]: selectedValue
    }))
  }

  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    
    try {
      await addToCart(selectedVariant.id, quantity)
      alert('Item added to cart successfully!')
    } catch (error) {
      console.error("Add to cart failed:", error)
      alert('Failed to add item to cart. Please try again.')
    }
  }



  useEffect(() => {
    if (!loading) return

    sdk.store.product.list({
      handle,
      fields: `*variants.calculated_price,+variants.inventory_quantity`,
    }).then(({ products }) => {
      if (products.length) {
        
        const single_product = products.filter(item => item.handle === prod_handle)
        

        if (single_product[0]) {
          
          const product_variants = VariantPrices({ product: single_product[0] })
          
          setProd_Variants(product_variants)
          setProduct(single_product[0])
          setSelectedPrice(single_product[0].variants[0]?.calculated_price?.calculated_amount || 0)
        }
      }
      setLoading(false)
    })
  }, [loading, handle, prod_handle])

  useEffect(() => {

    if (prod_variants.length > 0 && product?.options) {
      // Get option titles in product's original order
      const optionTitles = product.options.map(option => option.title)
      
      // Create selected options array in PRODUCT'S option order
      const selectedOptions = optionTitles
        .map(title => selectedValues[title])
        .filter(Boolean)

      // Only search if all options are selected
      if (selectedOptions.length === optionTitles.length) {
        const matchedVariant = prod_variants.find(variant => 
          variant.title.every((value, index) => 
            value.toLowerCase().trim() === selectedOptions[index].toLowerCase().trim()
          )
        )

        if (matchedVariant) {
          setSelectedPrice(matchedVariant.price)
          setSelectedVariant(matchedVariant)
        } else {
          setSelectedPrice(product.variants[0]?.calculated_price?.calculated_amount || 0)
          setSelectedVariant(null)
        }
      }
    }
  }, [selectedValues, prod_variants, product])

  return (
    <Box
      marginTop={{ xs: 8 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
      }}
    >

      <Box component="main" sx={{ flex: 1 }}>

        <Suspense >
                  

          {loading && <span>Loading...</span>}
          {!loading && !product && <span>Product not found</span>}
          {product && (
            <>
              <Typography
              variant='h3'
              sx={{ paddingLeft: {xs: 2}}}>
                {product.title}
              </Typography>

              <Stack
              direction={{ xs: 'column', sm: 'row'}}>

                <Box
                width={{xs: '100%', sm: 600, lg: 750}}>

                  <ProductImages images={product.images as MedusaImage[]} />

                </Box>


                <Box
                width={{xs: '100%', sm: 250, lg: 750}}
                >

                    <Stack
                      marginTop={{ xs: 4 }}
                      justifyContent='center'
                      alignItems='center'
                      textAlign='center'
                      width='100%'
                      paddingY={{ xs: 2 }}
                    >
                      <Box>
                        <Typography sx={{ paddingLeft: { xs: 2 } }}>
                          {selectedVariant ? 
                            `$${selectedPrice.toFixed(2)}` : 
                            product.options?.length > 0 ?
                            'Please select all options' :
                            `Starting at $${product.variants[0].calculated_price?.calculated_amount.toFixed(2)}`
                          }
                        </Typography>
                      </Box>

                      <Box paddingLeft={{ xs: 2 }} marginTop={{ xs: 0.5 }}>
                        <QuantitySelector
                          max={selectedVariant?.inventory_quantity || 
                              product.variants[0]?.inventory_quantity || 
                              10}
                          onQuantityChange={handleQuantityChange}
                        />
                      </Box>
                    </Stack>

                    {product.options?.length > 0 && (
                      <Stack spacing={3} paddingLeft={2}>
                        {product.options.map((option) => (
                          <FormControl key={option.id} sx={{ width: 180 }}>
                            <InputLabel>{option.title}</InputLabel>
                            <Select
                              value={selectedValues[option.title] || ''}
                              label={option.title}
                              onChange={(e) => handleOptionChange(option.title, e.target.value)}
                              MenuProps={{
                                transitionDuration: 0,
                                PaperProps: {
                                  style: {
                                    maxHeight: 200,
                                  },
                                },
                              }}
                            >
                              {option.values?.map((optionValue) => (
                                <MenuItem key={optionValue.id} value={optionValue.value}>
                                  {optionValue.value}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ))}
                      </Stack>
                    )}

                    <Divider sx={{ marginTop: { xs: 4 }}} />

                    <Typography variant="h6" sx={{ mt: 2, paddingLeft: 2, fontWeight: 900 }}>
                      ${(selectedPrice * quantity).toFixed(2)}
                    </Typography>

                    <Box paddingLeft={{ xs: 2 }} paddingTop={{ xs: 2 }}>
                      <Button
                        variant='contained'
                        disabled={!selectedVariant}
                        onClick={handleAddToCart}
                        sx={{ 
                          backgroundColor: '#f68b1f', 
                          fontWeight: 900, 
                          width: '40%', 
                          height: { xs: 50 }, 
                          letterSpacing: { xs: 2 },
                          '&:disabled': {
                            backgroundColor: '#cccccc'
                          }
                        }}
                      >
                        {selectedVariant ? 'Add to cart' : 'Select options'}
                      </Button>
                    </Box>


                </Box>

              </Stack>


              <Box
              paddingLeft={{ xs: 2}}
              paddingY={{ xs: 4}}>

                <Typography>
                  {product.description}
                </Typography>

              </Box>
            </>
          )}

        </Suspense>

      </Box>

      <Footer />
      
    </Box>

         
  )
}