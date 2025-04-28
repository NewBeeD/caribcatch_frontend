import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const ItemDisplay = ({ cartProducts }) => {
  return (
    <div>
      <Typography variant="h6">{cartProducts.title}</Typography>

      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        {/* Image Box - Takes 50% width */}
        <Box sx={{
          position: 'relative',
          flex: 1,
          height: { xs: 200, md: 300 },
          maxWidth: '50%',
          boxSizing: 'border-box'
        }}>
          <Image
            src={cartProducts.thumbnail}
            alt={cartProducts.title}
            fill
            quality={70}
            style={{
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        </Box>

        {/* Content Box - Takes 50% width */}
        <Box sx={{
          flex: 1,
          maxWidth: '50%',
          boxSizing: 'border-box',
          bgcolor: 'background.paper', // Optional: visual indicator
          p: 2 // Add padding
        }}>
          {/* Add your content here */}
          <Typography>Price: ${cartProducts.price}</Typography>
          <Typography>Quantity: {cartProducts.quantity}</Typography>
        </Box>
      </Stack>
    </div>
  );
}

export default ItemDisplay;