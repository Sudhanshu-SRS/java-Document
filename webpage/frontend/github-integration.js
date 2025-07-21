// GitHub Integration for Automatic README Updates
class GitHubIntegration {
    constructor(app) {
        this.app = app;
        this.config = {
            owner: 'Sudhanshu-SRS', // Your GitHub username
            repo: 'java-Document',   // Your repository name
            token: null // Will be set by user
        };
        this.setupGitHubIntegration();
    }

    setupGitHubIntegration() {
        // Add GitHub token input to the header
        this.addGitHubTokenInput();
        
        // Override the sync button functionality
        document.getElementById('sync-github').onclick = () => this.syncWithGitHub();
        
        // Auto-sync when assignments change
        this.setupAutoSync();
    }

    addGitHubTokenInput() {
        const headerActions = document.querySelector('.header-actions');
        
        // Add GitHub token input
        const tokenContainer = document.createElement('div');
        tokenContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="password" id="github-token" placeholder="GitHub Token" 
                       style="padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px; width: 150px;">
                <button id="save-token" class="btn btn-secondary btn-small">
                    <i class="fas fa-key"></i> Save
                </button>
            </div>
        `;
        
        headerActions.insertBefore(tokenContainer, headerActions.firstChild);
        
        // Save token functionality
        document.getElementById('save-token').onclick = () => this.saveGitHubToken();
        
        // Load saved token
        this.loadSavedToken();
    }

    saveGitHubToken() {
        const token = document.getElementById('github-token').value;
        if (token) {
            localStorage.setItem('github-token', token);
            this.config.token = token;
            this.showMessage('GitHub token saved successfully!', 'success');
        }
    }

    loadSavedToken() {
        const savedToken = localStorage.getItem('github-token');
        if (savedToken) {
            this.config.token = savedToken;
            document.getElementById('github-token').value = '••••••••••••••••';
        }
    }

    setupAutoSync() {
        // Override assignment save methods to trigger auto-sync
        const originalSaveAssignment = this.app.saveAssignment.bind(this.app);
        const originalUpdateStatus = this.app.updateAssignmentStatus.bind(this.app);
        
        this.app.saveAssignment = () => {
            originalSaveAssignment();
            this.scheduleAutoSync();
        };
        
        this.app.updateAssignmentStatus = (id, status) => {
            originalUpdateStatus(id, status);
            this.scheduleAutoSync();
        };
    }

    scheduleAutoSync() {
        // Debounce auto-sync to avoid too frequent updates
        clearTimeout(this.autoSyncTimeout);
        this.autoSyncTimeout = setTimeout(() => {
            if (this.config.token) {
                this.syncWithGitHub(true); // Auto-sync mode
            }
        }, 5000); // Wait 5 seconds after last change
    }

    async syncWithGitHub(autoMode = false) {
        if (!this.config.token) {
            this.showMessage('Please set your GitHub token first', 'error');
            return;
        }

        try {
            if (!autoMode) {
                this.showMessage('Syncing with GitHub...', 'info');
            }

            // Get current README content
            const currentReadme = await this.getFileContent('README.md');
            
            // Generate updated README
            const updatedReadme = this.generateUpdatedReadme(currentReadme);
            
            // Update README on GitHub
            await this.updateFile('README.md', updatedReadme, currentReadme.sha);
            
            this.showMessage('Successfully synced with GitHub!', 'success');
            
        } catch (error) {
            console.error('GitHub sync error:', error);
            this.showMessage(`Sync failed: ${error.message}`, 'error');
        }
    }

    async getFileContent(path) {
        const response = await fetch(`https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${path}`, {
            headers: {
                'Authorization': `token ${this.config.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get file: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            content: atob(data.content),
            sha: data.sha
        };
    }

    async updateFile(path, content, sha) {
        const response = await fetch(`https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${this.config.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `🔄 Auto-update assignments from live website`,
                content: btoa(content),
                sha: sha
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to update file: ${response.statusText}`);
        }

