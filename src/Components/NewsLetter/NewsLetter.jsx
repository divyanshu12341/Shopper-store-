import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
  return (
    <div className="newsletter">
        <h1>Get exclusive offer in your emails</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type="email" placeholder='Your email ID' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter