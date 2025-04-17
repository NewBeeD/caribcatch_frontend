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

const NAV_MENU = ['Shop', 'Become a Supplier', 'Our Story'];
const SIDEBAR_MENU = [...NAV_MENU, 'About Us'];
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
              <ListItemText primary={text} sx={{ textAlign: 'center' }} />
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

    sx={{ backgroundColor: {xs: 'black', sm: 'rgba(0, 0, 0, 0)'}, boxShadow: {sm: 'none'}, zIndex: { lg: 1000}}}>
      
      
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{
          display: 'flex',
          justifyContent: { xs: 'space-between', lg: 'space-evenly' }
        }}>
          {/* Mobile Menu */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={openSidebar}
            sx={{ 
              mr: 2, 
              display: { 
                xs: mounted ? 'flex' : 'none', 
                sm: 'none' 
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
              flex: { xs: 1, sm: 'none' },
              textAlign: { xs: 'center', sm: 'left' },
              
            }}
          >
            Fish & Fig
          </Typography>

          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={4}
            sx={{
              display: { 
                xs: 'none', 
                sm: mounted ? 'flex' : 'none' 
              },
              flex: 1,
              justifyContent: 'center',
              maxWidth: 600
            }}
          >
            {NAV_MENU.map((item) => (
              <Typography
                key={item}
                variant="h6"
                fontWeight={900}
                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 },  }}
              >
                {item}
              </Typography>
            ))}
          </Stack>

          {/* Cart */}
          {auth && (
            <Box>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ ml: 'auto',  }}
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
                  <MenuItem key={item} onClick={handleMenuClose}>
                    {item}
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