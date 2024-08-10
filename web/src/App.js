import React from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import Header from './components/Header';
import PortfolioList from './components/PortfolioList';
import Footer from './components/Footer'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Header />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <PortfolioList />
      </Container>
      <Footer />
    </Box>
  );
}


export default App;