import React from "react";
import "./AboutUs.css";
import img1 from "../../pictures/clay-elliot-HfMCgqOLTyM-unsplash.jpg";
import Fot from "../../bottomnav/foter"

function AboutUs() {
  return (
    <div className="about-us">
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>About MSN Constructions</h1>
          <p>Building the Future, One Project at a Time</p>
        </div>
      </section>

      <section className="about-content">
        <div className="company-overview">
          <h2>Who We Are</h2>
          <p>
            MSN Constructions (Pvt) Ltd is a leading construction management company based in Sri Lanka, with over 20 years of experience in delivering high-quality infrastructure projects. We specialize in hydropower, building construction, and irrigation systems, ensuring sustainable and innovative solutions for our clients.
          </p>
          <div className="overview-image">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Construction Team"
            />
          </div>
        </div>

        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team Member 1"
              />
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src={img1} alt="Team Member 2" />
              <h3>Jane Smith</h3>
              <p>Project Manager</p>
            </div>
            <div className="team-member">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team Member 3"
              />
              <h3>Michael Brown</h3>
              <p>Lead Engineer</p>
            </div>
          </div>
        </div>

        <div className="journey-section">
          <h2>Our Journey</h2>
          <div className="journey-timeline">
            <div className="journey-card">
              <div className="journey-icon">
                <i className="fas fa-building"></i>
              </div>
              <div className="journey-content">
                <h3>2003</h3>
                <p>Founded MSN Constructions in Colombo, Sri Lanka.</p>
              </div>
            </div>
            <div className="journey-card">
              <div className="journey-icon">
                <i className="fas fa-water"></i>
              </div>
              <div className="journey-content">
                <h3>2010</h3>
                <p>Completed our first major hydropower project in Uganda.</p>
              </div>
            </div>
            <div className="journey-card">
              <div className="journey-icon">
                <i className="fas fa-home"></i>
              </div>
              <div className="journey-content">
                <h3>2015</h3>
                <p>Expanded operations to Seychelles, building luxury villas.</p>
              </div>
            </div>
            <div className="journey-card">
              <div className="journey-icon">
                <i className="fas fa-award"></i>
              </div>
              <div className="journey-content">
                <h3>2025</h3>
                <p>Recognized as a leader in sustainable construction in South Asia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Fot />
    </div>
  );
}

export default AboutUs;