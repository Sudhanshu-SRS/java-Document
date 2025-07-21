# Java Documentation Web Application

## 📁 Project Structure

```
webpage/
├── frontend/              # Client-side application
│   ├── index.html        # Main dashboard interface
│   ├── app.js            # Core application logic
│   ├── styles.css        # Complete CSS styling
│   ├── github-integration.js # GitHub API integration
│   ├── netlify.toml      # Deployment configuration
│   └── README.md         # Frontend documentation
└── backend/              # Server-side API
    ├── models/           # MongoDB schemas
    │   ├── TeamMember.js # Team member data model
    │   ├── Assignment.js # Assignment tracking model
    │   └── ActivityLog.js # Activity logging model
    ├── routes/           # API endpoints
    │   ├── teamMembers.js # Team management API
    │   ├── assignments.js # Assignment management API
    │   ├── analytics.js   # Analytics and reporting API
    │   └── activity.js    # Activity logging API
    ├── server.js         # Express.js server
    ├── package.json      # Node.js dependencies
    ├── .env.example      # Environment configuration template
    └── README.md         # Backend documentation
```

## 🚀 Quick Start

### 1. **Start Backend** (Required)

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### 2. **Start Frontend**

```bash
cd frontend
npx http-server -p 3000 -c-1
```

### 3. **Access Application**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 🔧 Configuration

### **Environment Variables** (backend/.env)

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/java-documentation
CLIENT_URL=http://localhost:3000
```

### **Frontend Configuration** (frontend/app.js)

```javascript
const API_BASE_URL = "http://localhost:3001/api";
```

## 📊 Features

### **Team Management**

- ✅ Add, edit, delete team members
- ✅ Track skills and expertise
- ✅ Monitor assignment counts
- ✅ Role-based organization

### **Assignment Tracking**

- ✅ Create documentation assignments
- ✅ Set due dates and priorities
- ✅ Track progress and status
- ✅ Add notes and comments

### **Analytics & Reporting**

- ✅ Team performance metrics
- ✅ Completion rates
- ✅ Productivity insights
- ✅ Activity timeline

### **GitHub Integration**

- ✅ Automatic README updates
- ✅ Real-time synchronization
- ✅ GitHub API integration
- ✅ Manual export options

## 🚀 Deployment

### **Frontend (Netlify)**

1. Deploy `frontend/` folder to Netlify
2. Update `API_BASE_URL` to production backend URL
3. Configure custom domain (optional)

### **Backend (Heroku/Railway/Render)**

1. Deploy `backend/` folder to your preferred platform
2. Set up MongoDB Atlas (cloud database)
3. Configure environment variables
4. Update frontend `API_BASE_URL`

## 📱 Mobile Support

The application is fully responsive and optimized for:

- 📱 **Mobile phones** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Laptops** (1024px+)
- 🖥️ **Desktops** (1200px+)

## 🔐 Security Features

- **CORS Protection** - Configured for specific origins
- **Rate Limiting** - Prevents API abuse
- **Input Validation** - MongoDB schema validation
- **Error Handling** - Comprehensive error responses
- **Security Headers** - Helmet.js protection

## 📈 API Endpoints

### **Team Members**

- `GET /api/team-members` - List all team members
- `POST /api/team-members` - Create new team member
- `PUT /api/team-members/:id` - Update team member
- `DELETE /api/team-members/:id` - Delete team member

### **Assignments**

- `GET /api/assignments` - List all assignments
- `POST /api/assignments` - Create new assignment
- `PUT /api/assignments/:id` - Update assignment
- `PATCH /api/assignments/:id/status` - Update status only
- `DELETE /api/assignments/:id` - Delete assignment

### **Analytics**

- `GET /api/analytics/overview` - Overview statistics
- `GET /api/analytics/team-performance` - Team metrics
- `GET /api/analytics/weekly-progress` - Weekly data

### **Activity**

- `GET /api/activity` - Activity logs
- `GET /api/activity/recent` - Recent activities
- `POST /api/activity` - Log new activity

## 🛠️ Development

### **Frontend Development**

```bash
cd frontend
# Live reload server
npx live-server --port=3000 --entry-file=index.html
```

### **Backend Development**

```bash
cd backend
# Development with auto-restart
npm run dev
```

### **Database Development**

```bash
# Connect to MongoDB
mongo mongodb://localhost:27017/java-documentation

# View collections
show collections
db.teammembers.find()
db.assignments.find()
```

## 🔧 Troubleshooting

### **Common Issues**

1. **Backend won't start**

   - Check MongoDB is running
   - Verify port 3001 is available
   - Check environment variables

2. **Frontend can't connect**

   - Verify backend is running
   - Check API_BASE_URL configuration
   - Check browser console for CORS errors

3. **Database connection failed**
   - Ensure MongoDB service is running
   - Check connection string in .env
   - Verify database permissions

### **Debug Mode**

```bash
# Backend debug
DEBUG=* npm run dev

# Check API health
curl http://localhost:3001/health
```

## 📚 Documentation

- **Frontend**: See `frontend/README.md`
- **Backend**: See `backend/README.md`
- **Setup**: See `../SETUP_INSTRUCTIONS.md`
- **Sync Guide**: See `../SYNC_GUIDE.md`

## 🎯 Next Steps

1. **Deploy to production** using Netlify + Heroku/Railway
2. **Set up MongoDB Atlas** for cloud database
3. **Configure GitHub integration** for auto-sync
4. **Customize styling** to match your team's branding
5. **Add team members** and start assigning documentation tasks

**Your professional documentation management system is ready! 🚀**
