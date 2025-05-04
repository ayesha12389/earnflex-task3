import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaHome, FaUsers, FaCog } from 'react-icons/fa'; // Import icons from react-icons

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3 vh-120" style={{ width: '250px' }}>
      <h4 className="text-center mb-4">Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/">
            <FaHome className="me-2" /> Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/employees">
            <FaUsers className="me-2" /> Employees
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/settings">
            <FaCog className="me-2" /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
