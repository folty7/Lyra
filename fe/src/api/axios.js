import axios from 'axios';

// Dynamically use the current hostname (localhost vs 127.0.0.1) for API calls
export const apiClient = axios.create({
    baseURL: `http://${window.location.hostname}:8080/api`,
    withCredentials: true // Crucial for sending cookies automatically
});
