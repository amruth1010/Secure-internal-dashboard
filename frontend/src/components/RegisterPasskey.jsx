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
 useTheme,
 Stepper,
 Step,
 StepLabel
} from '@mui/material';
import { toast } from 'react-toastify';
import {
 FingerprintOutlined,
 SecurityOutlined,
 PersonAddOutlined,
 VerifiedUserOutlined,
 KeyOutlined,
 DevicesOutlined,
 CheckCircleOutlined
} from '@mui/icons-material';

const RegisterPasskey = () => {
 const theme = useTheme();
 const [isLoading, setIsLoading] = useState(false);

 const handlePasskeyRegister = async () => {
   setIsLoading(true);
   try {
     const challengeString = 'random-challenge-123';
     const userId = '1234567890';

     const publicKey = {
       challenge: Uint8Array.from(challengeString, c => c.charCodeAt(0)),
       rp: { name: "Passkey Dashboard", id: window.location.hostname },
       user: {
         id: Uint8Array.from(userId, c => c.charCodeAt(0)),
         name: "user@example.com",
         displayName: "User Example",
       },
       pubKeyCredParams: [
         { type: "public-key", alg: -7 },
         { type: "public-key", alg: -257 },
       ],
       authenticatorSelection: {
         authenticatorAttachment: "platform",
         userVerification: "required",
       },
       timeout: 60000,
       attestation: "none",
     };

     const credential = await navigator.credentials.create({ publicKey });

     const credentialJSON = {
       id: credential.id,
       type: credential.type,
       rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
       response: {
         attestationObject: btoa(String.fromCharCode(...new Uint8Array(credential.response.attestationObject))),
         clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON))),
       },
     };

     const res = await fetch("http://127.0.0.1:8000/api/register-passkey/", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(credentialJSON),
     });

     if (res.ok) {
       toast.success("✅ Passkey registered successfully!");
     } else {
       toast.error("❌ Backend error: " + res.status);
     }
   } catch (err) {
     console.error("❌ Registration failed:", err);
     toast.error("❌ Registration failed!");
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
                 animation: 'registerFloat 3s ease-in-out infinite'
               }}>
                 <PersonAddOutlined 
                   sx={{ 
                     fontSize: 80, 
                     color: 'primary.main',
                     filter: 'drop-shadow(0 4px 8px rgba(25, 118, 210, 0.3))',
                     animation: 'pulse 2s infinite'
                   }} 
                 />
                 <FingerprintOutlined 
                   sx={{ 
                     position: 'absolute',
                     top: -8,
                     right: -8,
                     fontSize: 32, 
                     color: 'secondary.main',
                     animation: 'spin 4s linear infinite'
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
               background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               mb: 2,
               letterSpacing: '-0.02em'
             }}
           >
             Register Passkey
           </Typography>
           
           <Typography 
             variant="h6" 
             color="text.secondary"
             sx={{ 
               mb: 4,
               maxWidth: 480,
               mx: 'auto',
               lineHeight: 1.6
             }}
           >
             Create your secure passkey for passwordless authentication
           </Typography>
         </Box>

         
         <Slide direction="up" in timeout={800}>
           <Paper
             elevation={4}
             sx={{
               p: 3,
               mb: 4,
               borderRadius: 3,
               background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(66, 165, 245, 0.02) 100%)',
               border: '1px solid rgba(25, 118, 210, 0.1)'
             }}
           >
             <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
               How It Works
             </Typography>
             <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
               <Box sx={{ textAlign: 'center', maxWidth: 120 }}>
                 <DevicesOutlined sx={{ 
                   fontSize: 40, 
                   color: 'primary.main', 
                   mb: 1,
                   animation: 'bounce 2s infinite 0.2s'
                 }} />
                 <Typography variant="body2" color="text.secondary">
                   Device Detection
                 </Typography>
               </Box>
               <Box sx={{ textAlign: 'center', maxWidth: 120 }}>
                 <SecurityOutlined sx={{ 
                   fontSize: 40, 
                   color: 'warning.main', 
                   mb: 1,
                   animation: 'bounce 2s infinite 0.4s'
                 }} />
                 <Typography variant="body2" color="text.secondary">
                   Biometric Scan
                 </Typography>
               </Box>
               <Box sx={{ textAlign: 'center', maxWidth: 120 }}>
                 <CheckCircleOutlined sx={{ 
                   fontSize: 40, 
                   color: 'success.main', 
                   mb: 1,
                   animation: 'bounce 2s infinite 0.6s'
                 }} />
                 <Typography variant="body2" color="text.secondary">
                   Registration Complete
                 </Typography>
               </Box>
             </Box>
           </Paper>
         </Slide>

        
         <Slide direction="up" in timeout={1200}>
           <Paper 
             elevation={12}
             sx={{
               p: 6,
               borderRadius: 4,
               background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
               backdropFilter: 'blur(10px)',
               border: '1px solid rgba(25, 118, 210, 0.1)',
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
                 background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
                 opacity: 0,
                 transition: 'opacity 0.3s ease-in-out'
               }
             }}
           >
             <Box sx={{ position: 'relative', zIndex: 1 }}>
               
               <Box sx={{ 
                 display: 'flex', 
                 justifyContent: 'center', 
                 gap: 4, 
                 mb: 4 
               }}>
                 <Box sx={{ textAlign: 'center' }}>
                   <VerifiedUserOutlined sx={{ 
                     fontSize: 36, 
                     color: 'success.main', 
                     mb: 1,
                     animation: 'wiggle 2s infinite 0.2s'
                   }} />
                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                     Secure Storage
                   </Typography>
                 </Box>
                 <Box sx={{ textAlign: 'center' }}>
                   <KeyOutlined sx={{ 
                     fontSize: 36, 
                     color: 'warning.main', 
                     mb: 1,
                     animation: 'wiggle 2s infinite 0.4s'
                   }} />
                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                     Hardware Protected
                   </Typography>
                 </Box>
                 <Box sx={{ textAlign: 'center' }}>
                   <FingerprintOutlined sx={{ 
                     fontSize: 36, 
                     color: 'info.main', 
                     mb: 1,
                     animation: 'wiggle 2s infinite 0.6s'
                   }} />
                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                     Biometric Auth
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
                 Create Your Secure Passkey
               </Typography>
               
               <Button 
                 variant="contained" 
                 onClick={handlePasskeyRegister}
                 disabled={isLoading}
                 size="large"
                 startIcon={
                   isLoading ? (
                     <CircularProgress size={20} color="inherit" />
                   ) : (
                     <PersonAddOutlined />
                   )
                 }
                 sx={{
                   py: 2.5,
                   px: 5,
                   borderRadius: 3,
                   textTransform: 'none',
                   fontSize: '1.2rem',
                   fontWeight: 700,
                   background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                   boxShadow: '0 6px 25px rgba(25, 118, 210, 0.4)',
                   transition: 'all 0.3s ease-in-out',
                   position: 'relative',
                   overflow: 'hidden',
                   '&:hover': {
                     transform: 'translateY(-3px)',
                     boxShadow: '0 10px 35px rgba(25, 118, 210, 0.5)',
                     background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                   },
                   '&:disabled': {
                     background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
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
                 {isLoading ? 'Registering Passkey...' : 'Register Passkey'}
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
                 Follow your device's prompts to complete biometric registration
               </Typography>
             </Box>
           </Paper>
         </Slide>

         
         <Fade in timeout={1600}>
           <Box sx={{ mt: 4, p: 3, backgroundColor: 'rgba(76, 175, 80, 0.05)', borderRadius: 2 }}>
             <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
               💡 Your passkey will be securely stored on your device and protected by your biometric data
             </Typography>
           </Box>
         </Fade>
       </Box>
     </Fade>

     
     <style jsx>{`
       @keyframes registerFloat {
         0%, 100% { transform: translateY(0px) scale(1); }
         50% { transform: translateY(-10px) scale(1.05); }
       }
       
       @keyframes pulse {
         0% { opacity: 1; transform: scale(1); }
         50% { opacity: 0.8; transform: scale(1.08); }
         100% { opacity: 1; transform: scale(1); }
       }
       
       @keyframes spin {
         0% { transform: rotate(0deg); }
         100% { transform: rotate(360deg); }
       }
       
       @keyframes bounce {
         0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
         40% { transform: translateY(-8px); }
         60% { transform: translateY(-4px); }
       }
       
       @keyframes wiggle {
         0%, 100% { transform: rotate(0deg); }
         25% { transform: rotate(-5deg); }
         75% { transform: rotate(5deg); }
       }
     `}</style>
   </Container>
 );
};

export default RegisterPasskey;