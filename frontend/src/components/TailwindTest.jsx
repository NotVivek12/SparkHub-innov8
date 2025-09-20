/**
 * Design Diagnosis Component
 */

import React from 'react';
import '../styles/test.css';

const TailwindTest = () => {
  return (
    <div className="design-diagnosis">
      <h1 className="diagnosis-heading">Design System Diagnosis</h1>
      
      <div className="diagnosis-section">
        <h2>1. Inline Styles (Always Work)</h2>
        <div style={{ 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.75rem',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Modern Card Component</h3>
          <p style={{ lineHeight: '1.6' }}>This card uses inline styles that don't depend on Tailwind or any CSS files.</p>
          <div style={{ 
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            <button style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Button 1
            </button>
            <button style={{ 
              backgroundColor: 'white', 
              color: '#3b82f6',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}>
              Button 2
            </button>
          </div>
        </div>
      </div>
      
      <div className="diagnosis-section">
        <h2>2. Direct CSS Import Test</h2>
        <div className="test-box">
          <h3 className="test-heading">Direct CSS Module</h3>
          <p className="test-paragraph">
            This component is styled using a direct CSS import (test.css). If you see this with proper styling, 
            the CSS import is working correctly.
          </p>
          <button className="test-button">CSS Button</button>
        </div>
      </div>
      
      <div className="diagnosis-section">
        <h2>3. Would-be Tailwind Classes</h2>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Tailwind Test</h3>
          <p className="opacity-90">If this has blue background, white text, and proper styling, Tailwind is working!</p>
          <div className="flex gap-2 mt-4">
            <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded">
              Action
            </button>
            <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow">
              Submit
            </button>
          </div>
        </div>
      </div>
      
      <div className="diagnosis-section">
        <h2>4. Dark Mode Test</h2>
        <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-xl font-bold mb-2">Dark Mode Test</h3>
          <p className="opacity-90">This element should change colors when toggling between light and dark mode.</p>
          <div className="flex gap-2 mt-4">
            <button className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold py-2 px-4 rounded">
              Dark Mode Button
            </button>
          </div>
        </div>
      </div>
      
      <div className="diagnosis-note" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginTop: '2rem',
        fontSize: '0.875rem'
      }}>
        <p style={{ color: '#94a3b8' }}>
          <strong>Note:</strong> If only sections 1 and 2 are properly styled, but section 3 isn't, 
          then Tailwind CSS isn't properly configured. Use the other styling methods until Tailwind 
          is fixed.
        </p>
      </div>
    </div>
  );
};

export default TailwindTest;