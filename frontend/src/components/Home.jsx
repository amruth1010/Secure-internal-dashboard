import React from 'react';
import { 
  Button, 
  Container, 
  Typography, 
  Stack, 
  Box, 
  Paper,
  Fade,
  Slide,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  LoginOutlined, 
  PersonAddOutlined, 
  DashboardOutlined,
  SecurityOutlined,
  KeyOutlined
} from '@mui/icons-material';

const Home = () => {
  const isAuthenticated = !!localStorage.getItem('access');
  const theme = useTheme();

  return (
    <Container maxWidth="sm" sx={{ mt: 12, textAlign: 'center' }}>
      <Fade in timeout={800}>
        <Box>
          
          <Box sx={{ mb: 6 }}>
            <Slide direction="down" in timeout={1000}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <SecurityOutlined 
                  sx={{ 
                    fontSize: 48, 
                    color: 'primary.main', 
                    mr: 2,
                    animation: 'pulse 2s infinite'
                  }} 
                />
                <KeyOutlined 
                  sx={{ 
                    fontSize: 40, 
                    color: 'secondary.main',
                    animation: 'bounce 2s infinite'
                  }} 
                />
              </Box>
            </Slide>
            
            <Typography 
              variant="h3" 
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                letterSpacing: '-0.02em'
              }}
            >
              Passkey Dashboard
            </Typography>
            
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                mb: 4,
                maxWidth: 400,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Secure authentication made simple with modern passkey technology
            </Typography>
          </Box>

          {!isAuthenticated && (
            <Slide direction="up" in timeout={1200}>
              <Paper 
                elevation={8}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[12]
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}
                >
                  Get Started
                </Typography>
                
                <Stack spacing={3}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/register"
                    size="large"
                    startIcon={<PersonAddOutlined />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)',
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                      }
                    }}
                  >
                    Create Account
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    to="/login"
                    size="large"
                    startIcon={<LoginOutlined />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(25, 118, 210, 0.2)',
                        backgroundColor: 'rgba(25, 118, 210, 0.04)'
                      }
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Paper>
            </Slide>
          )}

          {isAuthenticated && (
            <Fade in timeout={1000}>
              <Paper 
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(129, 199, 132, 0.05) 100%)',
                  border: '2px solid rgba(76, 175, 80, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <DashboardOutlined 
                    sx={{ 
                      fontSize: 32, 
                      color: 'success.main', 
                      mr: 1 
                    }} 
                  />
                </Box>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'success.dark',
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  Welcome Back!
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  You are logged in. Use the navigation bar to access your contacts.
                </Typography>
              </Paper>
            </Fade>
          )}
        </Box>
      </Fade>

      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </Container>
  );
};

export default Home;