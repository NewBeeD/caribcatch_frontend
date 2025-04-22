'use client'

import { useState, useCallback, useMemo, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

const NAV_MENU = ['Shop', 'Become a Supplier', 'Our Story'];
const SIDEBAR_MENU = [...NAV_MENU, 'Profile'];
const CART_ITEMS = ['Profile', 'My Account'];

export default function NavBar() {
  const [mounted, setMounted] = useState(false);
  const [auth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  
  const closeSidebar = useCallback((event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
      (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsSidebarOpen(false);
  }, []);

  const sidebarContent = useMemo(() => (
    <Box
      width={250}
      role="presentation"
      onClick={closeSidebar}
      onKeyDown={closeSidebar}
    >
      <IconButton sx={{ m: 1 }} onClick={closeSidebar}>
        <CloseIcon />
      </IconButton>
      <List>
        {SIDEBAR_MENU.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              
              <Link href={text === 'Shop'?"/shop":text === 'Become a Supplier'?"/become-a-supplier":text === 'Our Story'?"/ourstory":text === 'Profile'?"/profile":""}>

                <ListItemText primary={text} sx={{ textAlign: 'center' }} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  ), [closeSidebar]);

  if (!mounted) return null;

  return (
    <AppBar 
      position="fixed"
      sx={{ 
        backgroundColor: 'black',
        boxShadow: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container 
        maxWidth={false}
        sx={{
          width: '100%',
          maxWidth: {
            xs: '100%',    // Mobile: full width
            sm: 600,       // Tablet: 600px
            md: 900,       // Small desktop: 900px
            lg: 1200,      // Medium desktop: 1200px
            xl: 1440       // Large screens: 1440px
          },
          mx: 'auto',
          px: { xs: 2, sm: 3 }
        }}
      >
        <Toolbar 
          disableGutters 
          sx={{
            height: {
              xs: 56,  // Mobile
              sm: 64,  // Tablet
              md: 72   // Desktop
            },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Mobile Menu Button - shows below md breakpoint */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={openSidebar}
            sx={{ 
              display: { 
                xs: 'flex', 
                md: 'none' 
              } 
            }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={closeSidebar}
            PaperProps={{
              sx: {
                backgroundColor: 'black',
                color: 'white'
              }
            }}
          >
            {sidebarContent}
          </Drawer>

          {/* Logo - Responsive positioning */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              letterSpacing: 2,
              fontWeight: 'bold',
              position: { xs: 'absolute', md: 'static' },
              left: { xs: '50%', md: 'auto' },
              transform: { xs: 'translateX(-50%)', md: 'none' },
              fontSize: {
                xs: '1.25rem',  // Mobile
                sm: '1.5rem',    // Tablet
                md: '1.75rem'   // Desktop
              }
            }}
          >

            <Link href="/">
              Fish & Fig
            </Link>
          </Typography>

          {/* Desktop Navigation - shows at md breakpoint */}
          <Stack
            direction="row"
            spacing={{
              md: 3,  // Small desktop
              lg: 4,  // Medium desktop
              xl: 5   // Large desktop
            }}
            sx={{
              display: { 
                xs: 'none', 
                md: 'flex' 
              },
              flex: 1,
              justifyContent: 'center',
              ml: { md: 3, lg: 4, xl: 5 }
            }}
          >
            {NAV_MENU.map((item) => (
              <Typography
                key={item}
                variant="body1"
                sx={{ 
                  cursor: 'pointer', 
                  '&:hover': { opacity: 0.8 },
                  fontWeight: {
                    md: 600,
                    lg: 700,
                    xl: 800
                  },
                  fontSize: {
                    md: '0.875rem',
                    lg: '1rem',
                    xl: '1.125rem'
                  }
                }}
              >
                <Link 
                href={item === 'Shop'?"/shop":item === 'Become a Supplier'?"/become-a-supplier":item === 'Our Story'?"/ourstory":item === 'About Us'?"/aboutus":""}>

                  {item}
                </Link>
              </Typography>
            ))}
          </Stack>

          {/* Cart - Responsive spacing */}
          {auth && (
            <Box sx={{ 
              ml: {
                xs: 'auto',  // Mobile
                md: 3,       // Small desktop
                lg: 4,       // Medium desktop
                xl: 5        // Large desktop
              }
            }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleMenuOpen}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {CART_ITEMS.map((item) => (
                  <MenuItem 
                    key={item} 
                    onClick={handleMenuClose}
                    sx={{ minWidth: 120 }}
                  >

                    <Link href={item === 'Profile'?"/profile":item === 'My Account'?"/account":""}>
                    
                      {item}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}