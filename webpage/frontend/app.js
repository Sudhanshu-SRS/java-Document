// Application State and API Configuration
// 🔧 DEPLOYMENT: Change this to your Railway/Render backend URL after deployment
// Example: const API_BASE_URL = 'https://web-production-abc123.up.railway.app/api';
const API_BASE_URL = 'http://localhost:3001/api';

class DocumentationManager {
    constructor() {
        this.assignments = [];
        this.teamMembers = [];
        this.documentation = this.loadDocumentation(); // Keep documentation in localStorage for now
        this.currentEditingId = null;
        
        this.init();
    }

    // Initialize the application
    async init() {
        this.setupEventListeners();
        
        try {
            // Load data from backend
            await this.loadTeamMembersFromAPI();
            await this.loadAssignmentsFromAPI();
            
            this.renderDashboard();
            this.renderAssignments();
            this.renderTeam();
            this.renderDocumentationTree();
            this.updateProgressStats();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load data from server. Please check your connection.');
            
            // Fallback to localStorage
            this.assignments = this.loadAssignments();
            this.teamMembers = this.loadTeamMembers();
            this.renderDashboard();
            this.renderAssignments();
            this.renderTeam();
            this.renderDocumentationTree();
            this.updateProgressStats();
        }
    }

    // API Methods
    async apiRequest(endpoint, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async loadTeamMembersFromAPI() {
        try {
            const data = await this.apiRequest('/team-members');
            this.teamMembers = data.members || data;
        } catch (error) {
            console.error('Failed to load team members:', error);
            this.teamMembers = this.getDefaultTeamMembers();
        }
    }

    async loadAssignmentsFromAPI() {
        try {
            const data = await this.apiRequest('/assignments');
            this.assignments = data.assignments || data;
        } catch (error) {
            console.error('Failed to load assignments:', error);
            this.assignments = this.getDefaultAssignments();
        }
    }

    async saveTeamMemberToAPI(member) {
        if (member._id) {
            return await this.apiRequest(`/team-members/${member._id}`, {
                method: 'PUT',
                body: JSON.stringify(member)
            });
        } else {
            return await this.apiRequest('/team-members', {
                method: 'POST',
                body: JSON.stringify(member)
            });
        }
    }

    async saveAssignmentToAPI(assignment) {
        if (assignment._id) {
            return await this.apiRequest(`/assignments/${assignment._id}`, {
                method: 'PUT',
                body: JSON.stringify(assignment)
            });
        } else {
            return await this.apiRequest('/assignments', {
                method: 'POST',
                body: JSON.stringify(assignment)
            });
        }
    }

    async deleteTeamMemberFromAPI(id) {
        return await this.apiRequest(`/team-members/${id}`, {
            method: 'DELETE'
        });
    }

    async deleteAssignmentFromAPI(id) {
        return await this.apiRequest(`/assignments/${id}`, {
            method: 'DELETE'
        });
    }

    // Load data from localStorage (fallback) or use defaults
    loadAssignments() {
        const stored = localStorage.getItem('documentation-assignments');
        return stored ? JSON.parse(stored) : this.getDefaultAssignments();
    }

    loadTeamMembers() {
        const stored = localStorage.getItem('team-members');
        return stored ? JSON.parse(stored) : this.getDefaultTeamMembers();
    }

    loadDocumentation() {
        const stored = localStorage.getItem('documentation-files');
        return stored ? JSON.parse(stored) : this.getDefaultDocumentation();
    }

    // Save data to localStorage (fallback)
    saveAssignments() {
        localStorage.setItem('documentation-assignments', JSON.stringify(this.assignments));
    }

    saveTeamMembers() {
        localStorage.setItem('team-members', JSON.stringify(this.teamMembers));
    }

    saveDocumentation() {
        localStorage.setItem('documentation-files', JSON.stringify(this.documentation));
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'position:fixed;top:20px;right:20px;background:#f44336;color:white;padding:15px;border-radius:5px;z-index:1000;';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (document.body.contains(errorDiv)) {
                document.body.removeChild(errorDiv);
            }
        }, 5000);
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = 'position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:15px;border-radius:5px;z-index:1000;';
        successDiv.textContent = message;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 3000);
    }

    // Default data
    getDefaultAssignments() {
        return [
            {
                id: 1,
                topic: "Abstract Classes in Java",
                category: "core-java",
                assignee: "John Smith",
                assigneeId: 1,
                status: "in-progress",
                priority: "high",
                dueDate: "2025-07-25",
                description: "Document abstract classes with real-world examples",
                createdAt: "2025-07-21",
                progress: 60
            },
            {
                id: 2,
                topic: "Object-Oriented Programming",
                category: "core-java",
                assignee: "Jane Doe",
                assigneeId: 2,
                status: "pending",
                priority: "medium",
                dueDate: "2025-07-27",
                description: "Cover OOP principles with examples",
                createdAt: "2025-07-21",
                progress: 0
            },
            {
                id: 3,
                topic: "Spring Boot Fundamentals",
                category: "backend",
                assignee: "Mike Johnson",
                assigneeId: 3,
                status: "review",
                priority: "high",
                dueDate: "2025-07-24",
                description: "Complete guide to Spring Boot basics",
                createdAt: "2025-07-20",
                progress: 90
            },
            {
                id: 4,
                topic: "React.js Fundamentals",
                category: "frontend",
                assignee: "Sarah Wilson",
                assigneeId: 4,
                status: "completed",
                priority: "medium",
                dueDate: "2025-07-22",
                description: "Comprehensive React.js documentation",
                createdAt: "2025-07-18",
                progress: 100
            }
        ];
    }

    getDefaultTeamMembers() {
        return [
            {
                id: 1,
                name: "John Smith",
                email: "john.smith@company.com",
                role: "developer",
                skills: ["Java", "Spring Boot", "Microservices"],
                assignedTopics: 2,
                completedTopics: 1,
                joinDate: "2025-01-15"
            },
            {
                id: 2,
                name: "Jane Doe",
                email: "jane.doe@company.com",
                role: "developer",
                skills: ["Java", "OOP", "Design Patterns"],
                assignedTopics: 1,
                completedTopics: 0,
                joinDate: "2025-01-20"
            },
            {
                id: 3,
                name: "Mike Johnson",
                email: "mike.johnson@company.com",
                role: "lead",
                skills: ["Java", "Spring Boot", "Architecture"],
                assignedTopics: 1,
                completedTopics: 2,
                joinDate: "2025-01-10"
            },
            {
                id: 4,
                name: "Sarah Wilson",
                email: "sarah.wilson@company.com",
                role: "developer",
                skills: ["React", "JavaScript", "Frontend"],
                assignedTopics: 1,
                completedTopics: 1,
                joinDate: "2025-01-25"
            }
        ];
    }

    getDefaultDocumentation() {
        return {
            "core-java": {
                "Abstract Classes": {
                    path: "docs/core-java/abstract-classes.md",
                    status: "in-progress",
                    author: "John Smith"
                },
                "Object-Oriented Programming": {
                    path: "docs/core-java/oop.md",
                    status: "pending",
                    author: "Jane Doe"
                }
            },
            "backend": {
                "Spring Boot Fundamentals": {
                    path: "docs/backend/spring-boot-fundamentals.md",
                    status: "review",
                    author: "Mike Johnson"
                }
            },
            "frontend": {
                "React.js Fundamentals": {
                    path: "docs/frontend/react-fundamentals.md",
                    status: "completed",
                    author: "Sarah Wilson"
                }
            }
        };
    }

    // Event Listeners
    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Assignment modal
        document.getElementById('add-assignment-btn').addEventListener('click', () => {
            this.openAssignmentModal();
        });

        document.getElementById('assignment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAssignment();
        });

        // Team member modal
        document.getElementById('add-member-btn').addEventListener('click', () => {
            this.openMemberModal();
        });

        document.getElementById('member-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveMember();
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close, #cancel-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Filters
        document.getElementById('category-filter').addEventListener('change', () => {
            this.filterAssignments();
        });

        document.getElementById('status-filter').addEventListener('change', () => {
            this.filterAssignments();
        });

        document.getElementById('search-filter').addEventListener('input', () => {
            this.filterAssignments();
        });

        // Export and sync buttons
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('sync-github').addEventListener('click', () => {
            this.syncWithGitHub();
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });
    }

    // Tab Management
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Refresh content if needed
        if (tabName === 'analytics') {
            this.renderAnalytics();
        }
    }

    // Dashboard Rendering
    renderDashboard() {
        this.updateProgressStats();
        this.renderTodaySchedule();
        this.renderUpcomingDeadlines();
        this.renderRecentActivity();
    }

    updateProgressStats() {
        const completed = this.assignments.filter(a => a.status === 'completed').length;
        const inProgress = this.assignments.filter(a => a.status === 'in-progress').length;
        const pending = this.assignments.filter(a => a.status === 'pending').length;
        const total = this.assignments.length;

        document.getElementById('completed-count').textContent = completed;
        document.getElementById('in-progress-count').textContent = inProgress;
        document.getElementById('pending-count').textContent = pending;

        const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
        document.getElementById('progress-percent').textContent = `${progressPercent}%`;
        document.getElementById('overall-progress').style.width = `${progressPercent}%`;
    }

    renderTodaySchedule() {
        const today = new Date().toISOString().split('T')[0];
        const todayAssignments = this.assignments.filter(a => a.dueDate === today);

        const container = document.getElementById('today-schedule');
        if (todayAssignments.length === 0) {
            container.innerHTML = '<p style="color: #718096; text-align: center;">No assignments due today</p>';
            return;
        }

        container.innerHTML = todayAssignments.map(assignment => `
            <div class="schedule-item ${assignment.priority}">
                <div class="item-title">${assignment.topic}</div>
                <div class="item-meta">
                    <i class="fas fa-user"></i> ${assignment.assignee} •
                    <span class="status-badge ${assignment.status}">${assignment.status}</span>
                </div>
            </div>
        `).join('');
    }

    renderUpcomingDeadlines() {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        const upcoming = this.assignments
            .filter(a => {
                const dueDate = new Date(a.dueDate);
                return dueDate > today && dueDate <= nextWeek && a.status !== 'completed';
            })
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        const container = document.getElementById('upcoming-deadlines');
        if (upcoming.length === 0) {
            container.innerHTML = '<p style="color: #718096; text-align: center;">No upcoming deadlines</p>';
            return;
        }

        container.innerHTML = upcoming.map(assignment => {
            const daysLeft = Math.ceil((new Date(assignment.dueDate) - today) / (1000 * 60 * 60 * 24));
            return `
                <div class="deadline-item">
                    <div class="item-title">${assignment.topic}</div>
                    <div class="item-meta">
                        <i class="fas fa-clock"></i> ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left •
                        <i class="fas fa-user"></i> ${assignment.assignee}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderRecentActivity() {
        const activities = [
            { type: 'completed', user: 'Sarah Wilson', topic: 'React.js Fundamentals', time: '2 hours ago' },
            { type: 'started', user: 'John Smith', topic: 'Abstract Classes', time: '5 hours ago' },
            { type: 'review', user: 'Mike Johnson', topic: 'Spring Boot Fundamentals', time: '1 day ago' },
            { type: 'assigned', user: 'Jane Doe', topic: 'Object-Oriented Programming', time: '1 day ago' }
        ];

        const container = document.getElementById('recent-activity');
        container.innerHTML = activities.map(activity => {
            const icons = {
                completed: 'fas fa-check-circle',
                started: 'fas fa-play-circle',
                review: 'fas fa-eye',
                assigned: 'fas fa-user-plus'
            };

            return `
                <div class="activity-item">
                    <div class="item-title">
                        <i class="${icons[activity.type]}"></i>
                        ${activity.user} ${activity.type} "${activity.topic}"
                    </div>
                    <div class="item-meta">${activity.time}</div>
                </div>
            `;
        }).join('');
    }

    // Assignment Management
    renderAssignments() {
        this.populateAssigneeSelect();
        this.filterAssignments();
    }

    populateAssigneeSelect() {
        const select = document.getElementById('assignee');
        select.innerHTML = '<option value="">Select Team Member</option>';
        
        this.teamMembers.forEach(member => {
            select.innerHTML += `<option value="${member._id || member.id}">${member.name}</option>`;
        });
    }

    filterAssignments() {
        const categoryFilter = document.getElementById('category-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const searchFilter = document.getElementById('search-filter').value.toLowerCase();

        let filtered = this.assignments.filter(assignment => {
            const matchesCategory = !categoryFilter || assignment.category === categoryFilter;
            const matchesStatus = !statusFilter || assignment.status === statusFilter;
            const matchesSearch = !searchFilter || 
                assignment.topic.toLowerCase().includes(searchFilter) ||
                assignment.assignee.toLowerCase().includes(searchFilter);

            return matchesCategory && matchesStatus && matchesSearch;
        });

        this.renderAssignmentCards(filtered);
    }

    renderAssignmentCards(assignments) {
        const container = document.getElementById('assignments-container');
        
        if (assignments.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: #718096; padding: 2rem;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>No assignments found matching your criteria</p>
                </div>
            `;
            return;
        }

        container.innerHTML = assignments.map(assignment => `
            <div class="assignment-card ${assignment.status}">
                <div class="assignment-header">
                    <div>
                        <div class="assignment-title">${assignment.topic}</div>
                        <div class="assignment-category">${assignment.category.replace('-', ' ')}</div>
                    </div>
                    <div class="assignment-actions">
                        <button class="btn btn-small btn-secondary" onclick="app.editAssignment('${assignment._id || assignment.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger" onclick="app.deleteAssignment('${assignment._id || assignment.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="assignment-meta">
                    <div class="meta-item">
                        <i class="fas fa-user"></i>
                        <span>${assignment.assignee}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>Due: ${this.formatDate(assignment.dueDate)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-flag"></i>
                        <span class="priority-${assignment.priority}">${assignment.priority} priority</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-info-circle"></i>
                        <span class="status-badge ${assignment.status}">${assignment.status.replace('-', ' ')}</span>
                    </div>
                </div>

                ${assignment.description ? `
                    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                        <p style="color: #4a5568; font-size: 0.9rem;">${assignment.description}</p>
                    </div>
                ` : ''}

                <div style="margin-top: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-size: 0.9rem; color: #4a5568;">Progress</span>
                        <span style="font-size: 0.9rem; font-weight: 600;">${assignment.progress || 0}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${assignment.progress || 0}%"></div>
                    </div>
                </div>

                <div class="assignment-actions" style="margin-top: 1rem;">
                    <select onchange="app.updateAssignmentStatus(${assignment.id}, this.value)" class="btn btn-small" style="padding: 0.5rem;">
                        <option value="pending" ${assignment.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="in-progress" ${assignment.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="review" ${assignment.status === 'review' ? 'selected' : ''}>Under Review</option>
                        <option value="completed" ${assignment.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                    <button class="btn btn-small btn-primary" onclick="app.viewDocumentation('${assignment.category}', '${assignment.topic}')">
                        <i class="fas fa-eye"></i> View Docs
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Assignment CRUD Operations
    openAssignmentModal(assignmentId = null) {
        this.currentEditingId = assignmentId;
        const modal = document.getElementById('assignment-modal');
        const form = document.getElementById('assignment-form');
        
        if (assignmentId) {
            const assignment = this.assignments.find(a => a._id === assignmentId || a.id === assignmentId);
            if (assignment) {
                document.getElementById('modal-title').textContent = 'Edit Assignment';
                document.getElementById('topic-name').value = assignment.topic;
                document.getElementById('topic-category').value = assignment.category;
                document.getElementById('assignee').value = assignment.assigneeId;
                document.getElementById('due-date').value = assignment.dueDate;
                document.getElementById('priority').value = assignment.priority;
                document.getElementById('description').value = assignment.description || '';
            }
        } else {
            document.getElementById('modal-title').textContent = 'Add New Assignment';
            form.reset();
        }
        
        modal.classList.add('active');
    }

    async saveAssignment() {
        const assigneeId = document.getElementById('assignee').value;
        const assignee = this.teamMembers.find(m => m._id === assigneeId || m.id == assigneeId);

        const assignmentData = {
            topic: document.getElementById('topic-name').value,
            category: document.getElementById('topic-category').value,
            assignee: assignee ? assignee.name : '',
            assigneeId: assigneeId,
            dueDate: document.getElementById('due-date').value,
            priority: document.getElementById('priority').value,
            description: document.getElementById('description').value,
            status: 'not-started'
        };

        try {
            if (this.currentEditingId) {
                // Edit existing assignment
                assignmentData._id = this.currentEditingId;
                const updatedAssignment = await this.saveAssignmentToAPI(assignmentData);
                
                const index = this.assignments.findIndex(a => a._id === this.currentEditingId || a.id === this.currentEditingId);
                if (index !== -1) {
                    this.assignments[index] = updatedAssignment;
                }
                this.showSuccess('Assignment updated successfully!');
            } else {
                // Add new assignment
                const newAssignment = await this.saveAssignmentToAPI(assignmentData);
                this.assignments.push(newAssignment);
                this.showSuccess('Assignment created successfully!');
            }

            this.renderAssignments();
            this.renderDashboard();
            this.closeModals();
            this.currentEditingId = null;
        } catch (error) {
            console.error('Failed to save assignment:', error);
            this.showError('Failed to save assignment. Please try again.');
        }
    }

    editAssignment(id) {
        this.openAssignmentModal(id);
    }

    async deleteAssignment(id) {
        if (confirm('Are you sure you want to delete this assignment?')) {
            try {
                await this.deleteAssignmentFromAPI(id);
                this.assignments = this.assignments.filter(a => a._id !== id && a.id !== id);
                this.renderAssignments();
                this.renderDashboard();
                this.showSuccess('Assignment deleted successfully!');
            } catch (error) {
                console.error('Failed to delete assignment:', error);
                this.showError('Failed to delete assignment. Please try again.');
            }
        }
    }

    async updateAssignmentStatus(id, newStatus) {
        try {
            const statusData = { status: newStatus };
            if (newStatus === 'completed') {
                statusData.progress = 100;
            }

            await this.apiRequest(`/assignments/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify(statusData)
            });

            // Update local data
            const assignment = this.assignments.find(a => a._id === id || a.id === id);
            if (assignment) {
                assignment.status = newStatus;
                if (newStatus === 'completed') {
                    assignment.progress = 100;
                }
            }

            this.renderAssignments();
            this.renderDashboard();
            this.showSuccess('Assignment status updated!');
        } catch (error) {
            console.error('Failed to update assignment status:', error);
            this.showError('Failed to update assignment status. Please try again.');
        }
    }

    // Team Management
    renderTeam() {
        const container = document.getElementById('team-grid');
        
        container.innerHTML = this.teamMembers.map(member => {
            const initials = member.name.split(' ').map(n => n[0]).join('');
            
            return `
                <div class="team-member-card">
                    <div class="member-avatar">${initials}</div>
                    <div class="member-name">${member.name}</div>
                    <div class="member-role">${member.role}</div>
                    <div class="member-skills">
                        ${member.skills.slice(0, 3).map(skill => 
                            `<span style="background: #e2e8f0; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem; margin: 0.1rem;">${skill}</span>`
                        ).join('')}
                    </div>
                    <div class="member-stats">
                        <div class="member-stat">
                            <span class="member-stat-number">${member.assignedTopics || 0}</span>
                            <span class="member-stat-label">Assigned</span>
                        </div>
                        <div class="member-stat">
                            <span class="member-stat-number">${member.completedTopics || 0}</span>
                            <span class="member-stat-label">Completed</span>
                        </div>
                        <div class="member-stat">
                            <span class="member-stat-number">${Math.round((member.completedTopics || 0) / (member.assignedTopics || 1) * 100)}%</span>
                            <span class="member-stat-label">Success</span>
                        </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                        <button class="btn btn-small btn-secondary" onclick="app.editMember('${member._id || member.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger" onclick="app.deleteMember('${member._id || member.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    openMemberModal(memberId = null) {
        const modal = document.getElementById('member-modal');
        const form = document.getElementById('member-form');
        
        // Set the member ID in the form dataset for save operation
        form.dataset.memberId = memberId || 'null';
        
        if (memberId) {
            // Find member by both _id (MongoDB) and id (legacy)
            const member = this.teamMembers.find(m => m._id === memberId || m.id === memberId);
            if (member) {
                document.getElementById('member-name').value = member.name;
                document.getElementById('member-email').value = member.email;
                document.getElementById('member-role').value = member.role;
                document.getElementById('member-skills').value = member.skills.join(', ');
            }
        } else {
            form.reset();
        }
        
        modal.classList.add('active');
    }

    async saveMember() {
        const memberData = {
            name: document.getElementById('member-name').value,
            email: document.getElementById('member-email').value,
            role: document.getElementById('member-role').value,
            skills: document.getElementById('member-skills').value.split(',').map(s => s.trim()),
            joinDate: new Date().toISOString().split('T')[0]
        };

        try {
            // Check if we're editing an existing member
            const memberId = document.getElementById('member-form').dataset.memberId;
            
            if (memberId && memberId !== 'null') {
                // Update existing member
                memberData._id = memberId;
                await this.saveTeamMemberToAPI(memberData);
                
                // Update local data
                const index = this.teamMembers.findIndex(m => m._id === memberId);
                if (index !== -1) {
                    this.teamMembers[index] = { ...this.teamMembers[index], ...memberData };
                }
                this.showSuccess('Team member updated successfully!');
            } else {
                // Create new member
                const savedMember = await this.saveTeamMemberToAPI(memberData);
                this.teamMembers.push(savedMember);
                this.showSuccess('Team member added successfully!');
            }

            this.renderTeam();
            this.populateAssigneeSelect();
            this.closeModals();
        } catch (error) {
            console.error('Failed to save team member:', error);
            this.showError('Failed to save team member. Please try again.');
        }
    }

    editMember(id) {
        this.openMemberModal(id);
    }

    async deleteMember(id) {
        if (confirm('Are you sure you want to delete this team member?')) {
            try {
                await this.deleteTeamMemberFromAPI(id);
                this.teamMembers = this.teamMembers.filter(m => m._id !== id && m.id !== id);
                this.renderTeam();
                this.populateAssigneeSelect();
                this.showSuccess('Team member deleted successfully!');
            } catch (error) {
                console.error('Failed to delete team member:', error);
                this.showError('Failed to delete team member. Please try again.');
            }
        }
    }

    // Documentation Management
    renderDocumentationTree() {
        const tree = document.getElementById('docs-tree');
        tree.innerHTML = '';

        Object.entries(this.documentation).forEach(([category, docs]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
                <h4 style="margin-bottom: 0.5rem; color: #2d3748; text-transform: capitalize;">
                    ${category.replace('-', ' ')}
                </h4>
                <ul style="list-style: none; margin-left: 1rem;">
                    ${Object.entries(docs).map(([title, doc]) => `
                        <li style="margin-bottom: 0.25rem;">
                            <a href="#" onclick="app.viewDocumentation('${category}', '${title}')" 
                               style="color: #4a5568; text-decoration: none; display: block; padding: 0.25rem 0.5rem; border-radius: 4px;">
                                <i class="fas fa-file-alt" style="margin-right: 0.5rem; color: #718096;"></i>
                                ${title}
                                <span class="status-badge ${doc.status}" style="font-size: 0.7rem; margin-left: 0.5rem;">${doc.status}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;
            tree.appendChild(categoryDiv);
        });
    }

    viewDocumentation(category, title) {
        const doc = this.documentation[category][title];
        const viewer = document.getElementById('docs-viewer');
        
        // Switch to documentation tab
        this.switchTab('documentation');
        
        // Sample documentation content
        viewer.innerHTML = `
            <div class="docs-header" style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 2rem;">
                <h1>${title}</h1>
                <div style="display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.9rem; color: #718096;">
                    <span><i class="fas fa-user"></i> ${doc.author}</span>
                    <span><i class="fas fa-folder"></i> ${category.replace('-', ' ')}</span>
                    <span class="status-badge ${doc.status}">${doc.status}</span>
                </div>
            </div>
            
            <div class="docs-content">
                <h2>📖 Overview</h2>
                <p>This documentation covers ${title.toLowerCase()} and provides comprehensive examples and best practices.</p>
                
                <h2>🎯 Learning Objectives</h2>
                <ul>
                    <li>Understand the core concepts</li>
                    <li>Implement practical examples</li>
                    <li>Apply best practices</li>
                </ul>
                
                <h2>💻 Code Examples</h2>
                <pre style="background: #f8fafc; padding: 1rem; border-radius: 8px; overflow-x: auto;"><code>// Sample code will be displayed here
public class Example {
    public static void main(String[] args) {
        System.out.println("Documentation content");
    }
}</code></pre>
                
                <div style="margin-top: 2rem; padding: 1rem; background: #f0fff4; border: 1px solid #9ae6b4; border-radius: 8px;">
                    <p><strong>📝 Note:</strong> This is a preview. The actual documentation content will be loaded from the GitHub repository.</p>
                </div>
            </div>
        `;
    }

    // Analytics
    renderAnalytics() {
        this.renderTimelineChart();
        this.renderPerformanceChart();
        this.renderDistributionChart();
    }

    renderTimelineChart() {
        const ctx = document.getElementById('timeline-chart').getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Completed Topics',
                    data: [2, 5, 8, 12],
                    borderColor: '#48bb78',
                    backgroundColor: 'rgba(72, 187, 120, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Planned',
                    data: [3, 6, 10, 15],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Documentation Progress Timeline'
                    }
                }
            }
        });
    }

    renderPerformanceChart() {
        const ctx = document.getElementById('performance-chart').getContext('2d');
        
        const teamData = this.teamMembers.map(member => ({
            name: member.name.split(' ')[0],
            completed: member.completedTopics || 0,
            assigned: member.assignedTopics || 1
        }));

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: teamData.map(d => d.name),
                datasets: [{
                    label: 'Completed',
                    data: teamData.map(d => d.completed),
                    backgroundColor: '#48bb78'
                }, {
                    label: 'Assigned',
                    data: teamData.map(d => d.assigned),
                    backgroundColor: '#e2e8f0'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Team Performance'
                    }
                }
            }
        });
    }

    renderDistributionChart() {
        const ctx = document.getElementById('distribution-chart').getContext('2d');
        
        const categories = {};
        this.assignments.forEach(assignment => {
            categories[assignment.category] = (categories[assignment.category] || 0) + 1;
        });

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories).map(cat => cat.replace('-', ' ')),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: ['#667eea', '#ed8936', '#48bb78', '#805ad5']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Topic Distribution by Category'
                    }
                }
            }
        });
    }

    // Utility Methods
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        this.currentEditingId = null;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    exportData() {
        const data = {
            assignments: this.assignments,
            teamMembers: this.teamMembers,
            documentation: this.documentation,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `documentation-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    syncWithGitHub() {
        // Placeholder for GitHub integration
        alert('GitHub sync feature coming soon! This will sync your assignments with the GitHub repository.');
    }
}

// Initialize the application
const app = new DocumentationManager();
