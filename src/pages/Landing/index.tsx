import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  Paper,
  Chip,
  Avatar,
  Stack,
  Tab,
  Tabs
} from '@mui/material';
import {
  Code,
  ArrowForward,
  Speed,
  Psychology,
  Bolt,
  Timer,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Define the type for code samples
interface CodeSamples {
  [key: string]: string[];
}

// Define testimonial interface
interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
}

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const codeRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState('JavaScript');

  // Code samples for different languages
  const codeSamples: CodeSamples = {
    'JavaScript': [
      'function binarySearch(arr, target) {',
      '    let left = 0;',
      '    let right = arr.length - 1;',
      '    ',
      '    while (left <= right) {',
      '        const mid = Math.floor((left + right) / 2);',
      '        ',
      '        if (arr[mid] === target) {',
      '            return mid; // Target found',
      '        }',
      '        ',
      '        if (arr[mid] < target) {',
      '            left = mid + 1; // Search right half',
      '        } else {',
      '            right = mid - 1; // Search left half',
      '        }',
      '    }',
      '    ',
      '    return -1; // Target not found',
      '}'
    ],
    'Python': [
      'def binary_search(arr, target):',
      '    left = 0',
      '    right = len(arr) - 1',
      '    ',
      '    while left <= right:',
      '        mid = (left + right) // 2',
      '        ',
      '        if arr[mid] == target:',
      '            return mid  # Target found',
      '        ',
      '        if arr[mid] < target:',
      '            left = mid + 1  # Search right half',
      '        else:',
      '            right = mid - 1  # Search left half',
      '    ',
      '    return -1  # Target not found'
    ],
    'C++': [
      'int binarySearch(vector<int>& arr, int target) {',
      '    int left = 0;',
      '    int right = arr.size() - 1;',
      '    ',
      '    while (left <= right) {',
      '        int mid = left + (right - left) / 2;',
      '        ',
      '        if (arr[mid] == target) {',
      '            return mid; // Target found',
      '        }',
      '        ',
      '        if (arr[mid] < target) {',
      '            left = mid + 1; // Search right half',
      '        } else {',
      '            right = mid - 1; // Search left half',
      '        }',
      '    }',
      '    ',
      '    return -1; // Target not found',
      '}'
    ],
    'More...': [
      '// Select a language from the tabs above',
      '// to see code examples in:',
      '// - JavaScript',
      '// - Python',
      '// - C++',
      '// ',
      '// More languages coming soon!',
      '// ',
      '// DeveloperTok supports multiple programming',
      '// languages and paradigms to help you learn',
      '// the concepts that matter most.'
    ]
  };

  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Full Stack Engineer",
      avatar: "S",
      text: "I was skeptical at first, but the short lessons are surprisingly effective. I have learned more React in a month than I did in a year of traditional courses."
    },
    {
      name: "Michael Rodriguez",
      role: "Junior Developer",
      avatar: "M",
      text: "As someone just starting out, DeveloperTok has been a game-changer. The challenges after each lesson help reinforce what I have learned."
    }
  ];

  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    renderCode(newLanguage);
  };

  // Render code with syntax highlighting
  const renderCode = (lang: string) => {
    if (!codeRef.current) return;

    const codeElement = codeRef.current;

    // Clear existing content
    codeElement.innerHTML = '';

    // Create code editor container
    const editorContainer = document.createElement('div');
    editorContainer.style.backgroundColor = '#282a36';
    editorContainer.style.height = '100%';
    editorContainer.style.display = 'flex';
    editorContainer.style.flexDirection = 'column';
    codeElement.appendChild(editorContainer);

    // Create editor header
    const editorHeader = document.createElement('div');
    editorHeader.style.display = 'flex';
    editorHeader.style.justifyContent = 'space-between';
    editorHeader.style.alignItems = 'center';
    editorHeader.style.padding = '8px 12px';
    editorHeader.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    editorContainer.appendChild(editorHeader);

    // Add window controls (red, yellow, green dots)
    const windowControls = document.createElement('div');
    windowControls.style.display = 'flex';
    windowControls.style.gap = '6px';
    editorHeader.appendChild(windowControls);

    const colors = ['#ff5f56', '#ffbd2e', '#27c93f'];
    colors.forEach(color => {
      const dot = document.createElement('div');
      dot.style.width = '12px';
      dot.style.height = '12px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = color;
      windowControls.appendChild(dot);
    });

    // Add file name based on language
    const fileExtensions: Record<string, string> = {
      'JavaScript': '.js',
      'Python': '.py',
      'C++': '.cpp',
      'More...': '.txt'
    };

    const fileName = document.createElement('div');
    fileName.textContent = `binarySearch${fileExtensions[lang]}`;
    fileName.style.fontFamily = 'monospace';
    fileName.style.fontSize = '13px';
    fileName.style.color = '#f8f8f2';
    editorHeader.appendChild(fileName);

    // Add language tabs
    const languageTabs = document.createElement('div');
    languageTabs.style.display = 'flex';
    languageTabs.style.gap = '10px';
    editorHeader.appendChild(languageTabs);

    const languages = ['JavaScript', 'Python', 'C++', 'More...'];

    languages.forEach((langOption) => {
      const tab = document.createElement('div');
      tab.textContent = langOption;
      tab.style.fontSize = '12px';
      tab.style.padding = '4px 8px';
      tab.style.borderRadius = '4px';
      tab.style.cursor = 'pointer';

      if (langOption === lang) {
        tab.style.backgroundColor = '#3b82f6';
        tab.style.color = '#fff';
      } else {
        tab.style.backgroundColor = 'rgba(255,255,255,0.1)';
        tab.style.color = '#f8f8f2';
      }

      tab.addEventListener('click', () => handleLanguageChange(langOption));
      languageTabs.appendChild(tab);
    });

    // Create code container
    const codeContainer = document.createElement('div');
    codeContainer.style.display = 'flex';
    codeContainer.style.flexGrow = '1';
    codeContainer.style.overflow = 'auto';
    codeContainer.style.padding = '10px 0';
    editorContainer.appendChild(codeContainer);

    // Add line numbers
    const lineNumbers = document.createElement('div');
    lineNumbers.style.width = '40px';
    lineNumbers.style.textAlign = 'right';
    lineNumbers.style.paddingRight = '10px';
    lineNumbers.style.color = '#6272a4';
    lineNumbers.style.userSelect = 'none';
    lineNumbers.style.fontFamily = 'monospace';
    lineNumbers.style.borderRight = '1px solid rgba(255,255,255,0.1)';
    lineNumbers.style.marginRight = '10px';
    codeContainer.appendChild(lineNumbers);

    // Add code content
    const codeContent = document.createElement('div');
    codeContent.style.flexGrow = '1';
    codeContainer.appendChild(codeContent);

    // Add line numbers and code
    const currentCode = codeSamples[lang];
    currentCode.forEach((line: string, index: number) => {
      // Line number
      const lineNumber = document.createElement('div');
      lineNumber.textContent = (index + 1).toString();
      lineNumber.style.fontSize = '14px';
      lineNumber.style.lineHeight = '1.5';
      lineNumber.style.height = '21px';
      lineNumbers.appendChild(lineNumber);

      // Code line
      const codeLine = document.createElement('div');
      codeLine.textContent = line;
      codeLine.style.color = '#f8f8f2';
      codeLine.style.fontSize = '14px';
      codeLine.style.lineHeight = '1.5';
      codeLine.style.height = '21px';
      codeLine.style.fontFamily = 'monospace';
      codeLine.style.whiteSpace = 'pre';

      // Apply syntax highlighting based on language
      if (lang === 'JavaScript') {
        // Highlight JavaScript syntax
        if (line.includes('function') || line.includes('return') ||
          line.includes('if') || line.includes('else') || line.includes('while') ||
          line.includes('const') || line.includes('let')) {

          // Create a temporary element to safely set HTML content
          const tempElement = document.createElement('div');

          // Apply highlighting with proper span elements
          let highlightedLine = line
            .replace(/\b(function|return|if|else|while|const|let)\b/g, '<span style="color: #ff79c6">$1</span>')
            .replace(/\b(binarySearch)\b/g, '<span style="color: #50fa7b">$1</span>')
            .replace(/\b(\d+)\b/g, '<span style="color: #bd93f9">$1</span>');

          // Handle comments separately
          if (line.includes('//')) {
            const parts = line.split('//');
            highlightedLine = parts[0] + '<span style="color: #6272a4">//' + parts[1] + '</span>';
          }

          tempElement.innerHTML = highlightedLine;
          codeLine.innerHTML = tempElement.innerHTML;
        }
      } else if (lang === 'Python') {
        // Highlight Python syntax
        if (line.includes('def') || line.includes('return') ||
          line.includes('if') || line.includes('else') || line.includes('while')) {

          const tempElement = document.createElement('div');

          let highlightedLine = line
            .replace(/\b(def|return|if|else|while)\b/g, '<span style="color: #ff79c6">$1</span>')
            .replace(/\b(binary_search)\b/g, '<span style="color: #50fa7b">$1</span>')
            .replace(/\b(\d+)\b/g, '<span style="color: #bd93f9">$1</span>');

          // Handle Python comments
          if (line.includes('#')) {
            const parts = line.split('#');
            highlightedLine = parts[0] + '<span style="color: #6272a4">#' + parts[1] + '</span>';
          }

          tempElement.innerHTML = highlightedLine;
          codeLine.innerHTML = tempElement.innerHTML;
        }
      } else if (lang === 'C++') {
        // Highlight C++ syntax
        if (line.includes('int') || line.includes('return') ||
          line.includes('if') || line.includes('else') || line.includes('while')) {

          const tempElement = document.createElement('div');

          let highlightedLine = line
            .replace(/\b(int|return|if|else|while|vector)\b/g, '<span style="color: #ff79c6">$1</span>')
            .replace(/\b(binarySearch)\b/g, '<span style="color: #50fa7b">$1</span>')
            .replace(/\b(\d+)\b/g, '<span style="color: #bd93f9">$1</span>');

          // Handle C++ comments
          if (line.includes('//')) {
            const parts = line.split('//');
            highlightedLine = parts[0] + '<span style="color: #6272a4">//' + parts[1] + '</span>';
          }

          tempElement.innerHTML = highlightedLine;
          codeLine.innerHTML = tempElement.innerHTML;
        }
      } else {
        // Highlight comments for "More..." tab
        if (line.includes('//')) {
          const parts = line.split('//');
          codeLine.innerHTML = parts[0] + '<span style="color: #6272a4">//' + parts[1] + '</span>';
        }
      }

      codeContent.appendChild(codeLine);
    });
  };

  // Initialize code editor on component mount
  useEffect(() => {
    renderCode(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 100%)',
      position: 'relative',
      overflow: 'hidden',
      pt: 8
    }}>
      {/* Gradient orb decorations */}
      <Box sx={{
        position: 'absolute',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)',
        top: '-20vw',
        right: '-10vw',
        zIndex: 0,
      }} />

      <Box sx={{
        position: 'absolute',
        width: '30vw',
        height: '30vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0) 70%)',
        bottom: '-10vw',
        left: '-5vw',
        zIndex: 0,
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Announcement banner */}
        <Box
          sx={{
            textAlign: 'center',
            py: 2,
            mt: 4,
            mb: 6,
            mx: 'auto',
            maxWidth: 'fit-content',
            borderRadius: 50,
            px: 3,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="body2" color="primary.main" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bolt sx={{ mr: 1, fontSize: 18 }} /> Learn coding in bite-sized lessons - Just 1 minute a day!
          </Typography>
        </Box>

        {/* Hero section */}
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '80vh' }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              mb: 6
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  mb: 3,
                  background: 'linear-gradient(90deg, #fff 0%, #f3f4f6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Master Coding with <span style={{ color: '#3b82f6', WebkitTextFillColor: '#3b82f6' }}>TikTok-Style</span> Learning
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 400,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '90%'
                }}
              >
                Short, engaging video lessons that make learning to code fun, fast, and addictive. Perfect for busy developers.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/auth')}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  Start Learning Free
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/categories')}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: 600,
                    borderRadius: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2
                    }
                  }}
                >
                  Explore Categories
                </Button>
              </Stack>

              {/* Stats */}
              <Box sx={{ mt: 6, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mr: 1, color: '#3b82f6' }}>500+</Typography>
                  <Typography variant="body2" color="text.secondary">Video Lessons</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mr: 1, color: '#3b82f6' }}>50K+</Typography>
                  <Typography variant="body2" color="text.secondary">Active Learners</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mr: 1, color: '#3b82f6' }}>12</Typography>
                  <Typography variant="body2" color="text.secondary">Tech Categories</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >
            {/* Code editor mockup */}
            <Box sx={{
              position: 'relative',
              height: { xs: '300px', md: '400px' },
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              {/* Editor header */}
              <Box sx={{
                height: '40px',
                bgcolor: '#1e1e1e',
                borderBottom: '1px solid #333',
                display: 'flex',
                alignItems: 'center',
                px: 2
              }}>
                <Box sx={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  bgcolor: '#ff5f56',
                  mr: 1
                }} />
                <Box sx={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  bgcolor: '#ffbd2e',
                  mr: 1
                }} />
                <Box sx={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  bgcolor: '#27c93f',
                  mr: 2
                }} />

                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  binarySearch.js
                </Typography>
              </Box>

              {/* Editor content */}
              <Box sx={{
                height: 'calc(100% - 40px)',
                bgcolor: '#282a36',
                p: 2,
                overflowY: 'auto',
                fontFamily: 'monospace'
              }}>
                <Box ref={codeRef} />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Features section */}
        <Box sx={{ my: 12 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(90deg, #fff 0%, #f3f4f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Developers Love Us
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: '700px', mx: 'auto' }}
          >
            Our platform is designed specifically for busy developers who want to level up their skills without committing to lengthy courses.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
                    bgcolor: 'rgba(255,255,255,0.05)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 50, height: 50, mr: 2 }}>
                    <Timer />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Bite-sized Learning</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Each lesson is just 60 seconds long, making it easy to fit learning into your busy schedule. Perfect for coffee breaks or while waiting for code to compile.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
                    bgcolor: 'rgba(255,255,255,0.05)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 50, height: 50, mr: 2 }}>
                    <Psychology />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Addictive Format</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Our TikTok-style interface keeps you engaged and coming back for more. The more you watch, the more you learn, and the faster you level up.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
                    bgcolor: 'rgba(255,255,255,0.05)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#10b981', width: 50, height: 50, mr: 2 }}>
                    <Speed />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>Practical Challenges</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Apply what you learn with hands-on coding challenges that reinforce concepts and help you build real-world skills that you can use immediately.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Testimonials */}
        <Box sx={{ my: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
            What Our Users Say
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    bgcolor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 3,
                    position: 'relative',
                    '&::before': {
                      content: '"""',
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      fontSize: '4rem',
                      color: 'rgba(59,130,246,0.2)',
                      fontFamily: 'serif',
                      lineHeight: 1
                    }
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 4,
                      mt: 3,
                      minHeight: '120px',
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {testimonial.text}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA section */}
        <Box
          sx={{
            my: 12,
            p: 6,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)',
            border: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(90deg, #fff 0%, #f3f4f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ready to Level Up Your Coding Skills?
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}
          >
            Join our community of developers and start learning today. No credit card required.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/auth')}
            sx={{
              py: 1.5,
              px: 4,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
            }}
          >
            Get Started Free
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle sx={{ fontSize: 16, mr: 0.5, color: '#10b981' }} /> No credit card required
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
              <CheckCircle sx={{ fontSize: 16, mr: 0.5, color: '#10b981' }} /> Cancel anytime
            </Typography>
          </Box>
        </Box>

        {/* Trusted by section */}
        <Box sx={{ textAlign: 'center', my: 10 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Trusted by developers from leading tech companies
          </Typography>

          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
              <Grid item key={company}>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    fontWeight: 600,
                    letterSpacing: 1
                  }}
                >
                  {company}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Landing; 