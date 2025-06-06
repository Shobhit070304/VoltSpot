# ⚡ VoltSpot - EV Charging Station Management System

VoltSpot is a modern, full-stack web application for managing electric vehicle charging stations. Built with React and Node.js, it provides a seamless experience for finding and managing EV charging stations.

## 🌟 Features

### 🔐 Authentication & User Management
- Secure user registration and login
- JWT-based authentication
- Protected routes for authenticated users

### 🚉 Station Management
- Interactive map view of all charging stations
- Create and manage charging stations
- Real-time station status updates
- Detailed station information including:
  - Location coordinates
  - Power output specifications
  - Connector types
  - Operational status

### 🎨 User Interface
- Modern, responsive design
- Interactive maps integration
- Toast notifications for user feedback

## 🛠️ Technical Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Icons**: Lucide React & React Icons
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Validation**: Express Validator
- **Middleware**: 
  - CORS
  - Cookie Parser
  - Morgan (logging)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/voltspot.git
cd voltspot
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Create `.env` file in server directory
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory
```bash
cd client
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in client directory
```env
VITE_API_URL=http://localhost:5000/api
VITE_MAPS_API_KEY=your_maps_api_key
```

4. Start the development server
```bash
npm run dev
```

## 📁 Project Structure

### Frontend Structure
client/<br/>
├── src/<br/>
│ ├── components/<br/>
│ │ ├── Navbar.jsx<br/>
│ │ └── Footer.jsx<br/>
│ ├── pages/<br/>
│ │ ├── Login.jsx<br/>
│ │ ├── Register.jsx<br/>
│ │ ├── Dashboard.jsx<br/>
│ │ ├── MapView.jsx<br/>
│ │ ├── Station.jsx<br/>
│ │ ├── Home.jsx<br/>
│ │ └── LandingPage.jsx<br/>
│ ├── context/<br/>
│ │ └── AuthContext.jsx<br/>
│ └── App.jsx<br/>
|__ index.html


### Backend Structure
server/<br/>
├── src/<br/>
│ ├── routes/<br/>
│ │ ├── auth.js<br/>
│ │ └── stations.js<br/>
│ ├── controllers/<br/>
│ ├── middleware/<br/>
│ ├── config/<br/>
│ ├──models/<br/>
│ └── index.js<br/>
└── server.js



## 📝 API Documentation

### Authentication Endpoints
```http
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
POST /api/auth/logout - Logout user
GET /api/auth/profile - Get user profile (Protected)
```

### Station Endpoints
```http
GET /api/station - Get all stations
GET /api/station/me - Get user's stations (Protected)
GET /api/station/:id - Get specific station (Protected)
POST /api/station/create - Create station (Protected)
PUT /api/station/update/:id - Update station (Protected)
DELETE /api/station/delete/:id - Delete station (Protected)
```

## 🔒 Security Features
- CORS enabled
- Protected routes using JWT
- Input validation
- Error handling middleware
- Secure cookie handling

Made with ❤️ by Shobhit