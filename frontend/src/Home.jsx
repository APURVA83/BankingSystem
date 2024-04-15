import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaExchangeAlt } from 'react-icons/fa'; // Importing an exchange icon from react-icons

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>Customers Table</h2>
      <table className='table table-hover'>
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
              <td>{user.account_balance}</td>
              <td>
                <Link to={`/read/${user.id}`}>
                  <button className="btn btn-sm btn-success">
                    <FaExchangeAlt /> Transfer
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
