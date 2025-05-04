import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchEmployees } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phoneNumber: '',
    latitude: '', longitude: '', employeeID: '', city: '',
    country: '', activationCode: ''
  });

  const rowsPerPage = 10;

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await fetchEmployees();
    setEmployees(data || []);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filtered = employees.filter(emp =>
    emp.firstName?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = filtered.sort((a, b) => {
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const paginated = sorted.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(sorted.length / rowsPerPage);

  const renderSortIcon = (key) => {
    if (sortKey !== key) return null;
    return sortOrder === 'asc' ? ' 🔼' : ' 🔽';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api.findofficers.com/hiring_test/add_employee', formData);
      alert('Employee added!');
      setShowModal(false);
      setFormData({
        firstName: '', lastName: '', email: '', phoneNumber: '',
        latitude: '', longitude: '', employeeID: '', city: '',
        country: '', activationCode: ''
      });
      loadEmployees();
    } catch (error) {
      console.error(error);
      alert('Failed to add employee.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary">Workers</h3>
        <div className="d-flex gap-2">
          <input
            className="form-control"
            placeholder="Search by first name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="table-responsive">
        <table className="table table-hover bg-white rounded shadow-sm">
          <thead className="table-light">
            <tr>
              <th onClick={() => handleSort('firstName')} style={{ cursor: 'pointer' }}>
                Name {renderSortIcon('firstName')}
              </th>
              <th onClick={() => handleSort('lastName')} style={{ cursor: 'pointer' }}>
                Last Name {renderSortIcon('lastName')}
              </th>
              <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                Email {renderSortIcon('email')}
              </th>
              <th onClick={() => handleSort('city')} style={{ cursor: 'pointer' }}>
                City {renderSortIcon('city')}
              </th>
              <th onClick={() => handleSort('country')} style={{ cursor: 'pointer' }}>
                Country {renderSortIcon('country')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((emp, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=random`}
                        alt="avatar"
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <p className="fw-bold mb-0">{emp.firstName}</p>
                    </div>
                  </td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td><span className="badge bg-info text-dark">{emp.city}</span></td>
                  <td><span className="badge bg-secondary">{emp.country}</span></td>
                  <td><button className="btn btn-outline-primary btn-sm">View</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="fw-bold">Page {currentPage} of {totalPages || 1}</span>
        <div>
          <button className="btn btn-sm btn-outline-secondary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >Prev</button>
          <button className="btn btn-sm btn-outline-secondary"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >Next</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {Object.keys(formData).map((key) => (
                      <div className="col-md-4 mb-3" key={key}>
                        <input
                          type="text"
                          className="form-control"
                          name={key}
                          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                          value={formData[key]}
                          onChange={handleChange}
                          required={key !== 'activationCode'}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
