// components/Footer.tsx
'use client';

import { Box, Container, Typography, Link } from '@mui/material';
import NextLink from 'next/link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Fresh Caribbean Produce
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mt={1}>
          <Link component={NextLink} href="/about" color="inherit">
            About Us
          </Link>
          {' | '}
          <Link component={NextLink} href="/contact" color="inherit">
            Contact
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}