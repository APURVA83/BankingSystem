import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaExchangeAlt } from 'react-icons/fa'; // Importing an exchange icon from react-icons
import './styles.css'

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#"><span class="text-warning">Banking</span>System</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
         
          
        </ul>
      </div>
    </div>
  </nav>

      {/* Customer Table */}
      <div className='container mt-5'>
        <h6>Customers Table</h6>
        <div className='table-responsive'>
          <table className='table table-striped table-bordered'>
            <thead className='thead-dark'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Place</th>
                <th>Account Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email_id}</td>
                  <td>{user.place}</td>
                  <td>${user.account_balance}</td>
                  <td>
                    <Link to={`/read/${user.id}`} className="btn btn-success btn-sm">
                      <FaExchangeAlt /> Transfer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
