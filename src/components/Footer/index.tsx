import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider, Stack } from '@mui/material';
import { Code } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#111', color: '#999', py: 3, borderTop: '1px solid #222' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          {/* Logo and description - left side */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Code sx={{ mr: 0.5, color: '#3b82f6', fontSize: '1.2rem' }} />
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.05rem',
                  color: 'white',
                }}
              >
                DEVELOPER<span style={{ color: '#3b82f6' }}>TOK</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 0 }}>
              Learn coding concepts in bite-sized lessons.
            </Typography>
          </Grid>

          {/* Quick links - center */}
          <Grid item xs={12} md={5}>
            <Stack
              direction="row"
              spacing={1}
              divider={<Box component="span" sx={{ color: '#333' }}>•</Box>}
              sx={{
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' },
                fontSize: '0.8rem',
                mb: { xs: 1, md: 0 }
              }}
            >
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#3b82f6' } }}>Home</Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#3b82f6' } }}>Categories</Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#3b82f6' } }}>Challenges</Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#3b82f6' } }}>About</Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#3b82f6' } }}>Terms</Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#3b82f6' } }}>Privacy</Link>
            </Stack>
          </Grid>

          {/* Social links - right side */}
          <Grid item xs={12} md={3}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: { xs: 'center', md: 'flex-end' },
                fontSize: '0.8rem'
              }}
            >
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#3b82f6' } }}>Twitter</Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#3b82f6' } }}>GitHub</Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { color: '#3b82f6' } }}>Discord</Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderColor: '#222', opacity: 0.5 }} />

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#666'
          }}
        >
          © {new Date().getFullYear()} DeveloperTok. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 