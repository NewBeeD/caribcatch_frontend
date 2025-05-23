import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const ItemDisplay = ({ cartProducts }) => {
  return (
    <Box
    marginBottom={{ xs: 2}}
    border='3px solid #f68b1f'
    padding={{ xs: 1}}
    sx={{ borderRadius: '20px'}}>

      <Typography variant="h6">{cartProducts.title}</Typography>

      <Stack 
        direction="row" 
        justifyContent="space-between"
        sx={{ width: '100%' }}
        letterSpacing={2}
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
    </Box>
  );
}

export default ItemDisplay;