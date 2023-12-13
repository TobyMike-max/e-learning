import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [resp, setRes] = useState('');
  const [err, setErr] = useState<string|null>(null);

  const handlePasswordReset = async () => {
    try {
      const res = await axios.post(
	      'https://academyis.onrender.com/api/auth/reset_password',
        { password },
        {
          withCredentials: true,
        },
      );
      setRes(res.data.message)
      setTimeout(() => {
	      navigate('/login');
      }, 3000)
    } catch (err:unknown) {
	    if (axios.isAxiosError(err)) setErr(err.response?.data || 'An error occurred');
	    else setErr('An error occurred')
    }
  };

  return (
  <div className="flex flex-col justify-center w-2/4">
	<h2>Password Reset</h2>
	{resp}
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
