"use client" // include with Next.js 13+

import Box from '@mui/material/Box'

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import sdk from "@/lib/sdk"
import { Typography } from '@mui/material'

import ItemDisplay from './ItemDisplay'


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
    paddingLeft={{ xs: 2}}>

      <Typography variant='h4'>
        SHOPPING CART
      </Typography>

      <Box 
      paddingLeft={{ xs: 2}}
      marginTop={{ xs: 4}}>
        {!cart && <span>Loading...</span>}
        
        {cart && (
          <>
            {/* <span>Cart ID: {cart.id}</span> */}
            <ul>
              {cart.items?.map((item, idx) => {

                return(


                  <Box key={idx}>


                    <ItemDisplay cartProducts={item} />


                    {/* <li key={item.id}>
                      {item.title} -
                      Quantity: {item.quantity} -
                      Price: {formatPrice(item.unit_price)}
                    </li> */}

                  </Box>



                )


              })}
            </ul>
            <span>Cart Total: {formatPrice(cart.total)}</span>
          </>
        )}
      </Box>
        

      



  </Box>
  )
}