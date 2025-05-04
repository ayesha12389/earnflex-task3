// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar'; // Import Sidebar component
import EmployeeTable from './components/EmployeeTable'; // Import EmployeeTable component

function App() {
  return (
    <Router>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area, adjusted for sidebar */}
        <div className="container-fluid" style={{ marginLeft: '70px' }}>
          {/* This div will hold the employee table or any other content */}
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/employees" element={<EmployeeTable />} />
            <Route path="/settings" element={<div>Settings</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
