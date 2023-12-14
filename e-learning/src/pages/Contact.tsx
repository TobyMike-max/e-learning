import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center">
      {/* Navigation Bar */}
      <nav className="bg-[#ffc75b] p-4 w-full">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white font-bold text-xl">academyis</div>
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

      {/* Contact Content */}
      <div className="container mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-bold text-df6690 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-800 mb-6">
          Have questions or want to connect with us? Reach out to Academyis
          through our social media channels.
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-4xl text-df6690">
		<a href="https://twitter.com/TobymikeCreate" target="_blank" rel="noopener noreferrer">
		  <TwitterIcon />
          </a>
	  <a href="https://www.linkedin.com/in/oluwatobiloba-osinubi-9978741b8" target="_blank" rel="noopener noreferrer">
		  <LinkedInIcon />
	  </a>
	  <a href="https://github.com/TobyMike-max/" target="_blank" rel="noopener noreferrer">
		  <GitHubIcon />
	  </a>
	  <a href="mailto:osinubi.michael@gmail.com" target="_blank" rel="noopener noreferrer">
		  <EmailIcon />
	  </a>
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

export default Contact;
