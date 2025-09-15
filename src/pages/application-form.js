import { useState, useEffect } from 'react';
import Link from "next/link";
import Head from "next/head";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load Turnstile script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsTurnstileLoaded(true);
    };
    document.head.appendChild(script);

    // Set up global callback functions
    window.onTurnstileSuccess = onTurnstileSuccess;
    window.onTurnstileError = onTurnstileError;
    window.onTurnstileExpired = onTurnstileExpired;

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      // Cleanup global functions
      delete window.onTurnstileSuccess;
      delete window.onTurnstileError;
      delete window.onTurnstileExpired;
    };
  }, []);

  // Turnstile callback functions
  const onTurnstileSuccess = (token) => {
    setTurnstileToken(token);
    if (errors.turnstile) {
      setErrors(prev => ({
        ...prev,
        turnstile: ''
      }));
    }
  };

  const onTurnstileError = () => {
    setTurnstileToken('');
    setErrors(prev => ({
      ...prev,
      turnstile: 'Turnstile verification failed. Please try again.'
    }));
  };

  const onTurnstileExpired = () => {
    setTurnstileToken('');
    setErrors(prev => ({
      ...prev,
      turnstile: 'Turnstile verification expired. Please verify again.'
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!turnstileToken) {
      newErrors.turnstile = 'Please complete the security verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate Turnstile token with server
      const response = await fetch('/api/validate-turnstile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const result = await response.json();

      if (result.success) {
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            address: ''
          });
          setTurnstileToken('');
          setIsSubmitted(false);
          // Reset Turnstile widget
          if (window.turnstile) {
            window.turnstile.reset();
          }
        }, 3000);
      } else {
        setErrors(prev => ({
          ...prev,
          turnstile: 'Security verification failed. Please try again.'
        }));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({
        ...prev,
        turnstile: 'An error occurred. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
  };

  const errorInputStyle = {
    ...inputStyle,
    border: '2px solid #ff6b6b',
    boxShadow: '0 0 0 3px rgba(255, 107, 107, 0.1)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '14px'
  };

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '12px',
    marginTop: '4px',
    fontWeight: '500'
  };

  const buttonStyle = {
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 112, 243, 0.3)'
  };

  const successStyle = {
    backgroundColor: '#4ecdc4',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '16px',
    fontWeight: '600'
  };

  return (
    <>
      <Head>
        <title>Application Form - Cloudflare Pages</title>
        <meta name="description" content="Submit your application with our secure form" />
      </Head>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
      {/* Header */}
      <header style={{ 
        padding: '20px 0', 
        backgroundColor: 'rgba(0,0,0,0.1)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
              Application Form
            </h1>
            <Link href="/" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease'
            }}>
              ← Back to Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Form Container */}
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '10px', 
            color: '#333',
            fontWeight: 'bold'
          }}>
            Application Form
          </h2>
          <p style={{ 
            color: '#666', 
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            Please fill out the form below with your personal information
          </p>
        </div>

        {isSubmitted && (
          <div style={successStyle}>
            ✅ Application submitted successfully! Thank you for your submission.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="firstName" style={labelStyle}>
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              style={errors.firstName ? errorInputStyle : inputStyle}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <div style={errorStyle}>{errors.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="lastName" style={labelStyle}>
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              style={errors.lastName ? errorInputStyle : inputStyle}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <div style={errorStyle}>{errors.lastName}</div>
            )}
          </div>

          {/* Date of Birth */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="dateOfBirth" style={labelStyle}>
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              style={errors.dateOfBirth ? errorInputStyle : inputStyle}
            />
            {errors.dateOfBirth && (
              <div style={errorStyle}>{errors.dateOfBirth}</div>
            )}
          </div>

          {/* Address */}
          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="address" style={labelStyle}>
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="4"
              style={{
                ...(errors.address ? errorInputStyle : inputStyle),
                resize: 'vertical',
                minHeight: '100px'
              }}
              placeholder="Enter your complete address"
            />
            {errors.address && (
              <div style={errorStyle}>{errors.address}</div>
            )}
          </div>

          {/* Turnstile Widget */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>
              Security Verification *
            </label>
            {isTurnstileLoaded && (
              <div 
                className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAB1VuffTYBmbYo0v"}
                data-callback="onTurnstileSuccess"
                data-error-callback="onTurnstileError"
                data-expired-callback="onTurnstileExpired"
                data-theme="light"
                style={{ marginBottom: '8px' }}
              />
            )}
            {!isTurnstileLoaded && (
              <div style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                textAlign: 'center',
                color: '#666'
              }}>
                Loading security verification...
              </div>
            )}
            {errors.turnstile && (
              <div style={errorStyle}>{errors.turnstile}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            style={{
              ...buttonStyle,
              opacity: isSubmitting || !turnstileToken ? 0.6 : 1,
              cursor: isSubmitting || !turnstileToken ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={(e) => {
              if (!isSubmitting && turnstileToken) {
                e.target.style.backgroundColor = '#0056b3';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting && turnstileToken) {
                e.target.style.backgroundColor = '#0070f3';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        {/* Additional Information */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#495057', fontSize: '14px' }}>
            Privacy Notice
          </h4>
          <p style={{ 
            margin: 0, 
            fontSize: '12px', 
            color: '#6c757d',
            lineHeight: '1.4'
          }}>
            Your personal information will be kept confidential and used only for the purpose of processing your application. 
            We comply with all applicable privacy laws and regulations.
          </p>
        </div>
        </div>
      </div>
    </>
  );
}