        return response.json();
    }

    generateUpdatedReadme(currentContent) {
        // Find the assignment tables in README
        const assignments = this.app.assignments;
        
        // Group assignments by category
        const categories = {
            'core-java': [],
            'backend': [],
            'frontend': []
        };

        assignments.forEach(assignment => {
            if (categories[assignment.category]) {
                categories[assignment.category].push(assignment);
            }
        });

        // Generate new table content
        const coreJavaTable = this.generateTableMarkdown('Core Java Topics', categories['core-java']);
        const backendTable = this.generateTableMarkdown('Backend Technologies', categories['backend']);
        const frontendTable = this.generateTableMarkdown('Frontend Technologies', categories['frontend']);

        // Replace the assignment section in README
        let updatedContent = currentContent;

        // Replace Core Java table
        updatedContent = this.replaceTableInContent(updatedContent, 'Core Java Topics', coreJavaTable);
        
        // Replace Backend table
        updatedContent = this.replaceTableInContent(updatedContent, 'Backend Technologies', backendTable);
        
        // Replace Frontend table
        updatedContent = this.replaceTableInContent(updatedContent, 'Frontend Technologies', frontendTable);

        return updatedContent;
    }

    generateTableMarkdown(title, assignments) {
        let table = `### ${title}\n\n`;
        table += `| Topic | Assigned To | Status | Due Date |\n`;
        table += `| ----- | ----------- | ------ | -------- |\n`;

        assignments.forEach(assignment => {
            const statusEmoji = this.getStatusEmoji(assignment.status);
            const formattedDate = new Date(assignment.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });

            table += `| ${assignment.topic} | ${assignment.assignee} | ${statusEmoji} ${assignment.status.replace('-', ' ')} | ${formattedDate} |\n`;
        });

        return table;
    }

    getStatusEmoji(status) {
        const statusEmojis = {
            'pending': '⏳',
            'in-progress': '🔄',
            'review': '👀',
            'completed': '✅'
        };
        return statusEmojis[status] || '⏳';
    }

    replaceTableInContent(content, tableName, newTable) {
        const startPattern = new RegExp(`### ${tableName}[\\s\\S]*?(?=###|$)`, 'g');
        return content.replace(startPattern, newTable + '\n');
    }

    showMessage(message, type) {
        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transition: all 0.3s ease;
        `;

        const colors = {
            success: '#48bb78',
            error: '#f56565',
            info: '#667eea'
        };

        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // GitHub Token Setup Instructions
    showTokenSetupInstructions() {
        const instructions = `
        # GitHub Token Setup Instructions

        1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
        2. Click "Generate new token (classic)"
        3. Give it a name: "Documentation Website"
        4. Select scopes:
           ✅ repo (Full control of private repositories)
           ✅ workflow (Update GitHub Action workflows)
        5. Copy the generated token
        6. Paste it in the GitHub Token field in the website header
        7. Click "Save"

        Your assignments will now automatically sync with GitHub! 🚀
        `;

        alert(instructions);
    }
}

// Auto-initialize GitHub integration when app loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait for main app to initialize
    setTimeout(() => {
        if (window.app) {
            window.githubIntegration = new GitHubIntegration(window.app);
        }
    }, 1000);
});

// Add GitHub setup instructions to the sync button
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const syncBtn = document.getElementById('sync-github');
        if (syncBtn) {
            syncBtn.onclick = null; // Remove default handler
            syncBtn.onclick = () => {
                if (window.githubIntegration) {
                    window.githubIntegration.syncWithGitHub();
                } else {
                    alert('GitHub integration not loaded. Please refresh the page.');
                }
            };

            // Add setup instructions link
            const setupLink = document.createElement('button');
            setupLink.className = 'btn btn-secondary';
            setupLink.innerHTML = '<i class="fas fa-question-circle"></i> Setup Help';
            setupLink.onclick = () => {
                if (window.githubIntegration) {
                    window.githubIntegration.showTokenSetupInstructions();
                }
            };

            syncBtn.parentNode.insertBefore(setupLink, syncBtn.nextSibling);
        }
    }, 1000);
});
