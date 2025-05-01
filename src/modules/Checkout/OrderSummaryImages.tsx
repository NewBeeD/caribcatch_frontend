import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Badge from '@mui/material/Badge';

const OrderSummaryImages = ({ cartProducts }) => {
  
  
  return (
    
    
    <Box

    padding={{ xs: 1}}
    sx={{ borderRadius: '20px'}}
    >

      <Stack 
        direction="row" 
        justifyContent="space-between"
        sx={{ width: '100%' }}
        letterSpacing={1}
      >
        {/* Image Box - Takes 50% width */}

        <Stack
        direction={{ sm: 'row'}}
        spacing={1}
        justifyContent='center'
        alignItems='center'>

          <Box>
            <Badge
            badgeContent={cartProducts.quantity} 
            color='warning'
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
              }
            }}>

              <Box sx={{
                position: 'relative',
                width: { xs: '100%', sm: 60 }, // Set explicit width
                height: { xs: 200, sm: 60 },
                overflow: 'hidden',
                borderRadius: '4px'
              }}>


                <Image
                  src={cartProducts.thumbnail}
                  alt={cartProducts.title}
                  fill
                  quality={70}
                  sizes="(max-width: 600px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              </Box>

            </Badge>
          </Box>

          <Box>
            <Typography sx={{ fontSize: {sm: '10px'}}}>{cartProducts.product_title}</Typography>

            <Typography sx={{ fontSize: {sm: '8px'}}}>{cartProducts.title}</Typography>
          </Box>


        </Stack>


        {/* Content Box - Takes 50% width */}
        <Box 
        textAlign='right'
        sx={{
          flex: 1,
          maxWidth: '50%',
          boxSizing: 'border-box',
          bgcolor: '#f0f0f0', // Optional: visual indicator
          p: 2 // Add padding
        }}>
          {/* Add your content here */}
          <Typography sx={{ fontSize: {sm: '10px'}, }}>${cartProducts.quantity * cartProducts.unit_price }</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default OrderSummaryImages;