import React from 'react'
import './Contact.css';
const Contact = () => {
  return (
    <div className='contacts'>
    <div className='contact-section1'>
        <div className='contact-heading'>
            <h3>Contact us On</h3>
            <h2>+91 9988998898</h2>
            <p>If you want to make an inquiry, please use the form below and our team will get back to yu within one business day</p>
        </div>
        <div className='contact-form'>
            <div className='contact-name'>
                <input type="text" placeholder='Your First Name *' name='firstname' required/>
                <input type="text" placeholder='Your Last Name *' name='lastname' required/>
            </div>
            <div className='contact-name'>
                <input type="email" placeholder='Your email*' name='email' required/>
                <input type="text" placeholder='Subject *' name='subject' required/>
            </div>
            <div className='contact-name'>
                <input type="text" placeholder='Message' name='message'/>
            </div>
            <button className='contact-btn'>Send</button>
        </div>
        </div>
        <div className='section2'>
        <div className="rectangle">
        <div className="contact-item">
        <div className="icon"><img src="/enquiries icon.png" alt="" /></div>
        <div>
          <h3>Enquiries</h3>
          <p>womeninworkforce.com</p>
        </div>
      </div>
      <div className="contact-item">
        <div className="icon"><img src="/nav icon.png" alt="" /></div>
        <div>
          <h3>Office Location</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
      </div>
      <div className="contact-item">
        <div className="icon"><img src="/call icon.png" alt="" /></div>
        <div>
          <h3>Phone</h3>
          <p>+91 9899899898</p>
        </div>
      </div>
        <div className='contact-icons'>
          <p>Follow Us:</p>
          <img src="/facebook.png" alt="" />
          <img src="x.png" alt="" />
          <img src="linkedin.png" alt="" />
          <img src="instagram.png" alt="" />
        </div>
    </div>
    </div>
    </div>
  )
}

export default Contact