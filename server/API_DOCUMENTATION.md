# Hotel Booking API Documentation

## 📋 Table of Contents
- [Server Structure](#server-structure)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Hotel Routes](#hotel-routes)
  - [Room Routes](#room-routes)
  - [Booking Routes](#booking-routes)
- [Data Models](#data-models)
- [Error Handling](#error-handling)

---

## 🏗️ Server Structure

```
server/
├── config/
│   ├── cloudinary.js          # Cloudinary configuration
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── userController.js      # User business logic
│   ├── HotelController.js     # Hotel business logic
│   ├── RoomController.js      # Room business logic
│   └── BookingController.js   # Booking business logic
├── middleware/
│   ├── authMiddleware.js      # Authentication & authorization
│   ├── clerkWebhook.js        # Clerk webhook handler
│   └── uploadMiddleware.js    # File upload handling
├── models/
│   ├── user.js                # User schema
│   ├── hotel.js               # Hotel schema
│   ├── Room.js                # Room schema
│   └── booking.js             # Booking schema
├── routes/
│   ├── userRoutes.js          # User endpoints
│   ├── hotelRoutes.js         # Hotel endpoints
│   ├── roomRoutes.js          # Room endpoints
│   └── bookingRoutes.js       # Booking endpoints
├── .env                       # Environment variables
├── server.js                  # Main application
└── package.json               # Dependencies
```

---

## 🔐 Authentication

### Authentication Provider
**Clerk** - Used for user authentication and session management

### Middleware Chain
1. **clerkMiddleware()** - Validates Clerk session tokens
2. **protect** - Ensures user is authenticated
3. **isHotelOwner** - Ensures user has 'hotelOwner' role

### Protected Routes
Routes marked with 🔒 require authentication  
Routes marked with 👑 require hotel owner role

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000/api
```

---

## 👤 User Routes

### Base Path: `/api/users`

| Method | Endpoint | Auth | Description | Request Body | Response |
|--------|----------|------|-------------|--------------|----------|
| GET | `/profile` | 🔒 | Get current user profile | - | User object |
| PUT | `/profile` | 🔒 | Update user profile | `{username, email, image}` | Updated user |
| POST | `/recent-city` | 🔒 | Add recent searched city | `{city}` | Updated user |
| GET | `/recent-cities` | 🔒 | Get recent searched cities | - | Array of cities |
| PATCH | `/role` | 🔒 | Update user role | `{role: "user" \| "hotelOwner"}` | Updated user |
| DELETE | `/account` | 🔒 | Delete user account | - | Success message |
| GET | `/all` | 🔒 | Get all users (admin) | - | Array of users |

### User Endpoints Details

#### 1. Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <clerk_token>
```

**Response:**
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "_id": "user_123",
    "username": "john_doe",
    "email": "john@example.com",
    "image": "https://...",
    "role": "user",
    "recentSearchedCities": ["New York", "Paris"]
  }
}
```

#### 2. Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "username": "new_username",
  "email": "new@email.com",
  "image": "https://new-image-url.com"
}
```

#### 3. Add Recent City
```http
POST /api/users/recent-city
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "city": "Los Angeles"
}
```

#### 4. Update User Role
```http
PATCH /api/users/role
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "role": "hotelOwner"
}
```

---

## 🏨 Hotel Routes

### Base Path: `/api/hotels`

| Method | Endpoint | Auth | Description | Request Body | Response |
|--------|----------|------|-------------|--------------|----------|
| POST | `/register` | 🔒👑 | Register new hotel | `{name, address, contact, city}` | Created hotel |
| GET | `/` | - | Get all hotels | Query: `?city=` | Array of hotels |
| GET | `/:id` | - | Get hotel by ID | - | Hotel object |
| GET | `/owner/my-hotels` | 🔒👑 | Get hotels by owner | - | Array of hotels |
| PUT | `/:id` | 🔒👑 | Update hotel | `{name, address, contact, city}` | Updated hotel |
| DELETE | `/:id` | 🔒👑 | Delete hotel | - | Success message |
| GET | `/city/:city` | - | Get hotels by city | - | Array of hotels |
| GET | `/cities/available` | - | Get available cities | - | Array of cities |

### Hotel Endpoints Details

#### 1. Register Hotel
```http
POST /api/hotels/register
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "name": "Grand Plaza Hotel",
  "address": "123 Main St, New York, NY 10001",
  "contact": "+1-555-0123",
  "city": "New York"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Hotel registered successfully",
  "data": {
    "_id": "hotel_123",
    "name": "Grand Plaza Hotel",
    "address": "123 Main St, New York, NY 10001",
    "contact": "+1-555-0123",
    "city": "New York",
    "owner": "user_123"
  }
}
```

#### 2. Get All Hotels
```http
GET /api/hotels?city=New York
```

#### 3. Get Hotels by Owner
```http
GET /api/hotels/owner/my-hotels
Authorization: Bearer <clerk_token>
```

#### 4. Update Hotel
```http
PUT /api/hotels/hotel_123
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "name": "Updated Hotel Name",
  "contact": "+1-555-9999"
}
```

---

## 🛏️ Room Routes

### Base Path: `/api/rooms`

| Method | Endpoint | Auth | Description | Request Body | Response |
|--------|----------|------|-------------|--------------|----------|
| POST | `/` | 🔒👑 | Add new room | Room object + images | Created room |
| GET | `/` | - | Get all rooms | Query params | Array of rooms |
| GET | `/:id` | - | Get room by ID | - | Room object |
| GET | `/hotel/:hotelId` | - | Get rooms by hotel | - | Array of rooms |
| GET | `/owner/my-rooms` | 🔒👑 | Get rooms by owner | - | Array of rooms |
| PUT | `/:id` | 🔒👑 | Update room | Room object | Updated room |
| DELETE | `/:id` | 🔒👑 | Delete room | - | Success message |
| PATCH | `/:id/availability` | 🔒👑 | Toggle availability | `{isAvailable}` | Updated room |
| GET | `/types/available` | - | Get room types | - | Array of types |

### Room Endpoints Details

#### 1. Add Room
```http
POST /api/rooms
Authorization: Bearer <clerk_token>
Content-Type: multipart/form-data

{
  "hotel": "hotel_123",
  "roomType": "Deluxe Suite",
  "pricePerNight": 250,
  "amenities": ["WiFi", "TV", "Mini Bar"],
  "maxGuests": 4,
  "bedrooms": 2,
  "bathrooms": 2,
  "description": "Luxurious suite with city view",
  "isAvailable": true,
  "images": [File, File, File]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Room added successfully",
  "data": {
    "_id": "room_123",
    "hotel": "hotel_123",
    "roomType": "Deluxe Suite",
    "pricePerNight": 250,
    "amenities": ["WiFi", "TV", "Mini Bar"],
    "images": ["https://cloudinary.../1.jpg", "https://cloudinary.../2.jpg"],
    "isAvailable": true,
    "maxGuests": 4,
    "bedrooms": 2,
    "bathrooms": 2,
    "description": "Luxurious suite with city view"
  }
}
```

#### 2. Get All Rooms
```http
GET /api/rooms?city=New York&minPrice=100&maxPrice=500&roomType=Suite&isAvailable=true
```

**Query Parameters:**
- `city` - Filter by city
- `minPrice` - Minimum price per night
- `maxPrice` - Maximum price per night
- `roomType` - Filter by room type
- `isAvailable` - Filter by availability (true/false)

#### 3. Get Rooms by Hotel
```http
GET /api/rooms/hotel/hotel_123
```

#### 4. Update Room
```http
PUT /api/rooms/room_123
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "pricePerNight": 300,
  "amenities": ["WiFi", "TV", "Mini Bar", "Jacuzzi"]
}
```

#### 5. Toggle Room Availability
```http
PATCH /api/rooms/room_123/availability
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "isAvailable": false
}
```

#### 6. Get Available Room Types
```http
GET /api/rooms/types/available
```

**Response:**
```json
{
  "success": true,
  "data": ["Standard", "Deluxe", "Suite", "Presidential Suite"]
}
```

---

## 📅 Booking Routes

### Base Path: `/api/bookings`

| Method | Endpoint | Auth | Description | Request Body | Response |
|--------|----------|------|-------------|--------------|----------|
| POST | `/` | 🔒 | Create booking | Booking object | Created booking |
| GET | `/` | 🔒 | Get all bookings (admin) | - | Array of bookings |
| GET | `/my-bookings` | 🔒 | Get user bookings | Query: `?status=&isPaid=` | Array of bookings |
| GET | `/:id` | 🔒 | Get booking by ID | - | Booking object |
| GET | `/owner/bookings` | 🔒👑 | Get hotel owner bookings | - | Array of bookings |
| PATCH | `/:id/status` | 🔒👑 | Update booking status | `{status}` | Updated booking |
| PATCH | `/:id/payment` | 🔒 | Update payment status | `{isPaid, paymentMethod}` | Updated booking |
| PATCH | `/:id/cancel` | 🔒 | Cancel booking | - | Updated booking |
| DELETE | `/:id` | 🔒 | Delete booking (admin) | - | Success message |

### Booking Endpoints Details

#### 1. Create Booking
```http
POST /api/bookings
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "room": "room_123",
  "hotel": "hotel_123",
  "checkInDate": "2025-11-01",
  "checkOutDate": "2025-11-05",
  "guests": 2,
  "paymentMethod": "credit_card"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "booking_123",
    "user": "user_123",
    "room": "room_123",
    "hotel": "hotel_123",
    "checkInDate": "2025-11-01T00:00:00.000Z",
    "checkOutDate": "2025-11-05T00:00:00.000Z",
    "totalPrice": 1000,
    "guests": 2,
    "status": "pending",
    "paymentMethod": "credit_card",
    "isPaid": false
  }
}
```

**Validation:**
- Check-in date must be in the future
- Check-out date must be after check-in date
- Room must be available
- No overlapping bookings for the same room

#### 2. Get User Bookings
```http
GET /api/bookings/my-bookings?status=confirmed&isPaid=true
```

**Query Parameters:**
- `status` - Filter by status (pending/confirmed/cancelled)
- `isPaid` - Filter by payment status (true/false)

**Response:**
```json
{
  "success": true,
  "message": "Bookings fetched successfully",
  "data": [
    {
      "_id": "booking_123",
      "user": {...},
      "room": {...},
      "hotel": {...},
      "checkInDate": "2025-11-01T00:00:00.000Z",
      "checkOutDate": "2025-11-05T00:00:00.000Z",
      "totalPrice": 1000,
      "guests": 2,
      "status": "confirmed",
      "isPaid": true
    }
  ]
}
```

#### 3. Get Hotel Owner Bookings
```http
GET /api/bookings/owner/bookings
Authorization: Bearer <clerk_token>
```

#### 4. Update Booking Status
```http
PATCH /api/bookings/booking_123/status
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Allowed Status Values:**
- `pending` - Initial state
- `confirmed` - Hotel owner confirmed
- `cancelled` - User or owner cancelled

#### 5. Update Payment Status
```http
PATCH /api/bookings/booking_123/payment
Authorization: Bearer <clerk_token>
Content-Type: application/json

{
  "isPaid": true,
  "paymentMethod": "credit_card"
}
```

**Payment Methods:**
- `credit_card`
- `debit_card`
- `paypal`
- `cash`

#### 6. Cancel Booking
```http
PATCH /api/bookings/booking_123/cancel
Authorization: Bearer <clerk_token>
```

---

## 🗂️ Data Models

### User Model
```javascript
{
  _id: String,              // Clerk user ID
  username: String,
  email: String,
  image: String,            // Profile image URL
  role: String,             // "user" | "hotelOwner"
  recentSearchedCities: [String]
}
```

### Hotel Model
```javascript
{
  _id: ObjectId,
  name: String,             // Required
  address: String,          // Required
  contact: String,          // Required
  city: String,             // Required
  owner: ObjectId,          // Reference to User
  createdAt: Date,
  updatedAt: Date
}
```

### Room Model
```javascript
{
  _id: ObjectId,
  hotel: ObjectId,          // Reference to Hotel
  roomType: String,         // Required
  pricePerNight: Number,    // Required
  amenities: [String],      // ["WiFi", "TV", etc.]
  images: [String],         // Cloudinary URLs
  isAvailable: Boolean,     // Default: true
  maxGuests: Number,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  _id: ObjectId,
  user: ObjectId,           // Reference to User
  room: ObjectId,           // Reference to Room
  hotel: ObjectId,          // Reference to Hotel
  checkInDate: Date,        // Required
  checkOutDate: Date,       // Required
  totalPrice: Number,       // Required
  guests: Number,           // Required
  status: String,           // "pending" | "confirmed" | "cancelled"
  paymentMethod: String,    // "credit_card" | "debit_card" | "paypal" | "cash"
  isPaid: Boolean,          // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚨 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (e.g., overlapping booking) |
| 500 | Internal Server Error |

### Example Error Responses

#### Validation Error (400)
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

#### Authentication Error (401)
```json
{
  "success": false,
  "message": "Authentication required"
}
```

#### Authorization Error (403)
```json
{
  "success": false,
  "message": "You are not authorized to perform this action"
}
```

#### Not Found Error (404)
```json
{
  "success": false,
  "message": "Room not found"
}
```

#### Conflict Error (409)
```json
{
  "success": false,
  "message": "Room is already booked for these dates"
}
```

---

## 🔧 Middleware

### Authentication Middleware

#### protect
- Validates Clerk authentication token
- Attaches user to `req.user`
- Returns 401 if not authenticated

#### isHotelOwner
- Checks if user role is "hotelOwner"
- Returns 403 if user is not hotel owner
- Must be used after `protect` middleware

### Upload Middleware

#### uploadSingle(fieldName)
- Upload single image to Cloudinary
- Field name: typically "image"
- Max size: 5MB
- Allowed formats: jpg, jpeg, png, webp

#### uploadMultiple(fieldName, maxCount)
- Upload multiple images to Cloudinary
- Field name: typically "images"
- Max count: configurable
- Max size per file: 5MB

### Webhook Middleware

#### clerkWebhooks
- Handles Clerk webhook events
- Events: user.created, user.updated, user.deleted
- Verifies webhook signature using Svix

---

## 📝 Environment Variables

Required environment variables in `.env`:

```env
# MongoDB
MONGODB_URI=mongodb://...

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=3000
NODE_ENV=development
```

---

## 🚀 Server Endpoints Summary

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-21T12:00:00.000Z"
}
```

### Webhook
```http
POST /api/webhooks/clerk
Content-Type: application/json
Svix-Signature: ...
```

---

## 📊 Complete API Routes Tree

```
/api
├── /health                        GET    - Health check
├── /webhooks
│   └── /clerk                     POST   - Clerk webhooks
├── /users
│   ├── /profile                   GET    🔒 - Get profile
│   ├── /profile                   PUT    🔒 - Update profile
│   ├── /recent-city               POST   🔒 - Add recent city
│   ├── /recent-cities             GET    🔒 - Get recent cities
│   ├── /role                      PATCH  🔒 - Update role
│   ├── /account                   DELETE 🔒 - Delete account
│   └── /all                       GET    🔒 - Get all users
├── /hotels
│   ├── /                          GET    - Get all hotels
│   ├── /                          POST   🔒👑 - Register hotel (as /register)
│   ├── /:id                       GET    - Get hotel by ID
│   ├── /:id                       PUT    🔒👑 - Update hotel
│   ├── /:id                       DELETE 🔒👑 - Delete hotel
│   ├── /owner/my-hotels           GET    🔒👑 - Get owner's hotels
│   ├── /city/:city                GET    - Get hotels by city
│   └── /cities/available          GET    - Get available cities
├── /rooms
│   ├── /                          GET    - Get all rooms
│   ├── /                          POST   🔒👑 - Add room
│   ├── /:id                       GET    - Get room by ID
│   ├── /:id                       PUT    🔒👑 - Update room
│   ├── /:id                       DELETE 🔒👑 - Delete room
│   ├── /:id/availability          PATCH  🔒👑 - Toggle availability
│   ├── /hotel/:hotelId            GET    - Get rooms by hotel
│   ├── /owner/my-rooms            GET    🔒👑 - Get owner's rooms
│   └── /types/available           GET    - Get room types
└── /bookings
    ├── /                          GET    🔒 - Get all bookings (admin)
    ├── /                          POST   🔒 - Create booking
    ├── /:id                       GET    🔒 - Get booking by ID
    ├── /:id                       DELETE 🔒 - Delete booking (admin)
    ├── /:id/status                PATCH  🔒👑 - Update status
    ├── /:id/payment               PATCH  🔒 - Update payment
    ├── /:id/cancel                PATCH  🔒 - Cancel booking
    ├── /my-bookings               GET    🔒 - Get user bookings
    └── /owner/bookings            GET    🔒👑 - Get owner bookings
```

**Legend:**
- 🔒 = Authentication required (protect middleware)
- 👑 = Hotel owner role required (isHotelOwner middleware)

---

## 💡 Frontend Integration Tips

### 1. Authentication Setup
```javascript
import { useAuth } from '@clerk/clerk-react';

const { getToken } = useAuth();
const token = await getToken();

// Add to all authenticated requests
headers: {
  'Authorization': `Bearer ${token}`
}
```

### 2. API Base URL Configuration
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

### 3. Example API Service
```javascript
// services/api.js
export const api = {
  // Users
  getUserProfile: () => fetch(`${API_BASE_URL}/users/profile`),
  updateProfile: (data) => fetch(`${API_BASE_URL}/users/profile`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  // Hotels
  getAllHotels: (city) => fetch(`${API_BASE_URL}/hotels?city=${city}`),
  registerHotel: (data) => fetch(`${API_BASE_URL}/hotels/register`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  // Rooms
  getAllRooms: (filters) => {
    const params = new URLSearchParams(filters);
    return fetch(`${API_BASE_URL}/rooms?${params}`);
  },
  addRoom: (formData) => fetch(`${API_BASE_URL}/rooms`, {
    method: 'POST',
    body: formData // multipart/form-data
  }),
  
  // Bookings
  createBooking: (data) => fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getMyBookings: (status, isPaid) => {
    const params = new URLSearchParams({ status, isPaid });
    return fetch(`${API_BASE_URL}/bookings/my-bookings?${params}`);
  }
};
```

### 4. File Upload Example
```javascript
const uploadRoom = async (roomData) => {
  const formData = new FormData();
  
  // Add room data
  formData.append('hotel', roomData.hotel);
  formData.append('roomType', roomData.roomType);
  formData.append('pricePerNight', roomData.pricePerNight);
  
  // Add amenities as JSON string
  formData.append('amenities', JSON.stringify(roomData.amenities));
  
  // Add images
  roomData.images.forEach(image => {
    formData.append('images', image);
  });
  
  const response = await fetch(`${API_BASE_URL}/rooms`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  return response.json();
};
```

### 5. Error Handling
```javascript
const handleApiError = (error) => {
  if (error.status === 401) {
    // Redirect to login
  } else if (error.status === 403) {
    // Show permission denied
  } else if (error.status === 404) {
    // Show not found
  } else {
    // Show general error
  }
};
```

---

## 📚 Additional Notes

### Date Handling
- All dates are stored in ISO 8601 format
- Check-in/check-out dates should be sent as strings: `"2025-11-01"`
- Server validates dates and prevents past dates

### Image Upload
- Single image: Use `uploadSingle` middleware
- Multiple images: Use `uploadMultiple` middleware
- Max file size: 5MB per image
- Supported formats: jpg, jpeg, png, webp
- Images are automatically uploaded to Cloudinary

### Booking Logic
- Server prevents overlapping bookings automatically
- Total price is calculated: `(checkOut - checkIn) × pricePerNight`
- Room availability is checked before booking
- Users can only view/modify their own bookings
- Hotel owners can view all bookings for their hotels

### Population
All GET endpoints automatically populate referenced fields:
- Bookings populate: user, room, hotel
- Rooms populate: hotel
- Hotels populate: owner

---

**Last Updated:** October 21, 2025  
**API Version:** 1.0.0  
**Server Port:** 3000
