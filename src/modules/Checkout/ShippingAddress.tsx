'use client'
import { useCart } from "@/lib/CartContext/CartContext"
import sdk  from "@/lib/sdk"
import Box from '@mui/material/Box'
import { useState, useEffect } from "react"
import { 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Select, 
  Stack,
  InputLabel, 
  FormControl, 
  Paper,
  Divider,
  Typography
} from '@mui/material'

import DeliveryNotice from "./DeliveryNotice"
import { HttpTypes } from "@medusajs/types"


interface ShippingAddressProps {
  onNext: () => void
  onBack: () => void
}


import { useRegion } from "@/lib/RegionContext/RegionContext" // Adjust import path as needed

export default function ShippingAddress({ onNext, onBack }: ShippingAddressProps) {


  const { cart, updateCart } = useCart()
  const { region } = useRegion()


  console.log(cart);
  

  // const [loading, setLoading] = useState(true)
  // const [shippingMethod, setShippingMethod] = useState(
  //   cart?.shipping_methods?.[0]?.shipping_option_id || ""
  // )
  // const [shippingOptions, setShippingOptions] = useState<
  //   HttpTypes.StoreCartShippingOption[]
  // >([])

  // const [calculatedPrices, setCalculatedPrices] = useState<
  //   Record<string, number>
  // >({})




  // useEffect(() => {
  
    
  //   if (shippingOptions.length || !cart) {
  //     return
  //   }

    
  
  //   sdk.store.fulfillment.listCartOptions({
  //     cart_id: cart.id || "",
  //   })
  //   .then(({ shipping_options }) => {
      
  //     setShippingOptions(shipping_options)
  //     setShippingMethod(shipping_options[0].id)
      
  //     setLoading(false)
  //   })
  // }, [cart?.id])


  
  
  // TODO set calculated prices



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    

    onNext()
  }

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cart?.currency_code,
    })
    .format(amount)
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //   if (!cart) return;
  
  //   try {
  //     // Validate required fields
  //     if (!shippingMethod) {
  //       throw new Error("Please select a shipping method");
  //     }
  
  //     // Update cart with shipping method
  //     await updateCart({
  //       shippingMethodData: {
  //         option_id: shippingMethod,
  //         data: {} // Add any required provider data
  //       }
  //     });
  
  //     // Verify update
  //     if (!cart.shipping_methods?.some(sm => sm.shipping_option_id === shippingMethod)) {
  //       throw new Error("Shipping method update failed");
  //     }
  
  //     onNext();
  //   } catch (error) {
  //     console.error("Checkout error:", error);
  //     alert(error instanceof Error ? error.message : "Failed to update shipping method");
  //   }
  // };
  
  
  
  

  // const handleChange = (field: keyof typeof address) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAddress(prev => ({ ...prev, [field]: e.target.value }))
  // }


  return (

    <Box 
    component="form" onSubmit={handleSubmit}
    sx={{ width: '100%' }}
    >

      <Paper
      sx={{ padding: 1}}>

        <Stack
        direction={{ sm: 'row'}}
        justifyContent='space-between'
        sx={{padding: 1}}>

          <Stack
          direction={{ sm: 'row'}}
          spacing={4}>

            <Typography sx={{ fontSize: {sm: '13px'}}}>
              Contact
            </Typography>

            <Typography sx={{ fontSize: {sm: '13px'}}}>
              {cart.email}
            </Typography>

          </Stack>

          <Box>

            <Typography 
            sx={{ fontSize: {sm: '13px'}}}>
              contact
            </Typography>
            
          </Box>

        </Stack>

        <Divider />

        <Stack
        direction={{ sm: 'row'}}
        justifyContent='space-between'
        sx={{padding: 1}}>

          <Stack
          direction={{ sm: 'row'}}
          spacing={4}>

            <Typography sx={{ fontSize: {sm: '13px'}}}>
              Ship to
            </Typography>

            <Typography sx={{ fontSize: {sm: '13px'}}}>
              {cart?.shipping_address?.address_1}, {cart?.shipping_address?.city}
            </Typography>

          </Stack>

          <Box>

            <Typography 
            sx={{ fontSize: {sm: '13px'}}}>
              contact
            </Typography>
            
          </Box>

        </Stack>

      </Paper>

      <Box marginTop={{ sm: 8}}>
        <Typography>Shipping Method</Typography>
      </Box>

      <Paper sx={{ marginTop: {sm: 5}, padding: 2}}>

        <Stack 
        direction='row'
        justifyContent='space-between'>

          <Typography>Shipping cost</Typography>
          {/* <Typography fontWeight={900}>{shippingOptions[0].amount? shippingOptions.amount: 0}</Typography> */}
          <Typography fontWeight={900}>{formatPrice(cart?.shipping_total)}</Typography>

        </Stack>

        <Box
        paddingTop={{ sm: 2}}>

          <DeliveryNotice />
          
        </Box>


      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>

        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Next: Payment
        </Button>

      </Box>


    </Box>
  )
}