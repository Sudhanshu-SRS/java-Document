# Java Documentation System - Setup Instructions

## Complete Full-Stack Application Setup

### Project Structure

```
java-Document/
├── webpage/
│   ├── frontend/          # Web Application (HTML, CSS, JS)
│   └── backend/           # Express.js API Server + MongoDB
├── docs/                  # Documentation content
├── templates/             # Documentation templates
└── [configuration files]
```

### Prerequisites

1. **Node.js** (v14 or higher) - [Download from nodejs.org](https://nodejs.org/)
2. **MongoDB** (v4.4 or higher) - [Download from mongodb.com](https://www.mongodb.com/try/download/community)
3. **Git** - [Download from git-scm.com](https://git-scm.com/downloads)

### Step 1: Setup MongoDB

```powershell
# Start MongoDB service (Windows)
net start MongoDB

# Alternative: Start MongoDB manually
mongod --dbpath C:\data\db
```

### Step 2: Setup Backend API

```powershell
# Navigate to backend directory
cd webpage\backend

# Install dependencies
npm install

# Copy environment configuration
copy .env.example .env

# Edit .env file with your configuration
notepad .env

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3001`

### Step 3: Setup Frontend

```powershell
# Open a new terminal and navigate to frontend directory
cd webpage\frontend

# Option 1: Use npx http-server
npx http-server -p 3000 -c-1

# Option 2: Use Python (if available)
python -m http.server 3000

# Option 3: Use Node.js serve
npx serve -s . -l 3000
```

The frontend will be available at `http://localhost:3000`

## Environment Variables (.env file)

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/java-documentation
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:3000,https://your-netlify-domain.netlify.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repo-name
```

## Deployment

### Deploy Backend (Heroku/Railway/Render)

1. Set up MongoDB Atlas (cloud database)
2. Update MONGODB_URI in production environment
3. Deploy backend to your chosen platform

### Deploy Frontend (Netlify)

1. Build the frontend
2. Deploy to Netlify
3. Update CLIENT_URL in backend environment

## Features

✅ **Persistent Data Storage** - MongoDB database instead of localStorage  
✅ **Team Member Management** - Add, edit, delete team members  
✅ **Assignment Tracking** - Create and track documentation assignments  
✅ **Progress Analytics** - View team performance and progress  
✅ **Activity Logging** - Track all changes and updates  
✅ **GitHub Integration** - Auto-sync with GitHub repositories  
✅ **Responsive Design** - Works on desktop and mobile

## Troubleshooting

### Common Issues

1. **Backend won't start**

   - Check if MongoDB is running
   - Verify Node.js is installed
   - Check if port 3001 is available

2. **Frontend can't connect to backend**

   - Verify backend is running on port 3001
   - Check CORS configuration
   - Update API_BASE_URL in app.js if needed

3. **MongoDB connection issues**
   - Ensure MongoDB service is running
   - Check database connection string
   - Verify database permissions

### Testing the Setup

1. Start MongoDB
2. Start backend (`npm run dev` in webpage/backend)
3. Open frontend in browser
4. Try adding a team member
5. Try creating an assignment
6. Check if data persists after page refresh

## API Endpoints

- `GET /api/team-members` - Get all team members
- `POST /api/team-members` - Create team member
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create assignment
- `GET /api/analytics/overview` - Get analytics data
- `GET /api/activity` - Get activity logs

Visit `http://localhost:3001/health` to check if the backend is running.
