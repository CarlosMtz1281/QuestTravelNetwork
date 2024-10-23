// pages/my-plans.js
"use client"
import React from 'react';


const MyPlans = () => {
  return (
    <div className="container">
      {/* Sidebar for Saved Plans */}
      <div className="sidebar">
        <h2>My Saved Plans</h2>
        <div className="saved-plan active">
          <span className="flag">🇪🇸</span>
          <div className="plan-details">
            <h3>Iberian Peninsula Trip 2025</h3>
            <p>Dec 27 - Dec 31</p>
            <p>Spain</p>
          </div>
        </div>
        {/* Repeat for more saved plans */}
        <div className="saved-plan">
          <span className="flag">🇪🇸</span>
          <div className="plan-details">
            <h3>Iberian Peninsula Trip 2025</h3>
            <p>Dec 27 - Dec 31</p>
            <p>Spain</p>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="details">
        <h1>Iberian Peninsula Trip 2025</h1>
        <h3>Day 1: Madrid, Spain</h3>
        <p><strong>Morning:</strong></p>
        <ul>
          <li>Arrive in Madrid – Settle in and start with breakfast at a local café.</li>
          <li>Visit the Royal Palace – Explore the stunning Royal Palace and its beautiful gardens.</li>
          <li>Plaza Mayor – Stroll through Madrid’s historic square and enjoy its charming atmosphere.</li>
        </ul>
        <p><strong>Afternoon:</strong></p>
        <ul>
          <li>Lunch at Mercado de San Miguel – Taste some local tapas.</li>
          <li>Prado Museum – Visit Spain’s most famous art museum and see masterpieces by Goya, Velázquez, and El Greco.</li>
          <li>Retiro Park – Relax and take a boat ride on the pond in this massive urban park.</li>
        </ul>
        <p><strong>Evening:</strong></p>
        <ul>
          <li>Tapas and Flamenco – Enjoy dinner and watch a traditional Flamenco show.</li>
        </ul>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          width: 100%;
          height: 100vh;
        }
        .sidebar {
          width: 25%;
          background-color: #f3f4f6;
          padding: 20px;
          border-right: 1px solid #e5e7eb;
        }
        .details {
          width: 75%;
          padding: 20px;
        }
        .saved-plan {
          display: flex;
          align-items: center;
          padding: 10px;
          margin-bottom: 10px;
          background-color: white;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .saved-plan:hover {
          background-color: #e5e7eb;
        }
        .active {
          background-color: #fef3c7;
        }
        .flag {
          font-size: 24px;
          margin-right: 10px;
        }
          
        .plan-details h3 {
          font-size: 16px;
          margin: 0;
        }
        .plan-details p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }
        .details h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .details h3 {
          font-size: 18px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default MyPlans;