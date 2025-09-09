import { useState, useEffect } from 'react';

export default function Health() {
  const [healthData, setHealthData] = useState({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: '0s',
    version: '1.0.0',
    environment: 'production',
    services: {
      database: 'healthy',
      api: 'healthy',
      storage: 'healthy',
      cdn: 'healthy'
    },
    metrics: {
      responseTime: '45ms',
      memoryUsage: '128MB',
      cpuUsage: '12%',
      requestsPerMinute: 156
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = async () => {
    setIsLoading(true);
    // Simulate health check delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update health data with current timestamp
    setHealthData(prev => ({
      ...prev,
      timestamp: new Date().toISOString(),
      uptime: calculateUptime(),
      metrics: {
        ...prev.metrics,
        responseTime: `${Math.floor(Math.random() * 50) + 20}ms`,
        memoryUsage: `${Math.floor(Math.random() * 50) + 100}MB`,
        cpuUsage: `${Math.floor(Math.random() * 20) + 5}%`,
        requestsPerMinute: Math.floor(Math.random() * 100) + 100
      }
    }));
    setIsLoading(false);
  };

  const calculateUptime = () => {
    // Simulate uptime calculation
    const startTime = Date.now() - (Math.random() * 86400000); // Random uptime up to 24 hours
    const uptimeMs = Date.now() - startTime;
    const hours = Math.floor(uptimeMs / 3600000);
    const minutes = Math.floor((uptimeMs % 3600000) / 60000);
    const seconds = Math.floor((uptimeMs % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    // Auto-refresh health data every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'error': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '❓';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          padding: '20px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 10px 0',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            System Health Monitor
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.1rem', margin: 0 }}>
            Real-time monitoring and status information
          </p>
        </header>

        {/* Refresh Button */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button 
            onClick={checkHealth}
            disabled={isLoading}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
            }}
          >
            {isLoading ? '🔄 Checking...' : '🔄 Refresh Health Status'}
          </button>
        </div>

        {/* Overall Status */}
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          padding: '30px', 
          borderRadius: '15px', 
          marginBottom: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.8rem' }}>
                Overall Status: {getStatusIcon(healthData.status)} {healthData.status.toUpperCase()}
              </h2>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Last checked: {new Date(healthData.timestamp).toLocaleString()}
              </p>
            </div>
            <div style={{ 
              fontSize: '3rem', 
              color: getStatusColor(healthData.status),
              textAlign: 'center'
            }}>
              {getStatusIcon(healthData.status)}
            </div>
          </div>
        </div>

        {/* System Information */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            padding: '25px', 
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3rem', color: '#4CAF50' }}>
              System Info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Version:</span>
                <span style={{ fontWeight: 'bold' }}>{healthData.version}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Environment:</span>
                <span style={{ fontWeight: 'bold' }}>{healthData.environment}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Uptime:</span>
                <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{healthData.uptime}</span>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            padding: '25px', 
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3rem', color: '#2196F3' }}>
              Performance Metrics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Response Time:</span>
                <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{healthData.metrics.responseTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Memory Usage:</span>
                <span style={{ fontWeight: 'bold' }}>{healthData.metrics.memoryUsage}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>CPU Usage:</span>
                <span style={{ fontWeight: 'bold' }}>{healthData.metrics.cpuUsage}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.8 }}>Requests/min:</span>
                <span style={{ fontWeight: 'bold' }}>{healthData.metrics.requestsPerMinute}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Status */}
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          padding: '30px', 
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', textAlign: 'center' }}>
            Services Status
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px' 
          }}>
            {Object.entries(healthData.services).map(([service, status]) => (
              <div key={service} style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                padding: '20px', 
                borderRadius: '10px',
                textAlign: 'center',
                border: `2px solid ${getStatusColor(status)}`
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                  {getStatusIcon(status)}
                </div>
                <h4 style={{ margin: '0 0 5px 0', textTransform: 'capitalize' }}>
                  {service}
                </h4>
                <p style={{ 
                  margin: 0, 
                  color: getStatusColor(status), 
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {status}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={{ 
          textAlign: 'center', 
          marginTop: '40px', 
          padding: '20px 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          opacity: 0.8
        }}>
          <p style={{ margin: 0 }}>
            Health monitoring endpoint • Last updated: {new Date().toLocaleString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
