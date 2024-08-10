import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

const Header = () => (
  <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ height: 80 }}>
        <Box display="flex" alignItems="center">
          <PaletteIcon sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
          <Typography 
            variant="h4" 
            component="div"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' },
              letterSpacing: '0.02em',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              backgroundImage: 'linear-gradient(45deg, #2196f3, #21cbf3)',
            }}>
            Digital Artist Portfolio
          </Typography>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;