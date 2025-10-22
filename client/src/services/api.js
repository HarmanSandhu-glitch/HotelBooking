import axios from 'axios';

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        // Token will be added by the calling function
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        console.error('API Error:', errorMessage);
        return Promise.reject({
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

// =====================
// USER API FUNCTIONS
// =====================

export const userAPI = {
    // Get current user profile
    getProfile: (token) => api.get('/users/profile', getAuthHeaders(token)),

    // Update user profile
    updateProfile: (token, data) => api.put('/users/profile', data, getAuthHeaders(token)),

    // Add recent searched city
    addRecentCity: (token, city) => api.post('/users/recent-city', { city }, getAuthHeaders(token)),

    // Get recent searched cities
    getRecentCities: (token) => api.get('/users/recent-cities', getAuthHeaders(token)),

    // Update user role
    updateRole: (token, role) => api.patch('/users/role', { role }, getAuthHeaders(token)),

    // Delete user account
    deleteAccount: (token) => api.delete('/users/account', getAuthHeaders(token)),

    // Get all users (admin)
    getAllUsers: (token) => api.get('/users/all', getAuthHeaders(token)),
};

// =====================
// HOTEL API FUNCTIONS
// =====================

export const hotelAPI = {
    // Register new hotel
    register: (token, data) => api.post('/hotels/register', data, getAuthHeaders(token)),

    // Get all hotels
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/hotels${queryString ? `?${queryString}` : ''}`);
    },

    // Get hotel by ID
    getById: (id) => api.get(`/hotels/${id}`),

    // Get hotels by owner
    getMyHotels: (token) => api.get('/hotels/owner/my-hotels', getAuthHeaders(token)),

    // Update hotel
    update: (token, id, data) => api.put(`/hotels/${id}`, data, getAuthHeaders(token)),

    // Delete hotel
    delete: (token, id) => api.delete(`/hotels/${id}`, getAuthHeaders(token)),

    // Get hotels by city
    getByCity: (city) => api.get(`/hotels/city/${encodeURIComponent(city)}`),

    // Get available cities
    getCities: () => api.get('/hotels/cities/available'),
};

// =====================
// ROOM API FUNCTIONS
// =====================

export const roomAPI = {
    // Add new room
    add: (token, formData) => {
        return axios.post(`${API_BASE_URL}/rooms`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => res.data);
    },

    // Get all rooms with filters
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/rooms${queryString ? `?${queryString}` : ''}`);
    },

    // Get room by ID
    getById: (id) => api.get(`/rooms/${id}`),

    // Get rooms by hotel
    getByHotel: (hotelId) => api.get(`/rooms/hotel/${hotelId}`),

    // Get rooms by owner
    getMyRooms: (token) => api.get('/rooms/owner/my-rooms', getAuthHeaders(token)),

    // Update room
    update: (token, id, data) => api.put(`/rooms/${id}`, data, getAuthHeaders(token)),

    // Delete room
    delete: (token, id) => api.delete(`/rooms/${id}`, getAuthHeaders(token)),

    // Toggle room availability
    toggleAvailability: (token, id, isAvailable) =>
        api.patch(`/rooms/${id}/availability`, { isAvailable }, getAuthHeaders(token)),

    // Get available room types
    getTypes: () => api.get('/rooms/types/available'),
};

// =====================
// BOOKING API FUNCTIONS
// =====================

export const bookingAPI = {
    // Create booking
    create: (token, data) => api.post('/bookings', data, getAuthHeaders(token)),

    // Get all bookings (admin)
    getAll: (token) => api.get('/bookings', getAuthHeaders(token)),

    // Get user bookings
    getMyBookings: (token, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/bookings/my-bookings${queryString ? `?${queryString}` : ''}`, getAuthHeaders(token));
    },

    // Get booking by ID
    getById: (token, id) => api.get(`/bookings/${id}`, getAuthHeaders(token)),

    // Get hotel owner bookings
    getOwnerBookings: (token) => api.get('/bookings/owner/bookings', getAuthHeaders(token)),

    // Update booking status
    updateStatus: (token, id, status) =>
        api.patch(`/bookings/${id}/status`, { status }, getAuthHeaders(token)),

    // Update payment status
    updatePayment: (token, id, isPaid, paymentMethod) =>
        api.patch(`/bookings/${id}/payment`, { isPaid, paymentMethod }, getAuthHeaders(token)),

    // Cancel booking
    cancel: (token, id) => api.patch(`/bookings/${id}/cancel`, {}, getAuthHeaders(token)),

    // Delete booking (admin)
    delete: (token, id) => api.delete(`/bookings/${id}`, getAuthHeaders(token)),
};

// Export default api instance for custom requests
export default api;
