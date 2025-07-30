import React from "react";
import { TextField, IconButton } from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";

const EditContactForm = ({ editedContact, onChange, onSave, onCancel }) => {
  return (
    <>
      <TextField name="name" value={editedContact.name} onChange={onChange} />
      <TextField name="phone" value={editedContact.phone} onChange={onChange} />
      <TextField name="email" value={editedContact.email} onChange={onChange} />
      <TextField name="notes" value={editedContact.notes} onChange={onChange} />
      <IconButton onClick={onSave}><Save /></IconButton>
      <IconButton onClick={onCancel}><Cancel /></IconButton>
    </>
  );
};

export default EditContactForm;
