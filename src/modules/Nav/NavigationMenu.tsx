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
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

import sdk from '@/lib/sdk'
import { HttpTypes } from "@medusajs/types"

const NAV_MENU = ['Shop', 'Become a Supplier', 'Our Story'];
const SIDEBAR_MENU = [...NAV_MENU, 'Profile'];
const CART_ITEMS = ['Profile', 'My Account'];

export default function NavBar() {
  const [mounted, setMounted] = useState(false);
  const [auth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Changed to store just the count instead of the whole cart
  const [cartCount, setCartCount] = useState<number>(0);

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
              <Link href={text === 'Shop' ? "/shop" : text === 'Become a Supplier' ? "/become-a-supplier" : text === 'Our Story' ? "/ourstory" : text === 'Profile' ? "/profile" : ""}>
                <ListItemText primary={text} sx={{ textAlign: 'center' }} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  ), [closeSidebar]);

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = localStorage.getItem("cart_id");
      if (!cartId) {
        setCartCount(0);
        return;
      }

      try {
        const { cart: dataCart } = await sdk.store.cart.retrieve(cartId);
        setCartCount(dataCart.items?.length || 0);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCartCount(0);
      }
    };

    if (mounted) {
      fetchCart();
    }
  }, [mounted]);

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
            xs: '100%',
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1440
          },
          mx: 'auto',
          px: { xs: 2, sm: 3 }
        }}
      >
        <Toolbar 
          disableGutters 
          sx={{
            height: {
              xs: 56,
              sm: 64,
              md: 72
            },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Mobile Menu Button */}
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

          {/* Logo */}
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
                xs: '1.25rem',
                sm: '1.5rem',
                md: '1.75rem'
              }
            }}
          >
            <Link href="/">
              Fish & Fig
            </Link>
          </Typography>

          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={{
              md: 3,
              lg: 4,
              xl: 5
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
                  href={item === 'Shop' ? "/shop" : item === 'Become a Supplier' ? "/become-a-supplier" : item === 'Our Story' ? "/ourstory" : ""}>
                  {item}
                </Link>
              </Typography>
            ))}
          </Stack>

          {/* Cart Section */}
          {auth && (
            <Box sx={{ 
              ml: {
                xs: 'auto',
                md: 3,
                lg: 4,
                xl: 5
              }
            }}>
              <IconButton
                size="large"
                color="inherit"
                component={Link}  // This is the magic prop
                href="/cart"      // Your target page
              >
                <Badge 
                  badgeContent={cartCount} 
                  invisible={cartCount === 0}
                  color='warning'
                  max={15}
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>

            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}