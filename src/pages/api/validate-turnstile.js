// Cloudflare Turnstile configuration
const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "0x4AAAAAAB1VuRdeZdHSoXnVAdk1R0AoGHM";

// Configure for Edge Runtime
export const runtime = 'edge';

// Generate UUID using Web Crypto API (Edge Runtime compatible)
function generateUUID() {
  return crypto.randomUUID();
}

async function validateWithRetry(token, remoteip, maxRetries = 3) {
  const idempotencyKey = generateUUID();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const formData = new FormData();
      formData.append("secret", SECRET_KEY);
      formData.append("response", token);
      formData.append("remoteip", remoteip);
      formData.append("idempotency_key", idempotencyKey);

      const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (response.ok) {
        return result;
      }

      // If this is the last attempt, return the error
      if (attempt === maxRetries) {
        return result;
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000),
      );
    } catch (error) {
      if (attempt === maxRetries) {
        return { success: false, "error-codes": ["internal-error"] };
      }
    }
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ 
        success: false, 
        error: 'Turnstile token is required' 
      });
    }

    // Get client IP address
    const remoteip = req.headers['x-forwarded-for'] || 
                    req.headers['x-real-ip'] || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress ||
                    (req.connection.socket ? req.connection.socket.remoteAddress : null);

    // Validate the Turnstile token
    const result = await validateWithRetry(token, remoteip);

    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Turnstile validation successful' 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        error: 'Turnstile validation failed',
        errorCodes: result['error-codes'] || ['unknown-error']
      });
    }

  } catch (error) {
    console.error('Turnstile validation error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}
