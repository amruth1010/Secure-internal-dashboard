import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from "@mui/material";
import { Delete, Edit, FileDownload } from "@mui/icons-material";
import EditContactForm from "./EditContactForm";

const ContactList = ({ contacts, onContactsChanged }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedContact, setEditedContact] = useState({});
  const token = localStorage.getItem("access");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/contacts/delete/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      onContactsChanged();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setEditedContact(contact);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContact({});
  };

  const handleSave = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/contacts/${editingId}/update/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedContact)
      });
      setEditingId(null);
      setEditedContact({});
      onContactsChanged();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleChange = (e) => {
    setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
  };

 
  const handleExport = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/export-contacts/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to export contacts");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "contacts.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleExport}
        startIcon={<FileDownload />}
        style={{ marginBottom: 10 }}
      >
        Export CSV
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              {editingId === contact.id ? (
                <TableCell colSpan={5}>
                  <EditContactForm
                    editedContact={editedContact}
                    onChange={handleChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                </TableCell>
              ) : (
                <>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.notes}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(contact)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(contact.id)}><Delete /></IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ContactList;
