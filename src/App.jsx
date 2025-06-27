import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './assets/style/theme';
import Header from "./components/header/index"
import Footer from './components/footer/index';
import Home from './pages/Home';
import APODPage from './pages/APODPage';
import NeoPage from './pages/NeoPage';
import MarsPage from './pages/MarsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: 'background.default',
          }}
        >
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apod" element={<APODPage />} />
              <Route path="/neo" element={<NeoPage />} />
              <Route path="/mars" element={<MarsPage />} />
              {/* Add other routes here */}
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;