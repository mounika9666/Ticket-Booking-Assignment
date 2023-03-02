import { useState } from 'react';

import "./AgentProfile.css"
import { useNavigate } from 'react-router-dom'
import UserRepository from '../utils/users'

export default function AgentProfile() {
  const history = useNavigate()
  const [address, setAddress] = useState('');

  const [date, setDate] = useState('');

  const handleChange = (e) => {
    setDate(e.target.value);
  };


  //States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const user = UserRepository.getLoggedInUser()

  //Handling the Address change
  const writeAddress = (e) => {
    setAddress(e.target.value);
    setSubmitted(false);
  };

  //Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (date === '' || address === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
    UserRepository.storeUser({...user, address: address, date: date })
    history('/bookingPage')
  };

  //Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User successfully registered!!</h1>
      </div>
    );
  };

  //Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="container-form">
        <h1 className='heading'>User Details</h1>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form className='formEl'>
        <div>
          <label className="label label1">Date: </label>
          <input onChange={handleChange} className="input"
            value={date} type="date" />
        </div>
        <div>
          <label className="label">Address :</label>
          <input onChange={writeAddress} className="input "
            value={address} type="address" />
        </div>
        <div className='buttonEle'>
          <button onClick={handleSubmit} className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

