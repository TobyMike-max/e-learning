import Navbar from '../components/Navbar';
import SideNav from './SideNav';

interface settingProps {
	authenticateUser: (value:boolean) => void;
}

const Settings: React.FC<settingProps> = ({ authenticateUser }) => {
  return (
    <div className="flex flex-row min-h-screen max-w-full">
      <SideNav display="" />
      <div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-col px-3">
        <Navbar name="Settings" authenticateUser={authenticateUser}/>
        <div className="flex flex-col justify-center items-center h-4/6 font-black text-4xl">
          <h1> Settings </h1>
          <p> Jesus Loves You!!! </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
