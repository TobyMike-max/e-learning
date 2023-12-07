import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState([]);
  const [err, setErr] = useState(null);

  const handleForgotPasswordRequest = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot_password',
        { email },
        {
          withCredentials: true,
        },
      );
      setResponse(response.data);
    } catch (err) {
      setErr(err.response.data);
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
      {/**response && console.log(response[0]) **/}
      {err && <p className="text-red-700 hover:text-red-500">{err}</p>}
    </div>
  );
};

export default ForgotPassword;
