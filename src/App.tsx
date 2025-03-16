import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Challenges from './pages/Challenges';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default'
        }}>
          <Header />
          <Box sx={{
            flexGrow: 1,
            pt: 8, // Add padding top for header
          }}>
            <Routes>
              <Route path="/" element={!isAuthenticated ? <Landing /> : <Home />} />
              <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/" />} />
              <Route path="/login" element={!isAuthenticated ? <Auth initialTab="login" /> : <Navigate to="/" />} />
              <Route path="/signup" element={!isAuthenticated ? <Auth initialTab="signup" /> : <Navigate to="/" />} />
              <Route path="/categories" element={isAuthenticated ? <Categories /> : <Navigate to="/login" />} />
              <Route path="/challenges" element={isAuthenticated ? <Challenges /> : <Navigate to="/login" />} />
              <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
} 