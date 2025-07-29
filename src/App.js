import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Page Components (as provided by you, with added styling)
const HomePage = () => (
  <div className="p-6 bg-white rounded-lg shadow-md mb-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Home Page</h2>
    <p className="text-lg text-gray-600">Welcome to our GitHub Pages React app!</p>
    <p className="mt-2 text-gray-500">
      This is the main landing page. Feel free to explore other sections using the navigation above.
    </p>
  </div>
);

const AboutPage = () => (
  <div className="p-6 bg-white rounded-lg shadow-md mb-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">About Us</h2>
    <p className="text-lg text-gray-600">Learn more about our awesome project.</p>
    <p className="mt-2 text-gray-500">
      We are dedicated to creating useful and innovative web applications. Our team strives for excellence and user satisfaction.
    </p>
  </div>
);

const ServicesPage = () => (
  <div className="p-6 bg-white rounded-lg shadow-md mb-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Services</h2>
    <p className="text-lg text-gray-600">We offer a wide range of services to meet your needs.</p>
    <ul className="list-disc list-inside mt-4 text-gray-600">
      <li>**Web Development:** Crafting modern, responsive, and high-performance websites.</li>
      <li>**UI/UX Design:** Creating intuitive and engaging user interfaces.</li>
      <li>**Consulting:** Providing expert advice for your software projects.</li>
      <li>**Deployment Solutions:** Helping you get your applications live.</li>
    </ul>
  </div>
);

const ContactPage = () => (
  <div className="p-6 bg-white rounded-lg shadow-md mb-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
    <p className="text-lg text-gray-600">Feel free to reach out with any questions.</p>
    <div className="mt-4 text-gray-700">
      <p>
        **Email:** <a href="mailto:info@example.com" className="text-blue-600 hover:underline">info@example.com</a>
      </p>
      <p>
        **Phone:** <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a>
      </p>
      <p>
        **Address:** 123 Dev Street, Web City, 98765
      </p>
    </div>
  </div>
);

function App() {
  return (
    // Use HashRouter for compatibility with GitHub Pages static hosting
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 sm:p-8 flex flex-col items-center">
        {/* Navigation Bar */}
        <nav className="bg-white p-4 rounded-xl shadow-lg mb-8 w-full max-w-2xl flex justify-center flex-wrap gap-4">
          <ul className="flex flex-wrap justify-center gap-4">
            <li>
              <Link
                to="/"
                className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-md"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-md"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-md"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Route Definitions */}
        <div className="w-full max-w-2xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Optional: Add a 404 page */}
            <Route path="*" element={
              <div className="p-6 bg-red-100 text-red-700 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-2">404 - Page Not Found</h2>
                <p>Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">Go to Home</Link>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
