'use client'
import { useCart } from "@/lib/CartContext/CartContext"
import { useState, useEffect } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import { updateShippingMethod } from "@/lib/UpdateShippingOrder/ShippingOrderChange"

import { HttpTypes } from "@medusajs/types"
import sdk  from "@/lib/sdk"



interface CustomerInfoProps {
  onNext: () => void
  onBack?: () => void
}

import { useRegion } from "@/lib/RegionContext/RegionContext" 

const addresses_raw = [
  {
    id: 1,
    address_1: "123 Main Street",
    city: "New York",
    state: "NY",
    zip_code: "10001"
  },
  {
    id: 2,
    address_1: "456 Oak Avenue",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90001"
  },
  {
    id: 3,
    address_1: "789 Pine Road",
    city: "Chicago",
    state: "IL",
    zip_code: "60601"
  },
  {
    id: 4,
    address_1: "321 Elm Drive",
    city: "Houston",
    state: "TX",
    zip_code: "77001"
  },
  {
    id: 5,
    address_1: "654 Maple Lane",
    city: "Philadelphia",
    state: "PA",
    zip_code: "19019"
  }
];




export default function CustomerInfo({ onNext, onBack }: CustomerInfoProps) {

  const { setEmail, cart, updateCart } = useCart()
  const [email, setEmailValue] = useState('')
  const { setShippingAddress } = useCart()
  const { region } = useRegion()
  const [addresses, setAddresses] = useState(addresses_raw);


  const [loading, setLoading] = useState(true)
  const [shippingMethod, setShippingMethod] = useState(
    cart?.shipping_methods?.[0]?.shipping_option_id || ""
  )
  const [shippingOptions, setShippingOptions] = useState<
    HttpTypes.StoreCartShippingOption[]
  >([])


  const [address, setAddress] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    province: '',
    city: '',
    country_code: region?.countries[0]?.iso_2 || '',
    postal_code: '',
    phone: '',
  })



  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault()

    try {

      await setEmail(email)
      await setShippingAddress(address)
      await updateCart({
        shippingMethodData: {
          option_id: shippingMethod,
          data: {
            // TODO add any data necessary for
            // fulfillment provider
          },
        },
      })
      .then(() => {
        setLoading(false)
        onNext()
      })

      // const result = await updateShippingMethod(
      //   {
      //     orderId: "cart_01JSWWH3JX7KBG3PDH718QEXHP",   // string
      //     actionId: "orchac_123", // string
      //     customData: { 
      //       custom_amount: 10    // number (now properly typed)
      //     }
      //   },
      //   'adminToken' // string adminToken
      // );
      

      
    } catch (error) {

      console.error("Update error:", error.message)
    // Handle error (show error message, etc.)
      
    }
    
    
    // onNext()
  }


  const handleSubmit_shipping = async (e: React.FormEvent) => {
    e.preventDefault()
    await setShippingAddress(address)
    onNext()
  }

  const handleChange = (field: keyof typeof address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({ ...prev, [field]: e.target.value }))
  }


  useEffect(() => {
  
    
    if (shippingOptions.length || !cart) {
      return
    }
  
    sdk.store.fulfillment.listCartOptions({
      cart_id: cart.id || "",
    })
    .then(({ shipping_options }) => {
      
      setShippingOptions(shipping_options)
      setShippingMethod(shipping_options[0].id)
      
      setLoading(false)
    })
  }, [cart?.id])





  return (
<Box component="form" onSubmit={handleSubmit}>
      <Box>
        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmailValue(e.target.value)}
          required
          margin="normal"
        />

        {/* Shipping Address Group */}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* Name Fields */}
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

            {/* Address Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="address-select-label">Street Address</InputLabel>
                <Select
                  labelId="address-select-label"
                  id="address-select"
                  value={address.address_1}
                  onChange={handleChange('address_1')}
                  label="Street Address"
                  sx={{ width: { sm: 240 } }}
                >
                  <MenuItem value="" disabled>Select an address</MenuItem>
                  {addresses.map((addr) => (
                    <MenuItem key={addr.id} value={addr.address_1}>
                      {addr.address_1}, {addr.city}, {addr.state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            {/* City/Country/Postal Code */}
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
                  sx={{ width: { sm: 240 } }}
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

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={address.phone}
                onChange={handleChange('phone')}
                required
              />
            </Grid>
          </Grid>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
          {onBack && (
            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
          )}
          <Button type="submit" variant="contained">
            Next: Shipping
          </Button>
        </Box>
      </Box>
    </Box>
  )
}