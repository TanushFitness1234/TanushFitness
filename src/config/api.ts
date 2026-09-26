// API Configuration for Frontend
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://tanush-fitness-b2b.onrender.com'
    : 'http://localhost:5000');
