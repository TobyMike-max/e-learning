import icon from '../assets/gravatar-icon.jpg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

interface NavbarProps {
	name: string;
}

const Navbar: React.FC<NavbarProps> = ({ name }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        'https://doppelme-avatars.p.rapidapi.com/assets/1101/eye',
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key':
              '19821fd389msh466c1a090bddbdap1845a6jsnb547014e5f50',
            'X-RapidAPI-Host': 'doppelme-avatars.p.rapidapi.com',
          },
        },
      );
      const res = await data.text();
      const resp = JSON.parse(res);
      const i = Math.floor(Math.random() * (14 - 0 + 1) + 1);
      setUrl(resp.asset_ids[i].thumbnailSrc);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-row justify-between items-center">
      <h1 className="text-xl font-semibold">{name}</h1>
      <div className="flex justify-evenly basis-1/5">
        <Link to="/events">
          <div className="relative">
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
        <ExpandMoreOutlinedIcon />
      </div>
    </div>
  );
}

export default Navbar;
