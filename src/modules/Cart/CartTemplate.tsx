"use client" // include with Next.js 13+

import Box from '@mui/material/Box'

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import sdk from "@/lib/sdk"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from 'next/link'

import ItemDisplay from './ItemDisplay'
import { Button } from '@mui/material'


export default function Cart() {
  
  const [cart, setCart] = useState<
    HttpTypes.StoreCart
  >()

  useEffect(() => {
    if (cart) {
      return
    }

    const cartId = localStorage.getItem("cart_id")
    if (!cartId) {
      // TODO create cart
      return
    }

    sdk.store.cart.retrieve(cartId)
    .then(({ cart: dataCart }) => {
      
      setCart(dataCart)
    })
  }, [cart])

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cart?.currency_code,
    })
    .format(amount)
  }

  return (
    <Box 
    marginTop={{ xs: 8}}
    paddingX={{ xs: 2}}>

      <Typography variant='h4'>
        SHOPPING CART
      </Typography>

      <Box 

      marginTop={{ xs: 4}}>
        {!cart && <span>Loading...</span>}
        
        {cart && (
          <>
            {/* <span>Cart ID: {cart.id}</span> */}
            <ul>
              {cart.items?.map((item, idx) => {

                return(

                  <Stack 
                  key={idx}
                  >
                      <ItemDisplay cartProducts={item} />

                  </Stack>

                )

              })}
            </ul>


            <Box
            marginTop={{ xs: 2}}>
              <Typography 
              variant='h6'
              fontWeight={900}
              sx={{ paddingLeft: 1}}>
                SUBTOTAL: {formatPrice(cart.total)}
              </Typography>
            </Box>


          </>
        )}


        <Box 
        textAlign='center'
        display='flex'
        justifyContent='center'
        alignItems='center'
        marginY={{ xs: 4}}
        >
          <Button 
          component={Link}
          href="/checkout"
          variant='contained' 
          sx={{ width: {xs: 170}, height: {xs: 50}, fontSize: {xs: '15px'}, fontWeight: 900, backgroundColor: '#f68b1f'}}>
            Go To Check Out
          </Button>


        </Box>
      </Box>
        

      



  </Box>
  )
}