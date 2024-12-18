import { config } from './config';

export async function login(username: string, password: string) {
  try {
    const response = await fetch(config.endpoints.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.token;
    }
    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}
