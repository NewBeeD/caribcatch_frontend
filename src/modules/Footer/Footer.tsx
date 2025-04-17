
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: 'auto',
        paddingTop: 3,
        paddingX: 2,
        paddingBottom: {xs: 3},
        backgroundColor: 'black'
        
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="white" align="center">
          © {new Date().getFullYear()} Fresh Caribbean Produce
        </Typography>
        <Typography variant="body2" color="white" align="center" mt={1}>
          <Link href="/about" color="inherit">
            About Us
          </Link>
          {' | '}
          <Link href="/contact" color="inherit">
            Contact
          </Link>

          
        </Typography>

        <Typography 
        color="white"
        variant="body2"
        textAlign='center'
        sx={{ paddingTop: {xs: 2}}}>
          Designed by: Danphil Daniel
        </Typography>
      </Container>
    </Box>
  );
}