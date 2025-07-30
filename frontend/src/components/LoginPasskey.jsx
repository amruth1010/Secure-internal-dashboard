import React, { useState } from 'react';
import { 
 Button, 
 Typography, 
 Container, 
 Box, 
 Paper, 
 CircularProgress,
 Fade,
 Slide,
 useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
 FingerprintOutlined,
 SecurityOutlined,
 LoginOutlined,
 VerifiedUserOutlined,
 KeyOutlined
} from '@mui/icons-material';

const LoginPasskey = () => {
 const navigate = useNavigate();
 const theme = useTheme();
 const [isLoading, setIsLoading] = useState(false);

 const handlePasskeyLogin = async () => {
   setIsLoading(true);
   try {
     const challengeString = 'random-challenge-123';

     const publicKey = {
       challenge: Uint8Array.from(challengeString, c => c.charCodeAt(0)),
       timeout: 60000,
       userVerification: "required",
     };

     const assertion = await navigator.credentials.get({ publicKey });

     const credentialJSON = {
       id: assertion.id,
       type: assertion.type,
       rawId: btoa(String.fromCharCode(...new Uint8Array(assertion.rawId))),
       response: {
         authenticatorData: btoa(String.fromCharCode(...new Uint8Array(assertion.response.authenticatorData))),
         clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(assertion.response.clientDataJSON))),
         signature: btoa(String.fromCharCode(...new Uint8Array(assertion.response.signature))),
         userHandle: assertion.response.userHandle
           ? btoa(String.fromCharCode(...new Uint8Array(assertion.response.userHandle)))
           : null,
       },
     };

     const res = await fetch("http://localhost:8000/api/login-passkey/", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(credentialJSON),
     });

     const result = await res.json();
     if (res.ok) {
       
       localStorage.setItem("access", result.access);
       localStorage.setItem("refresh", result.refresh);

       toast.success("✅ " + result.message);
       setTimeout(() => navigate("/"), 1000);
     } else {
       toast.error("❌ Login failed: " + result.error);
     }
   } catch (err) {
     console.error("❌ Login failed:", err);
     toast.error("❌ Login failed");
   } finally {
     setIsLoading(false);
   }
 };

 return (
   <Container maxWidth="sm" sx={{ mt: 12, textAlign: 'center' }}>
     <Fade in timeout={800}>
       <Box>
         
         <Box sx={{ mb: 6 }}>
           <Slide direction="down" in timeout={1000}>
             <Box sx={{ 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               mb: 4,
               position: 'relative'
             }}>
               <Box sx={{ 
                 position: 'relative',
                 animation: 'fingerFloat 3s ease-in-out infinite'
               }}>
                 <FingerprintOutlined 
                   sx={{ 
                     fontSize: 80, 
                     color: 'secondary.main',
                     filter: 'drop-shadow(0 4px 8px rgba(156, 39, 176, 0.3))',
                     animation: 'pulse 2s infinite'
                   }} 
                 />
                 <SecurityOutlined 
                   sx={{ 
                     position: 'absolute',
                     top: -10,
                     right: -10,
                     fontSize: 28, 
                     color: 'primary.main',
                     animation: 'rotate 4s linear infinite'
                   }} 
                 />
               </Box>
             </Box>
           </Slide>
           
           <Typography 
             variant="h3" 
             component="h1"
             sx={{
               fontWeight: 700,
               background: 'linear-gradient(45deg, #9c27b0 30%, #e91e63 90%)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               mb: 2,
               letterSpacing: '-0.02em'
             }}
           >
             Login with Passkey
           </Typography>
           
           <Typography 
             variant="h6" 
             color="text.secondary"
             sx={{ 
               mb: 4,
               maxWidth: 450,
               mx: 'auto',
               lineHeight: 1.6
             }}
           >
             Secure, fast, and passwordless authentication using your biometric data
           </Typography>
         </Box>

         {/* Main Login Card */}
         <Slide direction="up" in timeout={1200}>
           <Paper 
             elevation={12}
             sx={{
               p: 6,
               borderRadius: 4,
               background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(233, 30, 99, 0.05) 100%)',
               backdropFilter: 'blur(10px)',
               border: '1px solid rgba(156, 39, 176, 0.1)',
               position: 'relative',
               overflow: 'hidden',
               transition: 'all 0.3s ease-in-out',
               '&:hover': {
                 transform: 'translateY(-8px)',
                 boxShadow: theme.shadows[20],
                 '&::before': {
                   opacity: 1
                 }
               },
               '&::before': {
                 content: '""',
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 right: 0,
                 bottom: 0,
                 background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)',
                 opacity: 0,
                 transition: 'opacity 0.3s ease-in-out'
               }
             }}
           >
             <Box sx={{ position: 'relative', zIndex: 1 }}>
               
               <Box sx={{ 
                 display: 'flex', 
                 justifyContent: 'center', 
                 gap: 3, 
                 mb: 4 
               }}>
                 <Box sx={{ textAlign: 'center' }}>
                   <VerifiedUserOutlined sx={{ 
                     fontSize: 32, 
                     color: 'success.main', 
                     mb: 1,
                     animation: 'bounce 2s infinite 0.2s'
                   }} />
                   <Typography variant="caption" color="text.secondary">
                     Secure
                   </Typography>
                 </Box>
                 <Box sx={{ textAlign: 'center' }}>
                   <KeyOutlined sx={{ 
                     fontSize: 32, 
                     color: 'warning.main', 
                     mb: 1,
                     animation: 'bounce 2s infinite 0.4s'
                   }} />
                   <Typography variant="caption" color="text.secondary">
                     Encrypted
                   </Typography>
                 </Box>
                 <Box sx={{ textAlign: 'center' }}>
                   <LoginOutlined sx={{ 
                     fontSize: 32, 
                     color: 'info.main', 
                     mb: 1,
                     animation: 'bounce 2s infinite 0.6s'
                   }} />
                   <Typography variant="caption" color="text.secondary">
                     Fast Login
                   </Typography>
                 </Box>
               </Box>

               <Typography 
                 variant="h6" 
                 sx={{ 
                   mb: 4, 
                   color: 'text.primary', 
                   fontWeight: 600 
                 }}
               >
                 Authenticate with Your Device
               </Typography>
               
               <Button 
                 variant="contained" 
                 onClick={handlePasskeyLogin}
                 disabled={isLoading}
                 size="large"
                 startIcon={
                   isLoading ? (
                     <CircularProgress size={20} color="inherit" />
                   ) : (
                     <FingerprintOutlined />
                   )
                 }
                 sx={{
                   py: 2,
                   px: 4,
                   borderRadius: 3,
                   textTransform: 'none',
                   fontSize: '1.2rem',
                   fontWeight: 700,
                   background: 'linear-gradient(45deg, #9c27b0 30%, #e91e63 90%)',
                   boxShadow: '0 6px 25px rgba(156, 39, 176, 0.4)',
                   transition: 'all 0.3s ease-in-out',
                   position: 'relative',
                   overflow: 'hidden',
                   '&:hover': {
                     transform: 'translateY(-3px)',
                     boxShadow: '0 10px 35px rgba(156, 39, 176, 0.5)',
                     background: 'linear-gradient(45deg, #8e24aa 30%, #d81b60 90%)',
                   },
                   '&:disabled': {
                     background: 'linear-gradient(45deg, #9c27b0 30%, #e91e63 90%)',
                     opacity: 0.7
                   },
                   '&::after': {
                     content: '""',
                     position: 'absolute',
                     top: 0,
                     left: '-100%',
                     width: '100%',
                     height: '100%',
                     background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                     transition: 'left 0.6s',
                   },
                   '&:hover::after': {
                     left: '100%',
                   }
                 }}
               >
                 {isLoading ? 'Authenticating...' : 'Login with Passkey'}
               </Button>

               <Typography 
                 variant="body2" 
                 color="text.secondary"
                 sx={{ 
                   mt: 3,
                   fontStyle: 'italic',
                   opacity: 0.8
                 }}
               >
                 Touch your fingerprint sensor or use Face ID to continue
               </Typography>
             </Box>
           </Paper>
         </Slide>
       </Box>
     </Fade>

    
     <style jsx>{`
       @keyframes fingerFloat {
         0%, 100% { transform: translateY(0px) scale(1); }
         50% { transform: translateY(-8px) scale(1.05); }
       }
       
       @keyframes pulse {
         0% { opacity: 1; transform: scale(1); }
         50% { opacity: 0.8; transform: scale(1.05); }
         100% { opacity: 1; transform: scale(1); }
       }
       
       @keyframes rotate {
         0% { transform: rotate(0deg); }
         100% { transform: rotate(360deg); }
       }
       
       @keyframes bounce {
         0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
         40% { transform: translateY(-8px); }
         60% { transform: translateY(-4px); }
       }
     `}</style>
   </Container>
 );
};

export default LoginPasskey;