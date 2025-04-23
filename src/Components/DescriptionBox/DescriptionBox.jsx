import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description'); // 'description' or 'reviews'

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (122) {/* Example count */}
        </div>
      </div>

      {/* Conditionally render content with appropriate classes */}
      {activeTab === 'description' && (
        // Apply base content class AND specific description class
        <div className="descriptionbox-content descriptionbox-description">
          <p>
            This is the product description. It provides details about the item,
            its features, materials, and usage. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      )}

      {activeTab === 'reviews' && (
         // Apply base content class AND specific reviews class
        <div className="descriptionbox-content descriptionbox-reviews">
          {/* Example Review Structure (replace with your actual review components/data) */}
          <div className="review-item">
            <div className="review-header">
              <span className="review-author">Jane Doe</span>
              <span className="review-date">2024-03-15</span>
            </div>
            <div className="review-rating">{/* Stars Component Here */} ★★★★☆</div>
            <div className="review-body">
              Great product, exactly as described. Fast shipping too!
            </div>
          </div>
          <div className="review-item">
            <div className="review-header">
              <span className="review-author">John Smith</span>
              <span className="review-date">2024-03-10</span>
            </div>
            <div className="review-rating">{/* Stars Component Here */} ★★★★★</div>
            <div className="review-body">
              Highly recommend this item. Excellent quality and value.
            </div>
          </div>
          {/* ... more reviews */}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
