import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [err, setErr] = useState<string|null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err:unknown) {
	    if (axios.isAxiosError(err)) setErr(err.response?.data || 'An error occurred');
	    else setErr('An error occurred')
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#df6690]">
      <div className="flex items-center justify-center w-4/5 h-80">
        <div className="basis-4/6 bg-[#ffc75b] flex flex-col justify-center items-center h-full">
          <h1 className="text-xl mb-4 font-semibold"> Login </h1>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                <p>Username:</p>
                <input
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={formData.username || ''}
                  placeholder="jonnyonions2"
                  required
                />
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
              Sign In
            </button>
          </form>
          <Link to="/forgot_password">
            <p className="text-[red] italic pt-1 text-sm">Forgot Password</p>
          </Link>
        </div>
        <div className="basis-4/6 bg-[lightgray] flex flex-col items-center justify-center h-full">
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
          <Link to="/register">
            <button className="p-2 mt-8 rounded-md bg-[#ffc75b] w-60 items-center shadow-lg outline-none">
              {' '}
              Sign Up{' '}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
