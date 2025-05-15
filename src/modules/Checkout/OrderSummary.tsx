'use client'

import { useCart } from "@/lib/CartContext/CartContext"

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import OrderSummaryImages from "./OrderSummaryImages";

export default function OrderSummary() {
  const { cart } = useCart()


  console.log(cart);
  
  
  

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cart?.currency_code,
    })
    .format(amount)
  }
  
  
  if (!cart) return null

  return (
    <Paper 
    sx={{ p: 3, backgroundColor: '#f0f0f0' }}
    >


      <Stack
      direction={{ xs: 'column'}} 

      >

        <Box>

          {cart.items?.map((item, idx) => {

          return(

            <Stack 
            key={idx}
            >
              <OrderSummaryImages cartProducts={item} />

            </Stack>

          )

          })}
        </Box>

        <Box marginY={{ xs: 3}} />
        <Divider />

        <Stack
        direction={{ sm: 'row'}}
        justifyContent='space-between'
        padding={1.5}>

          <Box>
            <Typography variant="body2">Subtotal</Typography>
          </Box>


          <Box>
            <Typography variant="body2">
              {formatPrice(cart.original_item_subtotal)}
            </Typography>
          </Box>

        
        </Stack>

        <Stack
        direction={{ sm: 'row'}}
        justifyContent='space-between'
        padding={1.5}>

          <Box>
            <Typography variant="body2">Shipping</Typography>
          </Box>


          <Box>
            <Typography variant="body2">
              {formatPrice(cart.shipping_total)}
            </Typography>
          </Box>

        
        </Stack>

        <Stack
        direction={{ sm: 'row'}}
        justifyContent='space-between'
        alignItems='center'
        padding={1.5}>

          <Box>
            <Typography
            fontWeight={900}
            variant="h6">
              Total
            </Typography>
          </Box>


          <Box>
            <Typography 
            fontWeight={900}
            variant="h6">
              {formatPrice(cart.total)}
            </Typography>
          </Box>

        
        </Stack>


      </Stack>


    </Paper>
  )
}