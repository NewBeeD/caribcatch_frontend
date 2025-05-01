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
  FormControl 
} from '@mui/material'


interface ShippingAddressProps {
  onNext: () => void
  onBack: () => void
}


import { useRegion } from "@/lib/RegionContext/RegionContext" // Adjust import path as needed

export default function ShippingAddress({ onNext, onBack }: ShippingAddressProps) {


  const { setShippingAddress } = useCart()
  const { region } = useRegion()
  
  
  const [address, setAddress] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    city: '',
    country_code: region?.countries[0]?.iso_2 || 'us',
    postal_code: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await setShippingAddress(address)
    onNext()
  }

  const handleChange = (field: keyof typeof address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            value={address.first_name}
            onChange={handleChange('first_name')}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={address.last_name}
            onChange={handleChange('last_name')}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street Address"
            value={address.address_1}
            onChange={handleChange('address_1')}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={address.city}
            onChange={handleChange('city')}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              value={address.country_code}
              label="Country"
              onChange={(e) => setAddress(prev => ({
                ...prev,
                country_code: e.target.value
              }))}
              required
            >
              {region?.countries?.map((country) => (
                <MenuItem 
                  key={country.iso_2} 
                  value={country.iso_2}
                >
                  {country.display_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Postal Code"
            value={address.postal_code}
            onChange={handleChange('postal_code')}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Stack 
          spacing={{ xs: 2}}
          justifyContent='space-between' 
          sx={{  mt: 2 }}>

            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" variant="contained">
              Next: Payment
            </Button>

          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}