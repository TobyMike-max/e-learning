import { useState } from 'react';
import Logo from '../components/Logo';
import fake from '../assets/nav';
import { Link } from 'react-router-dom';
import SideIcons from '../components/SideIcons';

export default function SideNav() {
  const [dashboardIndex, setIndex] = useState('1');

  function handleClick(index) {
    setIndex(index.toString());
  }

  return (
    <div className="relative basis-1/6 py-5 bg-[#1b1b1b] text-[#fff] pl-7">
      <Link to="/dashboard">
        <Logo />
      </Link>
      {fake.map((item, idx) => (
        <Link to={`/${item.name}`.toLowerCase()} key={item.id}>
          <SideIcons
            name={item.name}
            key={idx}
            isActive={item.id.toString() === dashboardIndex}
            onClick={() => handleClick(item.id)}
            Icon={item.icon}
          />
        </Link>
      ))}
      <p className="absolute text-xs opacity-50 bottom-5">
        &copy; {new Date().getFullYear()} Academyis App
      </p>
    </div>
  );
}
