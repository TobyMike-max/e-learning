import Navbar from '../components/Navbar';
import SideNav from './SideNav';

const Chats = () => {
  return (
    <div className="flex flex-row min-h-screen max-w-full">
      <SideNav display="" />
      <div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-col px-3">
        <Navbar name="Chats" />
        <div className="flex flex-col justify-center items-center h-4/6 font-black text-4xl">
          <h1> Chats </h1>
          <p> Coming Soon!!! </p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
