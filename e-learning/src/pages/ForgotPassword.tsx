import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState([]);
  const [err, setErr] = useState<string|null>(null);

  const handleForgotPasswordRequest = async () => {
    try {
      const res = await axios.post(
	      'https://academyis.onrender.com/api/auth/forgot_password',
        { email },
        {
          withCredentials: true,
        },
      );
      setResponse(res.data);
    } catch (err: unknown) {
	    if (axios.isAxiosError(err)) setErr(err.response?.data || 'An error occurred');
	    else setErr('An error occurred')
    }
  };

  return (
    <div className="flex flex-col justify-center w-2/4">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPasswordRequest}>Request Reset</button>
      {response}
      {err && <p className="text-red-700 hover:text-red-500">{err}</p>}
    </div>
  );
};

export default ForgotPassword;
