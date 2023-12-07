import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  /**
	useEffect(() => {
		const getUser = async() => {
			const res = await axios.get('http://localhost:3000/api/users/user', {
				withCredentials: true,
			});
			setUser(res.data);
		}
	}, [])**/

  return (
    <div className="bg-lime-500 max-h-full flex flex-col justify-center items-center">
	    <div className="flex flex-col justify-center text-center mt-3 rounded-md bg-slate-50 w-1/3 mb-20">
        <h1 className="mb-2">Username: {currentUser.username}</h1>
        <p className="mb-2">Email: {currentUser.email}</p>
        <p className="mb-2">Full Name: {currentUser.full_name}</p>
        <p className="mb-2">Average Rating: {currentUser.average_rating}</p>
        <p className="text-xs">
          Joined {moment(currentUser.created, 'YYYY-MM-DD HH:mm:ss').fromNow()}
        </p>
      </div>
      <button className="p-1 rounded-full flex justify-center items-center">
	      <Link to="/dashboard"><ArrowBackIcon /> Back to Dashboard</Link>
      </button>
    </div>
  );
};

export default Profile;
