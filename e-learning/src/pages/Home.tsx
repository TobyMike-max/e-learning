import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      {/* Navigation Bar */}
      <nav className="bg-[#ffc75b] p-4 w-full">
        <div className="container mx-auto flex items-center justify-between">
		<div className="text-white font-bold text-xl"><Logo /></div>

          <div className="flex space-x-4">
	    <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
	    <Link to="/courses" className="text-white hover:text-gray-300">
              Courses
            </Link>
	    <Link to="/about" className="text-white hover:text-gray-300">
              About Us
            </Link>
	    <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Logo and Hero Section */}
      <div className="container mx-auto mt-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to Academyis
        </h1>
        <p className="text-lg text-gray-600 mb-8">Your E-Learning Platform</p>

        {/* Call to Action */}
        <div className="flex space-x-4">
          <Link
	  to="/register"
            className="bg-[#df6690] text-white px-6 py-2 rounded-full hover:bg-blue-600"
          >
            Get Started
          </Link>
          <Link
            to="#"
            className="bg-transparent border border-[#ffc75b] text-blue-500 px-6 py-2 rounded-full hover:bg-blue-100"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-4 bg-gray-200 w-full text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Academyis. All rights reserved. | Terms of Service |
          Privacy Policy
        </p>
      </footer>
    </div>
  );
};

export default Home;
