'use client'
import { useState, useEffect } from 'react'
import { Button, Box, Typography } from '@mui/material'
import { useCart } from "@/lib/CartContext/CartContext"
// import { loadStripe } from '@stripe/stripe-js'
import sdk from "@/lib/sdk"


interface PaymentDetailsProps {
  onSubmit: () => void
  onBack: () => void
  loading?: boolean
}

export default function PaymentDetails({ 
  onSubmit,
  onBack,
  loading 
}: PaymentDetailsProps) {


  const { cart, completeCheckout } = useCart()
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [stripe, setStripe] = useState<any>(null)
  const [cardElement, setCardElement] = useState<any>(null)
  

  // useEffect(() => {
  //   const initializeStripe = async () => {
  //     const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)
  //     const elements = stripeInstance.elements()
  //     const card = elements.create('card')
  //     card.mount('#card-element')
  //     setStripe(stripeInstance)
  //     setCardElement(card)
  //   }

  //   if (process.env.NEXT_PUBLIC_STRIPE_KEY) {
  //     initializeStripe()
  //   }
  // }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentError(null)

    if (!stripe || !cardElement || !cart) {
      setPaymentError("Payment system not initialized")
      return
    }

    // try {
    //   // Create payment session
    //   const { cart: updatedCart } = await sdk.store.cart.createPaymentSessions(cart.id)
      
    //   // Select payment method
    //   await sdk.store.cart.setPaymentSession(cart.id, {
    //     provider_id: "stripe"
    //   })

    //   // Confirm payment with Stripe
    //   const { error } = await stripe.confirmCardPayment(
    //     updatedCart.payment_session.data.client_secret,
    //     {
    //       payment_method: {
    //         card: cardElement
    //       }
    //     }
    //   )

    //   if (error) {
    //     throw error
    //   }

    //   // Complete checkout
    //   onSubmit()
    // } catch (err: any) {
    //   setPaymentError(err.message || "Payment failed")
    // }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Payment Details</Typography>
      
      <Box id="card-element" sx={{ mb: 3, p: 2, border: 1, borderRadius: 1 }} />
      
      {paymentError && (
        <Typography color="error" sx={{ mb: 2 }}>
          {paymentError}
        </Typography>
      )}

      <Button 
        type="submit" 
        variant="contained" 
        disabled={loading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? 'Processing Payment...' : 'Complete Order'}
      </Button>
    </Box>
  )
}