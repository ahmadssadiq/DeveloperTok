import React from 'react';
import { Card, Typography, Box, Chip, Button, IconButton } from '@mui/material';
import { ThumbUp, Comment, Share, Code, PlayArrow } from '@mui/icons-material';
import { Lesson } from '../../types';

interface LessonCardProps {
    lesson: Lesson;
    onChallengeClick?: () => void;
}

const LessonCard = ({ lesson, onChallengeClick }: LessonCardProps) => {
    // Handle potential missing data safely - fix the thumbnailUrl access
    const thumbnailUrl = lesson.content?.thumbnailUrl || 'https://source.unsplash.com/random/600x400/?code';
    const instructorName = lesson.instructor?.name || 'Instructor';
    const tags = lesson.tags || [];
    const likes = lesson.likes || 0;

    return (
        <Card
            sx={{
                height: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }
            }}
        >
            {/* Video thumbnail with play button */}
            <Box
                sx={{
                    position: 'relative',
                    paddingTop: '56.25%', // 16:9 aspect ratio
                    bgcolor: '#000',
                    backgroundImage: `url(${thumbnailUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'rgba(59, 130, 246, 0.9)',
                        color: '#fff',
                        '&:hover': {
                            bgcolor: '#3b82f6'
                        },
                        width: 60,
                        height: 60
                    }}
                >
                    <PlayArrow sx={{ fontSize: 30 }} />
                </IconButton>

                {/* Duration badge */}
                <Chip
                    label={lesson.duration ? `${Math.floor(lesson.duration / 60)}:${(lesson.duration % 60).toString().padStart(2, '0')}` : "1:00"}
                    size="small"
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                        color: '#fff',
                        borderRadius: '4px',
                        fontWeight: 500
                    }}
                />
            </Box>

            <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Topic category chip */}
                <Chip
                    label={lesson.category || 'Programming'}
                    size="small"
                    sx={{
                        mb: 2,
                        bgcolor: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        borderRadius: '4px',
                        fontWeight: 500
                    }}
                />

                {/* Title */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        lineHeight: 1.3
                    }}
                >
                    {lesson.title}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body2"
                    sx={{
                        mb: 3,
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        flexGrow: 1
                    }}
                >
                    A concise introduction to {lesson.title}. Learn the fundamentals in just one minute.
                </Typography>

                {/* Tags */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {tags.map(tag => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6',
                                borderRadius: '4px'
                            }}
                        />
                    ))}
                </Box>

                {/* Instructor info */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            bgcolor: 'rgba(59, 130, 246, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            color: '#3b82f6'
                        }}
                    >
                        {instructorName.charAt(0)}
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {instructorName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Instructor
                        </Typography>
                    </Box>
                </Box>

                {/* Challenge button */}
                <Button
                    variant="contained"
                    onClick={onChallengeClick}
                    startIcon={<Code />}
                    sx={{
                        bgcolor: '#3b82f6',
                        color: '#fff',
                        borderRadius: '8px',
                        py: 1,
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: '#2563eb'
                        }
                    }}
                >
                    Try the Challenge
                </Button>

                {/* Engagement stats */}
                <Box sx={{ display: 'flex', gap: 3, mt: 3, color: 'text.secondary' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThumbUp sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption">{likes}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Comment sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption">42</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Share sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption">Share</Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default LessonCard; 