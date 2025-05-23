import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access loading state from Redux store
  const loading = useSelector((state) => state.auth.loading);

  const handleLogin = async () => {
    setError("");
    const user = {
      email,
      password,
    };
    try {
      await dispatch(login(user)).unwrap();
      navigate('/'); // Redirect to a dashboard or home page after successful login
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>
          Login
          <button onClick={() => navigate('/signup')} className="switch-btn">Signup</button>
        </h1>
        {error && <div className="error-message">{error}</div>}
        
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        
        <button onClick={handleLogin} className="submit-button">
          Login
        </button>
        {loading && <Loading />}
      </div>
    </div>
  );
}
