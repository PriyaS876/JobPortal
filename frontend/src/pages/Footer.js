import React from "react";
import { Link } from "react-router-dom";
import "../style/footer.css"; // Importing custom CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h3>About Job Portal</h3>
          <p>
            Job Portal is your one-stop destination for matching job seekers with the best opportunities.
            Upload your resume, get matched with jobs, and build your career effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload Resume</Link></li>
            <li><Link to="/jobs">Job Listings</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@jobportal.com</p>
          <p>Phone: +91-9876543210</p>
          <p>Location: Patna, Bihar, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
