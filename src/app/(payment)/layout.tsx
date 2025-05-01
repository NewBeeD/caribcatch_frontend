import { Box } from '@mui/material';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { 
          xs: '100%',
          sm: 600,
          md: 900,
          lg: 1000,
        },
        mx: 'auto',
        px: { xs: 0, sm: 0 }
      }}
    >
      {children}
    </Box>
  );
}