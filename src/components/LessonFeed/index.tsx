import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Tabs,
    Tab,
    InputBase,
    IconButton,
    Chip,
    useMediaQuery,
    useTheme,
    CircularProgress
} from '@mui/material';
import { Search, TrendingUp, Whatshot, NewReleases, FilterList } from '@mui/icons-material';
import LessonCard from '../LessonCard';
import { Lesson } from '../../types';

// Mock data for when no lessons are provided
const mockLessons: Lesson[] = [
    {
        _id: '1',
        title: 'JavaScript Promises Explained',
        category: 'JavaScript',
        tags: ['JavaScript', 'Async', 'Promises'],
        difficulty: 'intermediate',
        duration: 60,
        content: {
            type: 'video',
            url: 'https://example.com/video1',
            thumbnailUrl: 'https://source.unsplash.com/random/600x400/?javascript'
        },
        instructor: {
            name: 'Sarah Johnson',
            profileId: 'sarah123'
        },
        views: 1200,
        likes: 340,
        challengeId: 'challenge1'
    },
    {
        _id: '2',
        title: 'React Hooks in 60 Seconds',
        category: 'React',
        tags: ['React', 'Hooks', 'Frontend'],
        difficulty: 'beginner',
        duration: 60,
        content: {
            type: 'video',
            url: 'https://example.com/video2',
            thumbnailUrl: 'https://source.unsplash.com/random/600x400/?react'
        },
        instructor: {
            name: 'Mike Chen',
            profileId: 'mike456'
        },
        views: 3500,
        likes: 720,
        challengeId: 'challenge2'
    },
    {
        _id: '3',
        title: 'CSS Grid Layout Mastery',
        category: 'CSS',
        tags: ['CSS', 'Grid', 'Layout'],
        difficulty: 'intermediate',
        duration: 60,
        content: {
            type: 'video',
            url: 'https://example.com/video3',
            thumbnailUrl: 'https://source.unsplash.com/random/600x400/?css'
        },
        instructor: {
            name: 'Emma Rodriguez',
            profileId: 'emma789'
        },
        views: 2100,
        likes: 450,
        challengeId: 'challenge3'
    },
    {
        _id: '4',
        title: 'TypeScript Interfaces vs Types',
        category: 'TypeScript',
        tags: ['TypeScript', 'Types', 'Interfaces'],
        difficulty: 'advanced',
        duration: 60,
        content: {
            type: 'video',
            url: 'https://example.com/video4',
            thumbnailUrl: 'https://source.unsplash.com/random/600x400/?typescript'
        },
        instructor: {
            name: 'Alex Kim',
            profileId: 'alex101'
        },
        views: 1800,
        likes: 380,
        challengeId: 'challenge4'
    }
];

interface LessonFeedProps {
    lessons?: Lesson[];
    title?: string;
    description?: string;
    loading?: boolean;
}

const LessonFeed = ({
    lessons,
    title = "Trending Lessons",
    description = "Discover the most popular bite-sized coding lessons from top instructors around the world.",
    loading = false
}: LessonFeedProps) => {
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [displayLessons, setDisplayLessons] = useState<Lesson[]>([]);

    useEffect(() => {
        // Use provided lessons or fallback to mock data
        setDisplayLessons(lessons && lessons.length > 0 ? lessons : mockLessons);
    }, [lessons]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const categories = ['All', 'JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'TypeScript'];

    return (
        <Box sx={{
            py: 6,
            background: 'linear-gradient(180deg, #0a0a0a 0%, #111827 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Gradient orb decoration */}
            <Box sx={{
                position: 'absolute',
                width: '30vw',
                height: '30vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 70%)',
                bottom: '-15vw',
                right: '-10vw',
                zIndex: 0,
            }} />

            <Container maxWidth="xl">
                {/* Header section */}
                <Box sx={{ mb: 6, position: 'relative', zIndex: 1 }}>
                    {title && (
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                mb: description ? 2 : 4,
                                fontSize: { xs: '2rem', md: '2.5rem' }
                            }}
                        >
                            {title}
                        </Typography>
                    )}

                    {description && (
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                mb: 4,
                                maxWidth: '800px',
                                fontSize: '1.1rem',
                                lineHeight: 1.6
                            }}
                        >
                            {description}
                        </Typography>
                    )}

                    {/* Search and filter bar */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 4
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'background.paper',
                            borderRadius: '8px',
                            px: 2,
                            py: 0.5,
                            flexGrow: 1,
                            maxWidth: '500px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <Search sx={{ color: 'text.secondary', mr: 1 }} />
                            <InputBase
                                placeholder="Search lessons..."
                                fullWidth
                                sx={{ color: 'text.primary' }}
                            />
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            ml: { xs: 1, md: 3 },
                            flexWrap: { xs: 'nowrap', md: 'wrap' },
                            overflow: { xs: 'auto', md: 'visible' },
                            pb: { xs: 1, md: 0 },
                            gap: 1
                        }}>
                            {!isMobile && categories.map(category => (
                                <Chip
                                    key={category}
                                    label={category}
                                    clickable
                                    sx={{
                                        bgcolor: category === 'All' ? 'primary.main' : 'background.paper',
                                        color: category === 'All' ? 'white' : 'text.primary',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        '&:hover': {
                                            bgcolor: category === 'All' ? 'primary.dark' : 'rgba(255,255,255,0.05)'
                                        }
                                    }}
                                />
                            ))}

                            <IconButton
                                size="small"
                                sx={{
                                    ml: 1,
                                    bgcolor: 'background.paper',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'text.secondary'
                                }}
                            >
                                <FilterList fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Tabs */}
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{
                            mb: 4,
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#3b82f6',
                            },
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                minWidth: 'auto',
                                mr: 4,
                                px: 0,
                                '&.Mui-selected': {
                                    color: '#3b82f6',
                                }
                            }
                        }}
                    >
                        <Tab icon={<TrendingUp sx={{ fontSize: 18, mr: 1 }} />} iconPosition="start" label="Trending" />
                        <Tab icon={<Whatshot sx={{ fontSize: 18, mr: 1 }} />} iconPosition="start" label="Popular" />
                        <Tab icon={<NewReleases sx={{ fontSize: 18, mr: 1 }} />} iconPosition="start" label="New" />
                    </Tabs>
                </Box>

                {/* Lessons grid */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {displayLessons.map((lesson) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={lesson._id}>
                                <LessonCard lesson={lesson} />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Load more button */}
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Chip
                        label="Load More"
                        clickable
                        sx={{
                            bgcolor: 'background.paper',
                            color: 'text.primary',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            px: 3,
                            py: 2.5,
                            fontSize: '1rem',
                            fontWeight: 500,
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.05)'
                            }
                        }}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default LessonFeed; 