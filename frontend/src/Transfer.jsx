import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Transfer() {
  const [DataOne, setAllUserData] = useState([]);
  const [DataTwo, setSingleUserData] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [amount, setAmount] = useState(0);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setAllUserData(response.data);
      } catch (error) {
        console.error('Error fetching data1:', error);
      }
    };

    const fetchSingleUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/read/' + id);
        setSingleUserData(response.data);
      } catch (error) {
        console.error('Error fetching data2:', error);
      }
    };

    fetchAllUsers();
    fetchSingleUser();
  }, [id]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/transfers', {
        sender_id: DataTwo[0]?.id,
        receiver_id: selectedRole, // Assuming selectedRole is the receiver's ID
        amount: amount,
      });
      console.log('Transfer response:', response.data);
      setTransferSuccess(true);
      // Update balance for sender (DataTwo[0].account_balance -= amount)
    } catch (error) {
      console.error('Error transferring funds:', error);
    }
  };

  const filteredDataOne = DataOne.filter((user) => user.id !== DataTwo[0]?.id);

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Make Transfers</h2>
          <div className='mb-2'>
            <label htmlFor="">{DataTwo.length > 0 ? DataTwo[0].username : 'User'}</label>
          </div>
          <div className='mb-2'>
            <label htmlFor="">Balance</label>
            <p>{DataTwo.length > 0 ? DataTwo[0].account_balance : 'Balance'}</p>
          </div>
          <div className='mb-2'>
            <label htmlFor="">Choose the User</label>
            <select onChange={handleRoleChange} value={selectedRole}>
              <option value="">Select</option>
              {filteredDataOne.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-2'>
            <label htmlFor="">Enter Amount</label>
            <input type="number" value={amount} onChange={handleAmountChange} />
          </div>
          <button type="submit">Transfer</button>
        </form>
        {transferSuccess && (
          <p>
            Transfer successful! Updated Balance: {DataTwo[0]?.account_balance - amount}
          </p>
        )}
        <Link to="/">Go Back Home</Link>
      </div>
    </div>
  );
}

export default Transfer;
