import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';


// Placeholder components for different pages
const HomePage = () => (
  <div>
    <h2>Home Page</h2>
    <p>Welcome to our GitHub Pages React app!</p>
  </div>
);

const AboutPage = () => (
  <div>
    <h2>About Us</h2>
    <p>Learn more about our awesome project.</p>
  </div>
);

const ServicesPage = () => (
  <div>
    <h2>Our Services</h2>
    <p>We offer a wide range of services to meet your needs.</p>
  </div>
);

const ContactPage = () => (
  <div>
    <h2>Contact Us</h2>
    <p>Feel free to reach out with any questions.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;