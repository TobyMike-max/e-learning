import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const About: React.FC = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center">
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

      {/* About Us Content */}
      <div className="container mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-bold text-df6690 mb-4">About Us</h1>
        <p className="text-lg text-gray-800 mb-6">
          Welcome to Academyis, your go-to platform for quality online
          education. At Academyis, we believe in making education accessible to
          everyone, providing a diverse range of courses to suit various
          learning needs.
        </p>
        <p className="text-lg text-gray-800 mb-6">
          Our mission is to empower learners globally, fostering a community of
          knowledge seekers. Whether you are a student looking to enhance your
          skills or a professional aiming for career growth, Academyis has
          something for everyone.
        </p>
        <p className="text-lg text-gray-800 mb-6">
          We are dedicated to creating a seamless and enriching learning
          experience. Our team of passionate educators is committed to
          delivering high-quality content, ensuring that your learning journey
          with Academyis is both enjoyable and rewarding.
        </p>
        <p className="text-lg text-gray-800">
          Join us on this educational adventure and unlock your full potential.
          Start learning with Academyis today!
        </p>
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

export default About;
