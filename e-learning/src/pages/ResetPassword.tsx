import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [resp, setRes] = useState([]);
  const [err, setErr] = useState<string|null>(null);

  const handlePasswordReset = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/reset_password',
        { password },
        {
          withCredentials: true,
        },
      );
      setRes(res.data)
      if (resp.data) navigate('/login');
    } catch (err:unknown) {
	    if (axios.isAxiosError(err)) setErr(err.response?.data || 'An error occurred');
	    else setErr('An error occurred')
    }
  };


  return (
  <div className="flex flex-col justify-center w-2/4">
      {(resp.data) ? navigate('/login') : ''}
      <h2>Password Reset</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
      {err && <p className="text-red-700 hover:text-red-500">{err}</p>}
    </div>
  );
};

export default ResetPassword;
