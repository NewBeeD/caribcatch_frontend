import { 
  Box, 
  IconButton, 
  TextField, 
  styled 
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useState } from 'react';

const StyledQuantityBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  width: 'fit-content',
}));

const QuantitySelector = ({ 
  max = 10,
  onQuantityChange 
}: {
  max?: number;
  onQuantityChange: (quantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    const newValue = Math.min(quantity + 1, max);
    setQuantity(newValue);
    onQuantityChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(quantity - 1, 1);
    setQuantity(newValue);
    onQuantityChange(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(max, Number(event.target.value)));
    setQuantity(value);
    onQuantityChange(value);
  };

  return (
    <StyledQuantityBox>
      <IconButton 
        aria-label="Decrease quantity"
        onClick={handleDecrement}
        size="small"
        disabled={quantity <= 1}
        sx={{ 
          borderRadius: '4px 0 0 4px',
          '&:hover': { backgroundColor: 'action.hover' }
        }}
      >
        <Remove fontSize="small" />
      </IconButton>
      
      <TextField
        value={quantity}
        onChange={handleInputChange}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            border: 'none',
            borderRadius: 0,
            width: {xs: '100px'},
            '& input': {
              textAlign: 'center',
              padding: '8px'
            }
          },
        }}
        inputProps={{
          min: 1,
          max: max,
          style: { padding: '8px' }
        }}
      />
      
      <IconButton 
        aria-label="Increase quantity"
        onClick={handleIncrement}
        size="small"
        disabled={quantity >= max}
        sx={{ 
          borderRadius: '0 4px 4px 0',
          '&:hover': { backgroundColor: 'action.hover' }
        }}
      >
        <Add fontSize="small" />
      </IconButton>
    </StyledQuantityBox>
  );
};

export default QuantitySelector;