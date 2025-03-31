// src/Components/ContactUs/ContactUs.js
import React from "react";
import "./ContactUs.css";
import Fot from "../../bottomnav/foter"

function ContactUs() {
  return (
    <div className="contact-us">
      <section className="contact-hero">
        <div className="hero-overlay">
          <h1>Contact Us</h1>
          <p>We’re here to help with your construction management needs.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-form-container">
          <h2>Get in Touch</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Our Contact Details</h2>
          <p><strong>Address:</strong> 123 Construction Lane, Colombo, Sri Lanka</p>
          <p><strong>Phone:</strong> +94 11 234 5678</p>
          <p><strong>Email:</strong> info@msnconstructions.com</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902979312093!2d79.849684314772!3d6.927079995002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593c4f1c2b5d%3A0x5b9f2a0b7b6e3c4!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1698771234567!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MSN Constructions Location"
            ></iframe>
          </div>
        </div>
      
      </section>
      <Fot />
    </div>
    
  ); 
} 

export default ContactUs;