import { useContext } from 'react';
import Navbar from '../components/Navbar';
import SideNav from './SideNav';
import { AuthContext } from "../context/authContext";


const Courses = () => {
	const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex flex-row h-screen max-w-full">
      <SideNav display="" />
      <div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-col px-3">
        <Navbar name="Courses" />
        <div className="flex flex-col justify-center items-center h-4/6 font-black text-4xl">
          <h1> Courses </h1>
          <p> { currentUser.username }, Courses are coming soon </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
