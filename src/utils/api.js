// src/utils/api.js
import axios from "axios";
import { BASE_URL } from "./utils.js";
import { logout } from "./auth";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Flag to prevent multiple simultaneous token refreshes
let isRefreshing = false;
// Queue to hold failed requests while token is being refreshed
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedRequestsQueue = [];
};

const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return true;
    
    // Check if token will expire in the next 5 minutes (300 seconds)
    return Date.now() >= (payload.exp * 1000 - 300000);
  } catch (e) {
    return true;
  }
};

// Request interceptor to add auth token and check expiration
api.interceptors.request.use(
  async (config) => {
    // Skip token check for token refresh endpoint
    if (config.url.includes('/token') || config.skipAuthRefresh) {
      return config;
    }

    const token = localStorage.getItem("token");
    
    // If no token or token is expired, try to refresh
    if (!token || isTokenExpired(token)) {
      // If we're already refreshing the token, add to queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        }).then(newToken => {
          config.headers.Authorization = `Bearer ${newToken}`;
          return config;
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;

      try {
        // Try to refresh token
        const response = await axios.get(`${BASE_URL}/token`, {
          withCredentials: true,
          skipAuthRefresh: true // Custom flag to prevent infinite loops
        });
        
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        
        // Process queued requests with new token
        processQueue(null, accessToken);
        
        // Update current request with new token
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      } catch (refreshError) {
        // If refresh fails, process queue with error and logout
        processQueue(refreshError, null);
        logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Token is valid, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors (in case expiration check fails)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isTokenRefreshRequest = originalRequest.url.includes('/token');
    
    // If it's a token refresh request that failed, logout the user
    if (isTokenRefreshRequest) {
      logout();
      return Promise.reject(error);
    }

    // If unauthorized and we haven't already tried to refresh
    if (isUnauthorized && !originalRequest._retry) {
      
      // If we're already refreshing the token, add to queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh token
        const response = await axios.get(`${BASE_URL}/token`, {
          withCredentials: true,
          skipAuthRefresh: true
        });
        
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        
        // Process queued requests with new token
        processQueue(null, accessToken);
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, process queue with error and logout
        processQueue(refreshError, null);
        logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;