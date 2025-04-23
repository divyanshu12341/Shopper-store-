import React from 'react'

import './CSS/LoginSignUp.css'

const LoginSignUp = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          {/* Add labels for accessibility */}
          <label htmlFor="name-input" style={{ display: 'none' }}>Your Name</label>
          <input id="name-input" type="text" placeholder='Your name' name="name" autoComplete="name" />

          <label htmlFor="email-input" style={{ display: 'none' }}>Email Address</label>
          <input id="email-input" type="email" placeholder='Email address' name="email" autoComplete="email" />

          <label htmlFor="password-input" style={{ display: 'none' }}>Password</label>
          <input id="password-input" type="password" placeholder='Password' name="password" autoComplete="new-password" />
        </div>
        {/* Consider changing button type to "submit" if inside a form */}
        <button>Continue</button>
        <p className="loginsignup-login">
          Already have an account? <span>Login</span> {/* Make 'Login' a link/button */}
        </p>
        <div className="loginsignup-agree">
          {/* Associate label with checkbox */}
          <input type="checkbox" name="terms" id="terms-agree" />
          <label htmlFor="terms-agree"> By continuing, I agree to the terms and privacy policy</label>
        </div>
      </div>
    </div>
  )
}

export default LoginSignUp
