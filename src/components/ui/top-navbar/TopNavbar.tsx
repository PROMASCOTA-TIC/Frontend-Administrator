'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from '@mui/material/Container';
import { themePalette } from '@/config/theme.config';


const settings = [
  { path: '/auth/login', text: 'Cerrar sesión' },
];

const TopNavbar: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ width: '100%', height: { xs: '60px', md: '65px', background: themePalette.cwhite } }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{ height: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>

          {/* Menú de cuenta visible en todas las pantallas */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <Tooltip title="Open settings">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, display: 'flex', alignItems: 'center' }}>
                  <AccountCircleIcon sx={{ color: themePalette.primary, fontSize: { xs: 28, md: 40 } }} />
                  <ArrowForwardIosIcon
                    sx={{ color: themePalette.primary, fontSize: { xs: 10, md: 14 }, ml: 0.5, transform: 'rotate(90deg)' }}
                  />
                </IconButton>

              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                  <Link href={setting.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography textAlign="center">{setting.text}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavbar;

