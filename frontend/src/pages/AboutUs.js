import React, { useState } from "react";
import "../styles/AboutUs.css"; // Import the CSS file

const AboutUs = () => {
  const [showStory, setShowStory] = useState(false);

  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>

      <p className="about-text">
        Hi, I'm <strong style={{ color: "#0077cc" }}>Ranadheer</strong>, the founder of Hyderabad Gaming Garage.
      </p>

      <p className="about-text">
        By profession, I'm a Tech Lead at a multinational company, but gaming has
        always been more than just a hobby—it's my passion. Alongside gaming,
        I've been fascinated by electronics since childhood, spending countless
        hours learning, building, and repairing devices. My interests in robotics,
        mechatronics, and IoT helped me develop the precision and technical
        expertise that I now bring to every repair.
      </p>

      <p className="about-text">
        The idea for Hyderabad Gaming Garage started when I repaired the consoles
        and controllers of my cousins and friends. I realized that many gamers
        were struggling with expensive repairs, long waiting times, and unreliable
        service from local repair shops. I wanted to change that.
      </p>

      <p className="about-text">
        That's why I founded Hyderabad Gaming Garage—not just as a business, but
        as a service for fellow gamers. My goal has always been to provide honest,
        affordable, and high-quality repairs rather than maximizing profits. Every
        repair is done with the same level of care and attention that I would give
        to my own gaming equipment.
      </p>

      <p className="about-text">
        Quality is my biggest priority. I follow industry-standard repair
        techniques with exceptional precision in soldering and desoldering. The
        workmanship is so clean and accurate that, in many cases, it's difficult
        to tell whether a controller has ever been repaired. My aim is to restore
        your device to a condition that looks and performs as close to new as
        possible.
      </p>

      <p className="about-text">
        I also believe that a great repair isn't just about replacing a faulty
        component. Every controller is carefully cleaned inside and out before
        it's returned, ensuring it not only works perfectly but also feels fresh
        in your hands.
      </p>

      <p className="about-text">
        At Hyderabad Gaming Garage, you're not just another customer—you're a
        fellow gamer. I understand how important your console and controller are,
        and I treat every device with the utmost care, precision, and respect.
      </p>

      <p className="about-text">
        Thank you for trusting Hyderabad Gaming Garage. I look forward to helping
        you get back to gaming as quickly as possible.
      </p>

      {/* Toggle button */}
      <p className="about-text">
        Want to know more about how this website was built?{" "}
        <button
          onClick={() => setShowStory(!showStory)}
          className="story-btn"
        >
          {showStory ? "Hide My Website Story" : "Read My Website Story"}
        </button>
      </p>

      {/* Extended story section only shows when toggled */}
      {showStory && (
        <div id="story" className="story-section">
          <h2>Our Journey of Building This Website</h2>
          <p className="about-text">
            My name is <strong style={{ color: "#0077cc" }}>Manikanta Sai Deepu</strong>, and I work as a Tech Lead in a multinational company.
            From childhood, I was fascinated by computers, which shaped my academic path. I pursued
            a Master’s degree in Computer Science in the USA, and after completing my studies, I
            returned to India with a strong belief that everyone should contribute to the growth of
            their own country.
          </p>

          <p className="about-text">
            When my brother introduced the idea of Hyderabad Gaming Garage, I immediately connected
            with it. I offered suggestions on how we could expand the concept and actively supported
            him in the early stages. Together, we worked on disassembling and reassembling controllers,
            calibrating them, and ensuring they functioned perfectly. While he focused on soldering
            and quality checks, I found myself inspired to take the business to the next level.
          </p>

          <p className="about-text">
            That inspiration led me to create a website and host it live. My vision was to transform
            his WhatsApp-based repair service into a full-fledged e-commerce platform. This was not
            just about building a site — it was about creating a digital backbone for his business.
          </p>

          <p className="about-text">
            As a Data Engineer, I had some knowledge of building websites, but I wanted this project
            to be truly special. That’s when I turned to <strong>Microsoft Copilot</strong>, my AI
            companion. Copilot became my full-time support system throughout the journey — from
            brainstorming features, fixing code syntax, and structuring components, to polishing the
            design and ensuring deployment. Copilot provided insights at every step, helping me think
            through architecture, optimize workflows, and make the site production-ready.
          </p>

          <p className="about-text">
            Day by day, we documented our progress: setting up the frontend, integrating routes,
            refining the layout, and connecting the backend. With Copilot’s guidance, I was able to
            take my brother’s vision and turn it into a live, functioning website — a platform that
            transformed his WhatsApp business into a professional e-commerce service.
          </p>

          <p className="about-text">
            This website is more than just a digital storefront; it represents our shared dream of
            combining technical expertise with gaming passion. It shows how family collaboration,
            determination, and the right tools — including AI support — can create something meaningful.
          </p>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
