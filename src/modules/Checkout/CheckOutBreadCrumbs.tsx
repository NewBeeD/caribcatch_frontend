'use client'
import { Box, Typography, useTheme } from '@mui/material'
import Check from '@mui/icons-material/Check'

const steps = ['Cart', 'Information', 'Shipping', 'Payment']

interface CheckoutBreadcrumbsProps {
  currentStep: number
  onStepClick: (step: number) => void
}

export default function CheckoutBreadcrumbs({ 
  currentStep,
  onStepClick 
}: CheckoutBreadcrumbsProps) {
  
  const theme = useTheme()

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      onStepClick(stepIndex)
    }
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      mb: 4,
      position: 'relative',
      width: '100%'
    }}>
      {steps.map((label, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep
        const isClickable = index <= currentStep

        return (
          <Box 
            key={label} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: isClickable ? 'pointer' : 'default'
            }}
            onClick={() => isClickable && handleStepClick(index)}
          >
            <Box sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: isCompleted || isActive ? 'primary.main' : 'action.disabledBackground',
              color: isCompleted || isActive ? 'primary.contrastText' : 'text.secondary',
              transition: 'background-color 0.3s',
              '&:hover': {
                bgcolor: isClickable ? 'primary.dark' : undefined
              }
            }}>
              {isCompleted ? (
                <Check sx={{ fontSize: 16 }} />
              ) : (
                <Typography variant="body2">{index + 1}</Typography>
              )}
            </Box>

            <Typography 
              variant="body2" 
              sx={{ 
                mx: 1,
                color: isCompleted || isActive ? 'text.primary' : 'text.secondary',
                fontWeight: isActive ? 600 : 400,
                '&:hover': {
                  color: isClickable ? 'primary.dark' : undefined
                }
              }}
            >
              {label}
            </Typography>

            {index < steps.length - 1 && (
              <Box sx={{
                width: 50,
                height: 2,
                bgcolor: isCompleted ? 'primary.main' : 'divider',
                mx: 1
              }} />
            )}
          </Box>
        )
      })}
    </Box>
  )
}