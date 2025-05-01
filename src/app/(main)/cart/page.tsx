"use client" // include with Next.js 13+


import Box from '@mui/material/Box'

import { Suspense } from 'react'

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import sdk from "@/lib/sdk"


import Footer from "@/modules/Footer/Footer"
import CartTemplate from '@/modules/Cart/CartTemplate'

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

      console.log(dataCart);
      
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
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden', // Prevents horizontal scroll
    }}
  >
    {/* Main content container */}
    <Box component="main" sx={{ flex: 1 }}>


      <Suspense >

        <Box>
          <CartTemplate />
        </Box>
        
      </Suspense>

      
    </Box>

    {/* Sticky footer */}
    <Footer />
  </Box>
  )
}