import axios from 'axios';

// Get API endpoint from environment variable
// In production, this will be your OCI Function endpoint
const API_ENDPOINT = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8080';

/**
 * Send a message to the AI career counselor
 * @param {string} message - User's message
 * @param {string} careerId - Current career being viewed (optional)
 * @param {Array} history - Conversation history (optional)
 * @returns {Promise} - API response
 */
export const sendMessage = async (message, careerId = null, history = []) => {
  try {
    const response = await axios.post(API_ENDPOINT, {
      message,
      careerId,
      history
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error sending message to chatbot:', error);
    
    let errorMessage = 'Unable to connect to the career counselor. Please try again.';
    
    if (error.response) {
      // Server responded with error
      errorMessage = error.response.data?.error || 'An error occurred processing your request.';
    } else if (error.request) {
      // Request made but no response
      errorMessage = 'No response from server. Please check your connection.';
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
    // Try a simple health check (you can implement this in the function)
    const response = await axios.get(API_ENDPOINT, { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
