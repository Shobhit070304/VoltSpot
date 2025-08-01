<img src="client/public/charging.png" alt="VoltSpot Logo" height="32" style="vertical-align: middle; margin-right: 8px;"/> <span style="font-size:2em; vertical-align: middle;"><h1>VoltSpot</h1></span>

VoltSpot is a beginner-friendly web application for finding, reviewing, and reporting electric vehicle (EV) charging stations. It allows users to search for stations, leave reviews, report issues, and manage their favorite locations.

## 🚀 Features
- Search for EV charging stations on an interactive map
- View details and ratings for each station
- Leave reviews and ratings as a registered user
- Report issues at charging stations
- Create an account and log in
- Save favorite stations for quick access
- Responsive design for mobile and desktop

## 🛠️ Tech Stack
**Frontend:** React, Vite, Tailwind CSS, React Router

**Backend:** Node.js, Express, MongoDB, Mongoose

## 📁 Project Structure
```
VoltSpot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── services/       # API service functions
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json
├── server/                 # Backend Node.js application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── config/         # Configuration files
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## 🚦 Prerequisites
### Backend (for development)
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Frontend (for development)
- npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### To use the deployed app
- A modern web browser (Chrome, Firefox, Edge, etc.)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd VoltSpot
```

### 2. Install backend dependencies
```bash
cd server
npm install
```

### 3. Install frontend dependencies
```bash
cd ../client
npm install
```

### 4. Set up environment variables
- In `server/.env`:
  ```env
  PORT=5000
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  CLIENT_URL=http://localhost:5173
  ```
- In `client/.env`:
  ```env
  VITE_BASE_URL=http://localhost:5000/api
  ```

### 5. Start the servers
- Backend:
  ```bash
  cd server
  npm run dev
  ```
- Frontend (in a new terminal):
  ```bash
  cd client
  npm run dev
  ```

### 6. Open the app
- Visit [http://localhost:5173](http://localhost:5173) in your browser.

