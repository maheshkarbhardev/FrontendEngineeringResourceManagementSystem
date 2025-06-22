import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result=await dispatch(loginUser(formData));
    if(result.meta.requestStatus === 'fulfilled'){
      navigate('/dashboard')
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="mb-3">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>

        <Link to='/register'>
        <button className="btn btn-primary ms-3">New User</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
