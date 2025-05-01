'use client'
import { useCart } from "@/lib/CartContext/CartContext"
import Box from '@mui/material/Box'
import { useState } from "react"
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


interface ShippingAddressProps {
  onNext: () => void
  onBack: () => void
}


import { useRegion } from "@/lib/RegionContext/RegionContext" // Adjust import path as needed

export default function ShippingAddress({ onNext, onBack }: ShippingAddressProps) {


  const { cart } = useCart()
  const { region } = useRegion()

  console.log(cart);
  
  
  
  

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   await setShippingAddress(address)
  //   onNext()
  // }

  const handleChange = (field: keyof typeof address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (

    <Box 
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
              {cart?.shipping_address?.address_1}
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


    </Box>
  )
}