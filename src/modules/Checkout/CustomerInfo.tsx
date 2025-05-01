'use client'
import { useCart } from "@/lib/CartContext/CartContext"
import { useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface CustomerInfoProps {
  onNext: () => void
  onBack?: () => void
}

export default function CustomerInfo({ onNext, onBack }: CustomerInfoProps) {
  const { setEmail } = useCart()
  const [email, setEmailValue] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await setEmail(email)
    onNext()
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmailValue(e.target.value)}
        required
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
  )
}