import icon from '../assets/gravatar-icon.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import HamburgerIcon from './HamburgerIcon';
import SideNav from '../pages/SideNav';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

interface NavbarProps {
	name: string;
	authenticateUser: (value:boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ name, authenticateUser }) => {
  const navigate = useNavigate();

  const { toggleMenu, isMenuOpen } = useAuth();
  const [url, setUrl] = useState('');
  const [isArrowOpen, setArrow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        'https://doppelme-avatars.p.rapidapi.com/assets/1101/eye',
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
          },
        },
      );
      const res = await data.text();
      const resp = JSON.parse(res);
      const i = Math.floor(Math.random() * (14 - 0 + 1) + 1);
      setUrl(resp.asset_ids[i]?.thumbnailSrc);
    };
    fetchData();
  }, []);

  const handleClick = () => {
    setArrow((prev) => !prev);
  };

  const signout = async () => {
    try {
	    await axios.get('https://academyis.onrender.com/api/auth/logout', {
        withCredentials: true,
      });
      localStorage.removeItem('user');
      authenticateUser(false);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shadow-lg mb-4 sticky top-0 bg-[#d1cdcd] relative">
      {isMenuOpen && <SideNav display="true" />}
      <div className="flex flex-row justify-between items-center">
        <div className="flex justify-between basis-2/6">
          {!isMenuOpen && (
            <HamburgerIcon onClick={toggleMenu} isOpen={isMenuOpen} />
          )}
          <h1 className="text-xl font-semibold">{name}</h1>
        </div>
        <div className="flex justify-evenly basis-2/6">
          <Link to="/events">
            <div className="relative cursor-pointer">
              <span className="bg-[red] h-1 w-1 rounded-full absolute top-1 right-1"></span>
              <NotificationsNoneOutlinedIcon />
            </div>
          </Link>
          <img
            src={url ? url : icon}
            height={30}
            width={30}
            style={{ borderRadius: '50%', borderWidth: '1px' }}
          />
          <ExpandMoreOutlinedIcon
            onClick={handleClick}
            style={{ position: 'relative' }}
          />
          <div
            className={`bg-[#d1cdcd] absolute left-300 top-8 w-[65px] ${
              isArrowOpen ? 'block' : 'hidden'
            }`}
          >
            <p className="cursor-pointer">
              <Link to="/profile">Profile</Link>
            </p>
            <p className="cursor-pointer" onClick={signout}>
              SignOut
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
