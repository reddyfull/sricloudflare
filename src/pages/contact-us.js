import Link from "next/link";

export default function ContactUs() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Contact Us</h1>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div style={{ marginTop: '30px', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <h3>Contact Information</h3>
        <div style={{ marginTop: '15px' }}>
          <p><strong>Name:</strong> Srinivasa Tadipatri</p>
          <p><strong>Email:</strong> <a href="mailto:reddyfull@gmail.com">reddyfull@gmail.com</a></p>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Send us a Message</h3>
        <form style={{ marginTop: '15px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Your Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                fontSize: '16px'
              }} 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Your Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                fontSize: '16px'
              }} 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="subject" style={{ display: 'block', marginBottom: '5px' }}>Subject:</label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                fontSize: '16px'
              }} 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5"
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#0070f3', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Send Message
          </button>
        </form>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
