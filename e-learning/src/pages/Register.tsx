import { useState } from 'react';
import axios from 'axios'
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [err, setErr] = useState<string|null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err:unknown) {
	    if (axios.isAxiosError(err)) setErr(err.response?.data || 'An error occurred');
	    else setErr('An error occurred')
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    average_rating: 0,
    updated: new Date().toISOString().substring(0, 10),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-400">
      <div className="flex items-center justify-center rounded-md w-3/4 h-[27rem]">
        <div className="basis-4/6 bg-purple-500 flex flex-col items-center justify-center h-full">
          <h1 className="text-xl my-4 font-semibold"> Welcome to Academyis </h1>
          <p className="mt-3 px-4">
            {' '}
            This is a user friendly and functional app that helps bring you
            closer to your career goals
          </p>
          <p className="mt-3 px-4 text-sm">
            {' '}
            Looking for an e-learning platform? Yes you
          </p>
          <Link to="/login">
            <button className="p-2 mt-8 rounded-md bg-[#ffc75b] w-60 items-center shadow-lg outline-none">
              {' '}
              Sign In{' '}
            </button>
          </Link>
        </div>
        <div className="basis-4/6 bg-indigo-500 flex flex-col justify-center items-center h-full">
          <h1 className="text-xl mb-4 font-semibold"> Register </h1>
          <form action="" onSubmit={handleSubmit}>
            <fieldset>
              <label>
                <p>Full Name:</p>
                <input
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  type="text"
                  name="full_name"
                  onChange={handleChange}
                  value={formData.full_name || ''}
                  placeholder="John Doe"
                  required
                />
              </label>
              <label>
                <p>Email:</p>
                <input
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email || ''}
                  placeholder="abcdef@abcde.com"
                  required
                />
              </label>
              <label>
                <p>Username:</p>
                <input
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={formData.username || ''}
                  placeholder="Indigothey12"
                  required
                />{' '}
              </label>
              <label>
                <p>Password:</p>
                <input
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password || ''}
                  placeholder="Enter password"
                  required
                />
              </label>
            </fieldset>
            {err && <p className="text-red-700 hover:text-red-500">{err}</p>}
            <button
              type="submit"
              className="p-2 mt-4 rounded-md bg-[#df6690] w-60 items-center shadow-lg outline-none"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
