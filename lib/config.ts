// Create new config file to manage API URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const config = {
  apiUrl: API_BASE_URL,
  endpoints: {
    auth: `${API_BASE_URL}/auth/login`,
    rss: `${API_BASE_URL}/rss`
  }
};
