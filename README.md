# VoltSpot

<img src="client/public/charging.png" alt="VoltSpot Logo" height="32" style="vertical-align: middle; margin-right: 8px;"/> <span style="font-size:2em; vertical-align: middle;">VoltSpot</span>

VoltSpot is a comprehensive web application for finding, reviewing, and managing electric vehicle (EV) charging stations. It provides users with an intuitive platform to discover charging stations, calculate costs, leave reviews, report issues, and manage their favorite locations.

## 🚀 Features

### Core Functionality

- **Interactive Station Search** - Find EV charging stations using location, filters, and keywords
- **Map Integration** - View all nearby charging stations on an interactive map
- **Station Details** - View comprehensive information including ratings, reviews, and amenities
- **Cost Calculator** - Estimate charging costs and time based on your EV and station specifications
- **User Reviews & Ratings** - Read and write reviews for charging stations
- **Issue Reporting** - Report problems at charging stations to help other users
- **Saved Stations** - Bookmark your favorite stations for quick access

### User Experience

- **User Authentication** - Secure login and registration system
- **Personal Dashboard** - Manage your stations, reviews, and saved locations
- **Responsive Design** - Works seamlessly on mobile and desktop devices
- **Dynamic Loading** - Optimized performance with lazy loading components
- **Real-time Updates** - Live data updates and notifications

### Advanced Features

- **EV Database Integration** - Access to comprehensive EV specifications
- **Smart Filtering** - Filter stations by connector type, power output, and status
- **Recently Viewed** - Quick access to recently visited stations
- **Global Search** - Search across all stations with autocomplete suggestions
- **Theme Support** - Light and dark theme options

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Modern icon library

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation middleware

### Development Tools

- **ESLint** - Code linting and formatting
- **Nodemon** - Development server auto-restart
- **Compression** - Response compression middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
VoltSpot/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── cards/         # Card components (StationCard, CostEstimator, etc.)
│   │   │   ├── forms/         # Form components (StationForm, ReviewForm, etc.)
│   │   │   ├── Home/          # Home page specific components
│   │   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   │   └── widgets/       # Widget components (GlobalSearch, RecentlyViewed)
│   │   ├── pages/             # Page components
│   │   │   ├── auth/          # Authentication pages
│   │   │   ├── dashboard/     # User dashboard
│   │   │   ├── general/       # General pages (Home, Landing, 404)
│   │   │   ├── map/           # Map view pages
│   │   │   └── stations/      # Station-related pages
│   │   ├── context/           # React context providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service functions
│   │   └── assets/            # Static assets
│   ├── public/                # Public assets
│   └── package.json
├── server/                     # Backend Node.js application
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   │   ├── cars/          # EV car controllers
│   │   │   ├── stations/      # Station controllers
│   │   │   └── users/         # User controllers
│   │   ├── models/            # MongoDB schemas
│   │   │   ├── cars/          # EV car models
│   │   │   ├── stations/      # Station models
│   │   │   └── users/         # User models
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Custom middleware
│   │   └── config/            # Configuration files
│   ├── server.js              # Main server file
│   └── package.json
└── README.md
```

## 🚦 Prerequisites

### For Development

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Local installation](https://www.mongodb.com/) or [MongoDB Atlas](https://www.mongodb.com/atlas)
- **npm** or **Yarn** - Package managers (comes with Node.js)

### For Production Use

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd VoltSpot
```

### 2. Install Dependencies

#### Backend Dependencies

```bash
cd server
npm install
```

#### Frontend Dependencies

```bash
cd ../client
npm install
```

### 3. Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

#### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_BASE_URL=http://localhost:5000/api
```

### 4. Start the Application

#### Start Backend Server

```bash
cd server
npm run dev
```

The backend will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

### 5. Access the Application

Open your browser and visit [http://localhost:5173](http://localhost:5173)

## 📱 Usage

### For New Users

1. **Browse Stations** - Visit the home page to see all available charging stations
2. **Search & Filter** - Use the search bar and filters to find specific stations
3. **View Details** - Click on any station to see detailed information
4. **Create Account** - Register to access additional features

### For Registered Users

1. **Dashboard** - Access your personal dashboard to manage stations and reviews
2. **Save Stations** - Bookmark your favorite charging stations
3. **Leave Reviews** - Share your experience with other users
4. **Report Issues** - Help maintain station quality by reporting problems
5. **Cost Estimation** - Calculate charging costs for your specific EV

## 🔧 Available Scripts

### Frontend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Backend Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run prod         # Start production server with NODE_ENV=production
npm run lint         # Run ESLint
```

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Stations

- `GET /api/station` - Get all stations
- `GET /api/station/:id` - Get station by ID
- `POST /api/station` - Create new station
- `PUT /api/station/:id` - Update station
- `DELETE /api/station/:id` - Delete station
- `POST /api/station/estimate` - Calculate charging cost

### Reviews & Reports

- `GET /api/review/:stationId` - Get station reviews
- `POST /api/review` - Create review
- `GET /api/report/:stationId` - Get station reports
- `POST /api/report` - Create report

### EV Database

- `GET /api/car/evs` - Get all EV models

**VoltSpot** - Making EV charging accessible and convenient for everyone! ⚡
