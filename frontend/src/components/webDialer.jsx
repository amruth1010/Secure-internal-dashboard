import React, { useState, useEffect } from "react";
import {
 Container,
 Typography,
 TextField,
 Grid,
 Button,
 Paper,
 Box,
 Table,
 TableHead,
 TableRow,
 TableCell,
 TableBody,
 Fade,
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 Slide,
 Avatar,
 Chip,
 IconButton,
 useTheme
} from "@mui/material";
import { 
 Phone, 
 PhoneDisabled, 
 Call, 
 CallEnd, 
 PhoneInTalk,
 ContactPhone,
 History,
 Dialpad,
 VolumeUp,
 Backspace,
 PersonOutlined
} from "@mui/icons-material";

const WebDialer = () => {
 const [phoneNumber, setPhoneNumber] = useState("");
 const [callLogs, setCallLogs] = useState([]);
 const [callStatus, setCallStatus] = useState("");
 const [incomingCall, setIncomingCall] = useState(null); 
 const token = localStorage.getItem("access");
 const theme = useTheme();

 
 const fetchCallLogs = async () => {
   try {
     const res = await fetch("http://127.0.0.1:8000/api/call-logs/", {
       headers: { Authorization: `Bearer ${token}` }
     });
     if (res.ok) {
       const data = await res.json();
       setCallLogs(Array.isArray(data) ? data : []);
     }
   } catch (error) {
     console.error("Error fetching call logs:", error);
   }
 };


 useEffect(() => {
   const simulateIncoming = setTimeout(() => {
     setIncomingCall({
       from: "+1234567890",
       message: "Incoming call from John Doe"
     });
   }, 5000); // Simulate after 5 sec
   return () => clearTimeout(simulateIncoming);
 }, []);

 
 const handleCall = async () => {
   if (!phoneNumber) {
     alert("Please enter a phone number");
     return;
   }

   setCallStatus("📞 Calling...");
   try {
     const res = await fetch("http://127.0.0.1:8000/api/make-call/", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       },
       body: JSON.stringify({ to: phoneNumber })
     });

     const data = await res.json();
     if (res.ok) {
       setCallStatus("🔔 Ringing...");
       setTimeout(() => setCallStatus("✅ Connected"), 2000);
       setTimeout(() => {
         setCallStatus("❌ Call Ended");
         fetchCallLogs();
       }, 5000);
     } else {
       setCallStatus("❌ " + data.error);
     }
   } catch (error) {
     setCallStatus("❌ Failed to connect");
   }
 };

 
 const handleHangup = () => {
   setCallStatus("📴 Call Ended");
   setPhoneNumber("");
   fetchCallLogs();
 };

 
 const handleAcceptCall = () => {
   setCallStatus(`✅ In Call with ${incomingCall.from}`);
   setIncomingCall(null);
 };

 
 const handleDeclineCall = () => {
   setCallStatus("❌ Call Declined");
   setIncomingCall(null);
 };


 const handleKeypadClick = (value) => {
   setPhoneNumber((prev) => prev + value);
 };

 
 const handleBackspace = () => {
   setPhoneNumber((prev) => prev.slice(0, -1));
 };

 useEffect(() => {
   fetchCallLogs();
 }, []);

 const keypadNumbers = [
   { num: "1", letters: "" },
   { num: "2", letters: "ABC" },
   { num: "3", letters: "DEF" },
   { num: "4", letters: "GHI" },
   { num: "5", letters: "JKL" },
   { num: "6", letters: "MNO" },
   { num: "7", letters: "PQRS" },
   { num: "8", letters: "TUV" },
   { num: "9", letters: "WXYZ" },
   { num: "*", letters: "" },
   { num: "0", letters: "+" },
   { num: "#", letters: "" }
 ];

 return (
   <Container maxWidth="sm" sx={{ mt: 5 }}>
     <Fade in timeout={800}>
       <Box>
         
         <Slide direction="down" in timeout={1000}>
           <Box sx={{ textAlign: 'center', mb: 4 }}>
             <Box sx={{ 
               display: 'inline-flex', 
               alignItems: 'center', 
               justifyContent: 'center',
               mb: 2
             }}>
               <PhoneInTalk 
                 sx={{ 
                   fontSize: 48, 
                   color: 'primary.main',
                   mr: 2,
                   animation: 'phoneRing 2s infinite'
                 }} 
               />
               <ContactPhone 
                 sx={{ 
                   fontSize: 40, 
                   color: 'secondary.main',
                   animation: 'bounce 2s infinite 0.5s'
                 }} 
               />
             </Box>
             <Typography 
               variant="h3" 
               component="h1"
               sx={{
                 fontWeight: 700,
                 background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 letterSpacing: '-0.02em'
               }}
             >
               WebDialer
             </Typography>
           </Box>
         </Slide>

         
         <Slide direction="up" in timeout={1200}>
           <Paper 
             sx={{ 
               p: 4, 
               borderRadius: 4, 
               background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
               backdropFilter: 'blur(10px)',
               border: '1px solid rgba(25, 118, 210, 0.1)',
               boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)',
               transition: 'all 0.3s ease-in-out',
               '&:hover': {
                 transform: 'translateY(-4px)',
                 boxShadow: '0 12px 40px rgba(25, 118, 210, 0.2)'
               }
             }}
           >
             
             {callStatus && (
               <Fade in={true}>
                 <Box sx={{ 
                   textAlign: 'center', 
                   mb: 3,
                   p: 2,
                   borderRadius: 2,
                   backgroundColor: 'rgba(25, 118, 210, 0.1)',
                   border: '1px solid rgba(25, 118, 210, 0.2)'
                 }}>
                   <Chip 
                     label={callStatus}
                     sx={{
                       fontSize: '1.1rem',
                       fontWeight: 600,
                       py: 1,
                       px: 2,
                       background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                       color: 'white',
                       animation: callStatus.includes('Calling') || callStatus.includes('Ringing') 
                         ? 'pulse 1s infinite' : 'none'
                     }}
                     icon={<VolumeUp />}
                   />
                 </Box>
               </Fade>
             )}

             
             <Box sx={{ mb: 3, position: 'relative' }}>
               <TextField
                 fullWidth
                 variant="outlined"
                 placeholder="Enter phone number"
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     fontSize: '1.5rem',
                     fontWeight: 600,
                     textAlign: 'center',
                     borderRadius: 3,
                     backgroundColor: 'rgba(255, 255, 255, 0.8)',
                     transition: 'all 0.3s ease-in-out',
                     '&:hover': {
                       backgroundColor: 'rgba(255, 255, 255, 0.9)',
                       transform: 'scale(1.02)'
                     }
                   }
                 }}
                 InputProps={{
                   endAdornment: phoneNumber && (
                     <IconButton 
                       onClick={handleBackspace}
                       sx={{ 
                         color: 'text.secondary',
                         '&:hover': { 
                           color: 'error.main',
                           transform: 'scale(1.1)'
                         }
                       }}
                     >
                       <Backspace />
                     </IconButton>
                   )
                 }}
               />
             </Box>

             
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
               <Dialpad sx={{ mr: 1, color: 'text.secondary' }} />
               <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                 Keypad
               </Typography>
             </Box>

             
             <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
               {keypadNumbers.map((item, index) => (
                 <Grid item xs={4} key={item.num}>
                   <Fade in={true} timeout={500 + index * 50}>
                     <Button
                       variant="contained"
                       fullWidth
                       sx={{
                         py: 2,
                         minHeight: 70,
                         borderRadius: 3,
                         background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                         color: 'text.primary',
                         boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                         border: '1px solid rgba(25, 118, 210, 0.1)',
                         transition: 'all 0.2s ease-in-out',
                         '&:hover': { 
                           background: 'linear-gradient(145deg, #1976d2 0%, #42a5f5 100%)',
                           color: 'white',
                           transform: 'scale(1.05)',
                           boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)'
                         },
                         '&:active': {
                           transform: 'scale(0.95)'
                         }
                       }}
                       onClick={() => handleKeypadClick(item.num)}
                     >
                       <Box sx={{ textAlign: 'center' }}>
                         <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }}>
                           {item.num}
                         </Typography>
                         {item.letters && (
                           <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.7rem' }}>
                             {item.letters}
                           </Typography>
                         )}
                       </Box>
                     </Button>
                   </Fade>
                 </Grid>
               ))}
             </Grid>

             
             <Box display="flex" justifyContent="center" gap={3}>
               <Button
                 variant="contained"
                 size="large"
                 startIcon={<Phone />}
                 onClick={handleCall}
                 sx={{
                   py: 1.5,
                   px: 4,
                   borderRadius: 3,
                   background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                   boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                   fontSize: '1.1rem',
                   fontWeight: 600,
                   transition: 'all 0.3s ease-in-out',
                   '&:hover': {
                     background: 'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
                     transform: 'translateY(-2px)',
                     boxShadow: '0 6px 25px rgba(76, 175, 80, 0.4)'
                   }
                 }}
               >
                 Call
               </Button>
               <Button
                 variant="contained"
                 size="large"
                 startIcon={<PhoneDisabled />}
                 onClick={handleHangup}
                 sx={{
                   py: 1.5,
                   px: 4,
                   borderRadius: 3,
                   background: 'linear-gradient(45deg, #f44336 30%, #ef5350 90%)',
                   boxShadow: '0 4px 20px rgba(244, 67, 54, 0.3)',
                   fontSize: '1.1rem',
                   fontWeight: 600,
                   transition: 'all 0.3s ease-in-out',
                   '&:hover': {
                     background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
                     transform: 'translateY(-2px)',
                     boxShadow: '0 6px 25px rgba(244, 67, 54, 0.4)'
                   }
                 }}
               >
                 Hangup
               </Button>
             </Box>
           </Paper>
         </Slide>

         
         <Slide direction="up" in timeout={1400}>
           <Paper 
             sx={{ 
               p: 3, 
               mt: 4, 
               borderRadius: 4, 
               background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
               backdropFilter: 'blur(10px)',
               border: '1px solid rgba(103, 58, 183, 0.1)',
               boxShadow: '0 8px 32px rgba(103, 58, 183, 0.15)',
               transition: 'all 0.3s ease-in-out',
               '&:hover': {
                 transform: 'translateY(-2px)',
                 boxShadow: '0 12px 40px rgba(103, 58, 183, 0.2)'
               }
             }}
           >
             <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
               <History sx={{ mr: 2, color: 'secondary.main', fontSize: 28 }} />
               <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                 Recent Calls
               </Typography>
             </Box>
             
             <Box sx={{ 
               borderRadius: 2, 
               overflow: 'hidden',
               backgroundColor: 'rgba(255, 255, 255, 0.8)'
             }}>
               <Table>
                 <TableHead>
                   <TableRow sx={{ backgroundColor: 'rgba(103, 58, 183, 0.1)' }}>
                     <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>To</TableCell>
                     <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Status</TableCell>
                     <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Duration</TableCell>
                     <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>Time</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {callLogs.length > 0 ? (
                     callLogs.map((log, index) => (
                       <Fade in timeout={200 + index * 100} key={log.id}>
                         <TableRow 
                           sx={{ 
                             '&:hover': { 
                               backgroundColor: 'rgba(103, 58, 183, 0.05)',
                               transform: 'scale(1.01)'
                             },
                             transition: 'all 0.2s ease-in-out'
                           }}
                         >
                           <TableCell>
                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
                               <Avatar sx={{ 
                                 mr: 2, 
                                 width: 32, 
                                 height: 32,
                                 backgroundColor: 'secondary.main'
                               }}>
                                 <PersonOutlined sx={{ fontSize: 18 }} />
                               </Avatar>
                               {log.to}
                             </Box>
                           </TableCell>
                           <TableCell>
                             <Chip 
                               label={log.status} 
                               size="small"
                               color={log.status === 'completed' ? 'success' : 'default'}
                               sx={{ fontWeight: 600 }}
                             />
                           </TableCell>
                           <TableCell sx={{ fontWeight: 500 }}>{log.duration || "N/A"}</TableCell>
                           <TableCell sx={{ color: 'text.secondary' }}>
                             {new Date(log.timestamp).toLocaleString()}
                           </TableCell>
                         </TableRow>
                       </Fade>
                     ))
                   ) : (
                     <TableRow>
                       <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                         <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                           <History sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                           <Typography variant="h6">No call logs found</Typography>
                           <Typography variant="body2">Your call history will appear here</Typography>
                         </Box>
                       </TableCell>
                     </TableRow>
                   )}
                 </TableBody>
               </Table>
             </Box>
           </Paper>
         </Slide>
       </Box>
     </Fade>

     
     <Dialog 
       open={!!incomingCall} 
       onClose={handleDeclineCall}
       PaperProps={{
         sx: {
           borderRadius: 4,
           background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%)',
           backdropFilter: 'blur(10px)',
           border: '2px solid rgba(76, 175, 80, 0.2)',
           minWidth: 350
         }
       }}
     >
       <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <Avatar 
             sx={{ 
               width: 80, 
               height: 80, 
               mb: 2,
               backgroundColor: 'success.main',
               animation: 'pulse 1.5s infinite'
             }}
           >
             <Phone sx={{ fontSize: 40 }} />
           </Avatar>
           <Typography variant="h5" sx={{ fontWeight: 700 }}>
             Incoming Call
           </Typography>
         </Box>
       </DialogTitle>
       <DialogContent sx={{ textAlign: 'center', py: 2 }}>
         <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
           {incomingCall?.from}
         </Typography>
         <Typography color="text.secondary">
           {incomingCall?.message}
         </Typography>
       </DialogContent>
       <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
         <Button 
           onClick={handleAcceptCall} 
           variant="contained"
           size="large"
           startIcon={<Call />}
           sx={{
             background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
             borderRadius: 3,
             px: 3,
             py: 1.5,
             '&:hover': {
               background: 'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
               transform: 'scale(1.05)'
             }
           }}
         >
           Accept
         </Button>
         <Button 
           onClick={handleDeclineCall} 
           variant="contained"
           size="large"
           startIcon={<CallEnd />}
           sx={{
             background: 'linear-gradient(45deg, #f44336 30%, #ef5350 90%)',
             borderRadius: 3,
             px: 3,
             py: 1.5,
             '&:hover': {
               background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
               transform: 'scale(1.05)'
             }
           }}
         >
           Decline
         </Button>
       </DialogActions>
     </Dialog>

    
     <style jsx>{`
       @keyframes phoneRing {
         0%, 100% { transform: rotate(0deg); }
         10% { transform: rotate(-10deg); }
         20% { transform: rotate(10deg); }
         30% { transform: rotate(-10deg); }
         40% { transform: rotate(10deg); }
         50% { transform: rotate(0deg); }
       }
       
       @keyframes bounce {
         0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
         40% { transform: translateY(-10px); }
         60% { transform: translateY(-5px); }
       }
       
       @keyframes pulse {
         0% { transform: scale(1); opacity: 1; }
         50% { transform: scale(1.05); opacity: 0.8; }
         100% { transform: scale(1); opacity: 1; }
       }
     `}</style>
   </Container>
 );
};

export default WebDialer;