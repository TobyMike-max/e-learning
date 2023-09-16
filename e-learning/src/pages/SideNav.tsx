import { useState } from 'react';
import Logo from '../components/Logo';
import fake from '../assets/nav';
import { NavLink, Link } from 'react-router-dom';
import SideIcons from '../components/SideIcons';

export default function SideNav() {
	const [dashboardIndex, setIndex] = useState<string>('1');

  const handleClick = (index: number): void => {
    setIndex(index.toString());
  }

  return (
    <div className="relative basis-1/6 py-5 bg-[#1b1b1b] text-[#fff] pl-7">
      <Link to="/dashboard">
        <Logo />
      </Link>
      {fake.map((item, idx) => (
        <NavLink to={`/${item.name}`.toLowerCase()} key={item.id}>
          {({ isActive }) => (
            <SideIcons
              id={item.id}
              setIndex={setIndex}
              data={isActive}
              name={item.name}
              key={idx}
              isActive={item.id.toString() === dashboardIndex}
              onClick={() => handleClick(item.id)}
              Icon={item.icon}
            />
          )}
        </NavLink>
      ))}
      <p className="absolute text-xs opacity-50 bottom-5">
        &copy; {new Date().getFullYear()} Academyis App
      </p>
    </div>
  );
}
