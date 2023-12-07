import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [res, setRes] = useState();
  const [err, setErr] = useState(null);

  const handlePasswordReset = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/reset_password',
        { password },
        {
          withCredentials: true,
        },
      );
      if (res.data) navigate('/login');
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="flex flex-col justify-center w-2/4">
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
