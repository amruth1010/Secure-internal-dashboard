import React, { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Paper, 
  Box,
  Fade,
  Slide,
  useTheme
} from "@mui/material";
import AddContactForm from "./AddContactForm";
import ContactList from "./ContactList";
import {
  PersonAddOutlined,
  GroupOutlined,
  ManageAccountsOutlined
} from "@mui/icons-material";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem("access");
  const theme = useTheme();

  
  const fetchContacts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/contacts/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 12, pt: 2 }}>
      <Fade in timeout={800}>
        <Box>
          {/* Header Section */}
          <Slide direction="down" in timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  letterSpacing: '-0.02em'
                }}
              >
                Contact Management
              </Typography>
              
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  maxWidth: 500,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 400
                }}
              >
                Organize and manage your contacts with ease
              </Typography>

              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 4, 
                mt: 3 
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main',
                    animation: 'countUp 2s ease-out'
                  }}>
                    {contacts.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Total Contacts
                  </Typography>
                </Box>
                <Box sx={{ 
                  width: 2, 
                  backgroundColor: 'divider',
                  borderRadius: 1
                }} />
                <Box sx={{ textAlign: 'center' }}>
                  <ManageAccountsOutlined sx={{ 
                    fontSize: 32, 
                    color: 'success.main',
                    animation: 'pulse 2s infinite'
                  }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mt: 0.5 }}>
                    Easy Management
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Slide>

          
          <Slide direction="up" in timeout={1200}>
            <Paper 
              sx={{ 
                p: 4, 
                mb: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(25, 118, 210, 0.1)',
                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(25, 118, 210, 0.2)',
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
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.08) 0%, rgba(156, 39, 176, 0.08) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out'
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3 
                }}>
                  <PersonAddOutlined sx={{ 
                    mr: 2, 
                    color: 'primary.main', 
                    fontSize: 32,
                    animation: 'wiggle 2s infinite'
                  }} />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'text.primary'
                    }}
                  >
                    Add New Contact
                  </Typography>
                </Box>
                <AddContactForm onContactAdded={fetchContacts} />
              </Box>
            </Paper>
          </Slide>

          
          <Slide direction="up" in timeout={1400}>
            <Paper
              sx={{
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(233, 30, 99, 0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(156, 39, 176, 0.1)',
                boxShadow: '0 8px 32px rgba(156, 39, 176, 0.15)',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(156, 39, 176, 0.2)'
                }
              }}
            >
              <Box sx={{ 
                p: 3,
                borderBottom: '1px solid rgba(156, 39, 176, 0.1)',
                background: 'linear-gradient(90deg, rgba(156, 39, 176, 0.08) 0%, rgba(233, 30, 99, 0.08) 100%)'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <GroupOutlined sx={{ 
                      mr: 2, 
                      color: 'secondary.main', 
                      fontSize: 32,
                      animation: 'rotate 4s linear infinite'
                    }} />
                    <Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          color: 'text.primary',
                          mb: 0.5
                        }}
                      >
                        Your Contacts
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                      >
                        {contacts.length === 0 
                          ? 'No contacts yet' 
                          : `${contacts.length} contact${contacts.length !== 1 ? 's' : ''} available`
                        }
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ p: 0 }}>
                <ContactList contacts={contacts} onContactsChanged={fetchContacts} />
              </Box>
            </Paper>
          </Slide>
        </Box>
      </Fade>

      
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes countUp {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

export default ContactTable;