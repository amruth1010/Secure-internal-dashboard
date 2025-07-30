import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

import Home from './components/Home';
import RegisterPasskey from './components/RegisterPasskey';
import LoginPasskey from './components/LoginPasskey';
import ContactTable from "./components/contacts/ContactTable";
import WebDialer from './components/webDialer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPasskey />} />
          <Route path="/login" element={<LoginPasskey />} />
          <Route path="/contacts" element={<ContactTable />} />
          <Route path="/web-dialer" element={<WebDialer />}/>
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
