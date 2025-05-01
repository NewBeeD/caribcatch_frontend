'use client'
import { useCart } from "@/lib/CartContext/CartContext"
import {  useRegion } from "@/lib/RegionContext/RegionContext"

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import CheckoutBreadcrumbs from "./CheckOutBreadCrumbs"
import CustomerInfo from "./CustomerInfo"
import ShippingAddress from "./ShippingAddress"
import PaymentDetails from "./PaymentDetails"
import OrderSummary from "./OrderSummary"

import { useState } from "react"

export default function CheckoutPage() {
  
  const [currentStep, setCurrentStep] = useState(1)
  const [orderId, setOrderId] = useState<string | null>(null)


  const handleCompleteOrder = () => {
    setCurrentStep(3)
    // Add any final completion logic here
  }

  const handleStepChange = (newStep: number) => {
    // Add validation if needed
    setCurrentStep(newStep)
  }

  if (orderId) {
    return (

      <Box 
      className="confirmation"
      
      >
        <Typography variant="h4">Order Confirmed!</Typography>
        <Typography>Order ID: {orderId}</Typography>
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, marginTop: {xs: 8} }}>



      <CheckoutBreadcrumbs 
      currentStep={currentStep} 
      onStepClick={handleStepChange}  
      />


      <Stack 
      direction={{ xs: 'column', sm: 'row-reverse'}}
      sx={{ width: '100%' }}>


        <Box
        sx={{ 
          flex: 1,
          width: '100%',
          p: 2,
          boxSizing: 'border-box'
        }}>

          <OrderSummary />

        </Box>



        <Box
        sx={{ 
          flex: 1,
          width: '100%',
          p: 2,
          boxSizing: 'border-box'
        }}>

          {currentStep === 1 && (
          <CustomerInfo 
            onNext={() => setCurrentStep(2)} 
            onBack={() => setCurrentStep(1)}
          />
          )}
          {currentStep === 2 && (
            <ShippingAddress 
              onNext={() => setCurrentStep(3)} 
              onBack={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 3 && (
            <PaymentDetails 
              onBack={() => setCurrentStep(2)}
              onSubmit={handleCompleteOrder}
            />
          )}

        </Box>

      </Stack>

          {/* {currentStep === 1 && <CustomerInfo onNext={() => setCurrentStep(2)} />}
          {currentStep === 2 && <ShippingAddress onNext={() => setCurrentStep(3)} />}
          {currentStep === 3 && <PaymentDetails onSubmit={handleCompleteOrder} />} */}



    </Container>
  )
}