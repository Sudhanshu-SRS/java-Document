# Java Documentation Backend

## Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
copy .env.example .env
# Edit .env with your configuration
```

3. Start MongoDB:

```bash
# Make sure MongoDB is running on your system
# Default connection: mongodb://localhost:27017/java-documentation
```

4. Start the server:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Team Members

- `GET /api/team-members` - Get all team members
- `POST /api/team-members` - Create new team member
- `GET /api/team-members/:id` - Get team member by ID
- `PUT /api/team-members/:id` - Update team member
- `DELETE /api/team-members/:id` - Delete team member

### Assignments

- `GET /api/assignments` - Get all assignments (with filters)
- `POST /api/assignments` - Create new assignment
- `GET /api/assignments/:id` - Get assignment by ID
- `PUT /api/assignments/:id` - Update assignment
- `PATCH /api/assignments/:id/status` - Update assignment status
- `POST /api/assignments/:id/notes` - Add note to assignment
- `DELETE /api/assignments/:id` - Delete assignment

### Analytics

- `GET /api/analytics/overview` - Get overview statistics
- `GET /api/analytics/team-performance` - Get team performance data
- `GET /api/analytics/weekly-progress` - Get weekly progress data
- `GET /api/analytics/category-progress` - Get category progress
- `GET /api/analytics/productivity` - Get productivity metrics

### Activity Logs

- `GET /api/activity` - Get all activities (with filters)
- `GET /api/activity/recent` - Get recent activities
- `GET /api/activity/member/:memberId` - Get activities by member
- `GET /api/activity/stats` - Get activity statistics

## Database Schema

The application uses MongoDB with the following collections:

- `teammembers` - Team member information
- `assignments` - Assignment details and tracking
- `activitylogs` - Activity and change logs

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3001)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens (if auth is added later)
- `CLIENT_URL` - Allowed CORS origins
