# VoltSpot - Intelligent EV Charging Network Management

A comprehensive platform for managing electric vehicle charging infrastructure with real-time analytics, AI optimization, and seamless scalability for enterprises and municipalities.

## 🚀 Features

### Core Functionality
- **Dashboard Overview** - Real-time monitoring of charging station activity, reports, and usage statistics
- **Interactive Map View** - Visual representation of charging stations with location-based search
- **Station Management** - Add, edit, and manage charging station information
- **User Authentication** - Secure login/registration system with JWT tokens
- **Reviews & Ratings** - User-generated reviews and ratings for charging stations
- **Report System** - Report issues or problems with charging stations
- **Saved Stations** - Bookmark and save favorite charging stations

### Technical Features
- **Responsive Design** - Modern, mobile-first UI built with Tailwind CSS
- **Real-time Updates** - Live data synchronization across the platform
- **3D Visualization** - Interactive 3D maps using Three.js and React Three Fiber
- **Progressive Web App** - Fast, reliable, and engaging user experience
- **RESTful API** - Scalable backend architecture with Express.js

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **Framer Motion** - Animation library
- **Three.js & React Three Fiber** - 3D graphics and visualization
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Express Validator** - Input validation

## 📁 Project Structure

```
VoltSpot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service functions
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── config/        # Configuration files
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VoltSpot
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Available Scripts

### Frontend (client/)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend (server/)
```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Stations
- `GET /api/station` - Get all stations
- `POST /api/station` - Create new station
- `GET /api/station/:id` - Get station by ID
- `PUT /api/station/:id` - Update station
- `DELETE /api/station/:id` - Delete station

### Reviews
- `GET /api/review/:stationId` - Get reviews for station
- `POST /api/review` - Create new review
- `PUT /api/review/:id` - Update review
- `DELETE /api/review/:id` - Delete review

### Reports
- `GET /api/report` - Get all reports
- `POST /api/report` - Create new report
- `PUT /api/report/:id` - Update report status

## 🎯 Key Features Explained

### Dashboard
- Real-time statistics and analytics
- Quick access to station management
- User activity overview

### Map View
- Interactive 3D map visualization
- Station location markers
- Real-time status updates
- Search and filter functionality

### Station Management
- Add new charging stations with detailed information
- Edit existing station details
- Monitor station status and performance
- View user reviews and ratings

### User System
- Secure authentication with JWT
- User profiles and preferences
- Saved stations functionality
- Review and rating system

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Protected routes middleware

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy

### Backend (Render)
1. Set environment variables
2. Deploy using the platform's dashboard
3. Ensure MongoDB connection is configured

## 👥 Authors

- **Made by Shobhit** 