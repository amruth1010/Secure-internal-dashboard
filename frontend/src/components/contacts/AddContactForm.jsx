import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddContactForm = ({ onContactAdded }) => {
  const [newContact, setNewContact] = useState({ name: "", phone: "", email: "", notes: "" });
  const token = localStorage.getItem("access");

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!newContact.name || !newContact.phone || !newContact.email) {
      alert("Please fill all required fields");
      return;
    }
    try {
      await fetch("http://127.0.0.1:8000/api/contacts/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
      });
      setNewContact({ name: "", phone: "", email: "", notes: "" });
      onContactAdded();
    } catch (error) {
      console.error("Create failed:", error);
    }
  };

  return (
    <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
      <TextField label="Name" name="name" value={newContact.name} onChange={handleChange} fullWidth />
      <TextField label="Phone" name="phone" value={newContact.phone} onChange={handleChange} fullWidth />
      <TextField label="Email" name="email" value={newContact.email} onChange={handleChange} fullWidth />
      <TextField label="Notes" name="notes" value={newContact.notes} onChange={handleChange} fullWidth />
      <Button variant="contained" color="primary" onClick={handleCreate} startIcon={<Add />}>
        Add
      </Button>
    </Stack>
  );
};

export default AddContactForm;
