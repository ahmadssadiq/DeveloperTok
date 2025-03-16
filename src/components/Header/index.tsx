import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import { Search, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#2e2e2', boxShadow: 'none', borderBottom: '1px solid #222' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => navigate('/')}
          >
            {/* Custom animated logo */}
            <Box
              sx={{
                position: 'relative',
                width: '36px',
                height: '36px',
                mr: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.2) 100%)',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 40%, rgba(59,130,246,0.6) 45%, rgba(59,130,246,0.6) 55%, transparent 60%)',
                  filter: 'blur(8px)',
                  animation: 'shimmer 3s infinite',
                },
                '@keyframes shimmer': {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(100%)' },
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  fontSize: '18px',
                  color: '#3b82f6',
                  textShadow: '0 0 10px rgba(59,130,246,0.5)',
                  zIndex: 1,
                }}
              >
                {'</>'}
              </Typography>
            </Box>

            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'white',
                textDecoration: 'none',
                position: 'relative',
                background: 'linear-gradient(90deg, #fff 0%, #f3f4f6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,1) 50%, rgba(59,130,246,0) 100%)',
                  opacity: 0.7,
                }
              }}
            >
              DEVELOPER<span style={{
                color: '#3b82f6',
                WebkitTextFillColor: '#3b82f6',
                textShadow: '0 0 10px rgba(59,130,246,0.3)'
              }}>TOK</span>
            </Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button
              color="inherit"
              onClick={() => navigate('/')}
              sx={{
                fontWeight: 500,
                '&:hover': { color: '#3b82f6' }
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/categories')}
              sx={{
                fontWeight: 500,
                '&:hover': { color: '#3b82f6' }
              }}
            >
              Categories
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/challenges')}
              sx={{
                fontWeight: 500,
                '&:hover': { color: '#3b82f6' }
              }}
            >
              Challenges
            </Button>
          </Box>

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <IconButton color="inherit" sx={{ mr: 2 }}>
                  <Search />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => navigate('/profile')}
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/auth')}
                  sx={{ mr: 2 }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/auth')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 