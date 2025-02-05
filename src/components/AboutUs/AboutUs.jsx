import React from "react";
import "./About.css";
import Footer from '../Home/Footer/Footer'
const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="top-about">
        <div className="textPart">
          <h2 >About Us</h2>
          <p>
            <strong>
              Welcome to <span class="highlight">Women in Workforce</span>
            </strong>
            , the premier platform dedicated to empowering and promoting women
            in the workplace. Our platform is designed to connect talented and
            ambitious women with diverse employment opportunities across the
            United Kingdom, Europe, and India.
          </p>
          <p>
            At <span class="highlight">Women in Workforce</span>, we understand
            the unique challenges and opportunities that women face in their
            professional lives. Our mission is to bridge the gender gap in
            various industries by providing a supportive and inclusive space for
            women to thrive.
          </p>
          <p>
            One of the core features of{" "}
            <span class="highlight">Women in Workforce</span> is our exclusive
            job board, where employers from a wide range of sectors actively
            seek to hire talented women.
          </p>
        </div>
        <div className="about-image">
          <img src="/Podcast.png" alt="Woman speaking in podcast" width={450} />
        </div>
      </div>
      <div className="bottom-about">
        <div className="about-image">
          <img src="/Meeting.png" alt="Woman speaking in podcast" width={450} />
        </div>
        <div className="textPart">
          <p>
            In addition to connecting women with employment opportunities, we
            believe in fostering personal and professional growth. Through our
            engaging podcasts and insightful webinars, we bring you inspiring
            stories, expert advice, and valuable insights from successful women
            leaders across various fields. These resources serve as a source of
            inspiration, education, and mentorship, helping you navigate the
            challenges and make informed decisions as you progress in your
            career.
          </p>

          <p>
            Women in Workforce is not just a platform; it is a community of
            like-minded individuals who share a common goal of empowering{" "}
            <strong>women in the workforce</strong>. We encourage networking,
            mentorship, and collaboration among our members, fostering a
            supportive environment where you can connect with peers, seek
            guidance, and build meaningful relationships.
          </p>

          <p>
            Whether you are an employer committed to gender diversity in your
            organization or a talented woman seeking professional growth, Women
            in Workforce is here to support you every step of the way. Join our
            platform today and embark on a journey of empowerment, inspiration,
            and career advancement. Together, let's shape a more inclusive and
            equal future for <strong>Women in the Workforce</strong>.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
