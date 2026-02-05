/**
 * AI Career Counselor API Client
 *
 * Calls the API Gateway /chat endpoint to avoid CORS issues and remove the
 * need for Fn-Intent headers. You can override the endpoint via the Vite env
 * var VITE_CHATBOT_API_URL. If not set, we default to same-origin "/chat",
 * which works when the SPA is hosted behind the same API Gateway domain.
 */

// Resolve endpoint: use env override or default to same-origin /chat (Vite exposes import.meta.env)
const API_BASE = (import.meta && import.meta.env && import.meta.env.VITE_CHATBOT_API_URL)
  ? import.meta.env.VITE_CHATBOT_API_URL
  : '/chat';

// Ensure trailing slash so it hits /chat/ which matches the API Gateway route
const API_ENDPOINT = API_BASE.endsWith('/') ? API_BASE : `${API_BASE}/`;

/**
 * Send a message to the AI career counselor
 * @param {string} message - User's message
 * @param {string} careerId - Current career being viewed (optional)
 * @param {Array} history - Conversation history (optional)
 * @returns {Promise} - API response
 */
export const sendMessage = async (message, careerId = null, history = []) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        careerId,
        history
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error sending message to chatbot:', error);

    let errorMessage = 'Unable to connect to the career counselor. Please try again.';

    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.message.includes('500')) {
      errorMessage = 'Server error. The career counselor is temporarily unavailable.';
    }

    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Check if the chatbot API is available
 * @returns {Promise<boolean>}
 */
export const checkApiHealth = async () => {
  try {
    // Simple health check by making a basic request
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: "ping",
        careerId: null,
        history: []
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};
