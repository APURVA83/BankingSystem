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
    <section className="p-4 p-md-5" style={{backgroundColor: 'white'}}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-5">
          <div className="card rounded-3">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h3>Transfer</h3>
                <h6>Payment</h6>
              </div>
              <form onSubmit={handleSubmit}>
                <p className="fw-bold mb-4 pb-2">Sender:</p>

                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                  <div className="flex-fill mx-3">
                    <div className="form-outline">
                      <input type="text" className="form-control form-control-lg" value={DataTwo.length > 0 ? DataTwo[0].username : 'User'} disabled />
              
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="">Balance:</label>
                  <p>{DataTwo.length > 0 ? DataTwo[0].account_balance : 'Balance'}</p>
                </div>

                <p className="fw-bold mb-4">Receiver:</p>

                <div className="mb-2">
                  <select onChange={handleRoleChange} value={selectedRole} className="form-select form-select-lg">
                    <option value="">Select</option>
                    {filteredDataOne.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="">Amount:</label>
                  <input type="number" value={amount} onChange={handleAmountChange} className="form-control form-control-lg" />
                </div>

                <button type="submit" className="btn btn-success btn-lg btn-block">Transfer</button>
              </form>
              {transferSuccess && (
                <p className="mt-3 text-success">
                  Transfer successful! Updated Balance: {DataTwo[0]?.account_balance - amount}
                </p>
              )}
              <Link to="/" className="btn btn-primary btn-lg btn-block mt-3">Go Back Home</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transfer;
