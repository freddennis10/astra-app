import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Backend runs on port 5000

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For JWT/cookie-based authentication
});

// Users API
export const getUserProfile = () => apiClient.get('/users/profile');

export const updateUserProfile = (profileData) => apiClient.put('/users/profile', profileData);

// Posts API
export const getFeed = () => apiClient.get('/posts');

export const createPost = (postData) => apiClient.post('/posts', postData);

// Wallet API
export const getWalletDetails = () => apiClient.get('/wallet');

export const createTransaction = (transactionData) => apiClient.post('/wallet/transaction', transactionData);

// Authentication API
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);

export const registerUser = (userData) => apiClient.post('/auth/register', userData);

export const logoutUser = () => apiClient.post('/auth/logout');

export const verifyToken = () => apiClient.get('/auth/verify');

// Groups API
export const getGroups = () => apiClient.get('/groups');

export const joinGroup = (groupId) => apiClient.post(`/groups/${groupId}/join`);

export const leaveGroup = (groupId) => apiClient.delete(`/groups/${groupId}/leave`);
