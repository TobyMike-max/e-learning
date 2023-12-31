import { useState } from 'react';
import Logo from '../components/Logo';
import fake from '../assets/nav';
import { Link, NavLink } from 'react-router-dom';
import SideIcons from '../components/SideIcons';
import { useAuth } from '../context/authContext';

interface SideNavProps {
	display: string;
}

const SideNav: React.FC<SideNavProps> = ({ display }) => {
  const [dashboardIndex, setIndex] = useState<string>('1');

  const { toggleMenu } = useAuth();
  const handleClick = (index: number): void => {
	  setIndex(index.toString());
	  toggleMenu();
  };

  return (
    <div
      className={`absolute top-0 left-0 py-5 bg-[#1b1b1b] text-[#fff] pl-7 min-h-screen ${
        display
          ? 'sm:hidden block z-50 w-full h-full'
          : 'hidden sm:block relative basis-1/6'
      }`}
    >
      <div className="flex justify-between pr-4 pt-2 -mb-3">
        <Link to="/">
          <Logo />
        </Link>
        <div className="w-6 h-6 relative sm:hidden" onClick={toggleMenu}>
          <span className="absolute h-0.5 w-6 bg-white transform rotate-45 left-0 top-2/4"></span>
          <span className="absolute h-0.5 w-6 bg-white transform -rotate-45 left-0 top-2/4"></span>
        </div>
      </div>
      {fake.map((item, idx) => (
        <NavLink to={`/${item?.name}`.toLowerCase()} key={item.id}>
          {({ isActive }) => (
            <SideIcons
              id={item.id}
              setIndex={setIndex}
              data={isActive}
              name={item?.name}
              key={idx}
              isActive={item.id.toString() === dashboardIndex}
              onClick={() => handleClick(item.id)}
              Icon={item.icon}
            />
          )}
        </NavLink>
      ))}
      {!display && (
        <p className="absolute text-xs opacity-50 bottom-5">
          &copy; {new Date().getFullYear()} Academyis App
        </p>
      )}
    </div>
  );
}

export default SideNav;
