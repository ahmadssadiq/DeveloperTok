import React from 'react';
import { Box } from '@mui/material';
import LessonFeed from '../../components/LessonFeed';

const Home = () => {
    return (
        <Box sx={{
            height: '100vh',
            bgcolor: 'background.default',
            overflow: 'hidden'
        }}>
            <LessonFeed />
        </Box>
    );
};

export default Home; 