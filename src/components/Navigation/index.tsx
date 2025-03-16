import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Category, Code, Person } from '@mui/icons-material';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper 
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<Home />}
        />
        <BottomNavigationAction
          label="Categories"
          value="/categories"
          icon={<Category />}
        />
        <BottomNavigationAction
          label="Challenges"
          value="/challenges"
          icon={<Code />}
        />
        <BottomNavigationAction
          label="Profile"
          value="/profile"
          icon={<Person />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation; 