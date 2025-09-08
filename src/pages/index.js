import Link from "next/link";

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        padding: '20px 0', 
        backgroundColor: 'rgba(0,0,0,0.1)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
              Cloudflare Pages
            </h1>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/about" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease'
              }}>
                About
              </Link>
              <Link href="/contact-us" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease'
              }}>
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        padding: '80px 20px', 
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '20px', 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #fff, #f0f0f0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Welcome to Cloudflare Pages
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          marginBottom: '40px', 
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto 40px auto',
          lineHeight: '1.6'
        }}>
          Experience the power of modern web development with Cloudflare's cutting-edge platform. 
          Build, deploy, and scale your applications with lightning-fast performance.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/about" style={{ 
            backgroundColor: '#ff6b6b', 
            color: 'white', 
            padding: '15px 30px', 
            borderRadius: '30px', 
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(255,107,107,0.3)',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}>
            Learn More
          </Link>
          <Link href="/contact-us" style={{ 
            backgroundColor: 'transparent', 
            color: 'white', 
            padding: '15px 30px', 
            borderRadius: '30px', 
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            border: '2px solid white',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}>
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '80px 20px', 
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            marginBottom: '60px',
            fontWeight: 'bold'
          }}>
            Why Choose Cloudflare Pages?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            {/* Feature 1 */}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: '40px 30px', 
              borderRadius: '20px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ⚡
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: 'bold' }}>
                Lightning Fast
              </h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                Deploy your applications with global edge computing for unmatched speed and performance worldwide.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: '40px 30px', 
              borderRadius: '20px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🛡️
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: 'bold' }}>
                Secure by Default
              </h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                Built-in security features protect your applications from threats with automatic SSL and DDoS protection.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: '40px 30px', 
              borderRadius: '20px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🚀
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: 'bold' }}>
                Easy Deployment
              </h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                Connect your Git repository and deploy automatically with every push. No complex setup required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        padding: '80px 20px', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '60px',
            fontWeight: 'bold'
          }}>
            Trusted by Developers Worldwide
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '40px' 
          }}>
            <div>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                99.9%
              </div>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Uptime Guarantee</p>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                200+
              </div>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Global Locations</p>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                1M+
              </div>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Active Sites</p>
            </div>
            
            <div>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                &lt;100ms
              </div>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '40px 20px', 
        backgroundColor: 'rgba(0,0,0,0.2)', 
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ opacity: 0.8, marginBottom: '20px' }}>
            © 2024 Cloudflare Pages. Built with Next.js and deployed on Cloudflare.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <Link href="/about" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
              About
            </Link>
            <Link href="/contact-us" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
              Contact Us
            </Link>
            <a href="https://cloudflare.com" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
              Cloudflare
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
