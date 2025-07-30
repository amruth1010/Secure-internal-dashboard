
import React from 'react';
import { 
 AppBar, 
 Toolbar, 
 Typography, 
 Button, 
 Stack, 
 Box,
 IconButton,
 useScrollTrigger,
 Slide,
 Fade
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
 HomeOutlined,
 ContactsOutlined,
 PhoneOutlined,
 LogoutOutlined,
 LoginOutlined,
 PersonAddOutlined,
 SecurityOutlined,
 KeyOutlined
} from '@mui/icons-material';

const Navbar = () => {
 const navigate = useNavigate();
 const isAuthenticated = !!localStorage.getItem('access'); // Check token
 const trigger = useScrollTrigger();

 const handleLogout = () => {
   localStorage.removeItem('access');
   localStorage.removeItem('refresh');
   navigate('/login');
 };

 return (
   <Slide appear={false} direction="down" in={!trigger}>
     <AppBar 
       position="fixed" 
       sx={{ 
         background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 50%, #e91e63 100%)',
         backdropFilter: 'blur(10px)',
         boxShadow: '0 8px 32px rgba(103, 58, 183, 0.3)',
         transition: 'all 0.3s ease-in-out',
         '&:hover': {
           boxShadow: '0 12px 40px rgba(103, 58, 183, 0.4)',
         }
       }}
     >
       <Toolbar sx={{ minHeight: '70px !important', px: 3 }}>
         
         <Box sx={{ 
           display: 'flex', 
           alignItems: 'center', 
           flexGrow: 1,
           transition: 'transform 0.3s ease-in-out',
           '&:hover': {
             transform: 'scale(1.05)'
           }
         }}>
           <Box sx={{ 
             display: 'flex', 
             alignItems: 'center', 
             mr: 2,
             animation: 'logoFloat 3s ease-in-out infinite'
           }}>
             <SecurityOutlined 
               sx={{ 
                 fontSize: 28, 
                 color: '#fff', 
                 mr: 1,
                 filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
               }} 
             />
             <KeyOutlined 
               sx={{ 
                 fontSize: 24, 
                 color: '#e1bee7',
                 transform: 'rotate(-15deg)',
                 filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
               }} 
             />
           </Box>
           <Typography 
             variant="h5" 
             sx={{ 
               fontWeight: 700,
               background: 'linear-gradient(45deg, #ffffff 30%, #e1bee7 90%)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               textShadow: '0 2px 4px rgba(0,0,0,0.3)',
               letterSpacing: '-0.5px'
             }}
           >
             Passkey Dashboard
           </Typography>
         </Box>

         
         <Stack direction="row" spacing={1}>
           <Fade in timeout={800}>
             <Button 
               color="inherit" 
               component={Link} 
               to="/"
               startIcon={<HomeOutlined />}
               sx={{
                 textTransform: 'none',
                 fontWeight: 600,
                 px: 2,
                 py: 1,
                 borderRadius: 2,
                 transition: 'all 0.3s ease-in-out',
                 position: 'relative',
                 overflow: 'hidden',
                 '&:hover': {
                   backgroundColor: 'rgba(255, 255, 255, 0.15)',
                   transform: 'translateY(-2px)',
                   boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                 },
                 '&:before': {
                   content: '""',
                   position: 'absolute',
                   top: 0,
                   left: '-100%',
                   width: '100%',
                   height: '100%',
                   background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                   transition: 'left 0.5s',
                 },
                 '&:hover:before': {
                   left: '100%',
                 }
               }}
             >
               Home
             </Button>
           </Fade>

           {isAuthenticated ? (
             <>
               <Fade in timeout={1000}>
                 <Button 
                   color="inherit" 
                   component={Link} 
                   to="/contacts"
                   startIcon={<ContactsOutlined />}
                   sx={{
                     textTransform: 'none',
                     fontWeight: 600,
                     px: 2,
                     py: 1,
                     borderRadius: 2,
                     transition: 'all 0.3s ease-in-out',
                     position: 'relative',
                     overflow: 'hidden',
                     '&:hover': {
                       backgroundColor: 'rgba(255, 255, 255, 0.15)',
                       transform: 'translateY(-2px)',
                       boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                     },
                     '&:before': {
                       content: '""',
                       position: 'absolute',
                       top: 0,
                       left: '-100%',
                       width: '100%',
                       height: '100%',
                       background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                       transition: 'left 0.5s',
                     },
                     '&:hover:before': {
                       left: '100%',
                     }
                   }}
                 >
                   Contacts
                 </Button>
               </Fade>

               <Fade in timeout={1200}>
                 <Button 
                   color="inherit" 
                   component={Link} 
                   to="/web-dialer"
                   startIcon={<PhoneOutlined />}
                   sx={{
                     textTransform: 'none',
                     fontWeight: 600,
                     px: 2,
                     py: 1,
                     borderRadius: 2,
                     transition: 'all 0.3s ease-in-out',
                     position: 'relative',
                     overflow: 'hidden',
                     '&:hover': {
                       backgroundColor: 'rgba(255, 255, 255, 0.15)',
                       transform: 'translateY(-2px)',
                       boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                     },
                     '&:before': {
                       content: '""',
                       position: 'absolute',
                       top: 0,
                       left: '-100%',
                       width: '100%',
                       height: '100%',
                       background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                       transition: 'left 0.5s',
                     },
                     '&:hover:before': {
                       left: '100%',
                     }
                   }}
                 >
                   Web Dialer
                 </Button>
               </Fade>

               <Fade in timeout={1400}>
                 <Button 
                   color="inherit" 
                   onClick={handleLogout}
                   startIcon={<LogoutOutlined />}
                   sx={{
                     textTransform: 'none',
                     fontWeight: 600,
                     px: 2,
                     py: 1,
                     borderRadius: 2,
                     backgroundColor: 'rgba(244, 67, 54, 0.2)',
                     border: '1px solid rgba(244, 67, 54, 0.3)',
                     transition: 'all 0.3s ease-in-out',
                     '&:hover': {
                       backgroundColor: 'rgba(244, 67, 54, 0.3)',
                       transform: 'translateY(-2px)',
                       boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
                       borderColor: 'rgba(244, 67, 54, 0.5)',
                     }
                   }}
                 >
                   Logout
                 </Button>
               </Fade>
             </>
           ) : (
             <>
               <Fade in timeout={1000}>
                 <Button 
                   color="inherit" 
                   component={Link} 
                   to="/login"
                   startIcon={<LoginOutlined />}
                   sx={{
                     textTransform: 'none',
                     fontWeight: 600,
                     px: 2,
                     py: 1,
                     borderRadius: 2,
                     transition: 'all 0.3s ease-in-out',
                     position: 'relative',
                     overflow: 'hidden',
                     '&:hover': {
                       backgroundColor: 'rgba(255, 255, 255, 0.15)',
                       transform: 'translateY(-2px)',
                       boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                     },
                     '&:before': {
                       content: '""',
                       position: 'absolute',
                       top: 0,
                       left: '-100%',
                       width: '100%',
                       height: '100%',
                       background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                       transition: 'left 0.5s',
                     },
                     '&:hover:before': {
                       left: '100%',
                     }
                   }}
                 >
                   Login
                 </Button>
               </Fade>

               <Fade in timeout={1200}>
                 <Button 
                   color="inherit" 
                   component={Link} 
                   to="/register"
                   startIcon={<PersonAddOutlined />}
                   sx={{
                     textTransform: 'none',
                     fontWeight: 600,
                     px: 2,
                     py: 1,
                     borderRadius: 2,
                     backgroundColor: 'rgba(255, 255, 255, 0.1)',
                     border: '1px solid rgba(255, 255, 255, 0.2)',
                     transition: 'all 0.3s ease-in-out',
                     '&:hover': {
                       backgroundColor: 'rgba(255, 255, 255, 0.2)',
                       transform: 'translateY(-2px)',
                       boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                       borderColor: 'rgba(255, 255, 255, 0.4)',
                     }
                   }}
                 >
                   Register
                 </Button>
               </Fade>
             </>
           )}
         </Stack>
       </Toolbar>

       
       <style jsx>{`
         @keyframes logoFloat {
           0%, 100% { transform: translateY(0px); }
           50% { transform: translateY(-3px); }
         }
       `}</style>
     </AppBar>
   </Slide>
 );
};

export default Navbar;