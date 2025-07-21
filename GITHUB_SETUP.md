# GitHub Setup Guide

## 🚀 Step-by-Step Setup for Team Documentation

### Phase 1: Repository Creation (Team Lead/Trainee)

#### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Repository name: `java-fullstack-documentation`
4. Description: "Collaborative documentation for Java Full Stack development"
5. Set to **Public** (so everyone can see it)
6. Check "Add a README file"
7. Add `.gitignore` template: Choose "Java"
8. Choose a license: MIT License (recommended for documentation)
9. Click "Create repository"

#### 2. Initial Repository Setup

```bash
# Clone the repository
git clone https://github.com/[your-username]/java-fullstack-documentation.git
cd java-fullstack-documentation

# Copy all documentation files to the repository
# (Copy the files we created from your local folder)

# Add all files
git add .
git commit -m "Initial documentation structure setup"
git push origin main
```

### Phase 2: Team Access Setup

#### 1. Add Collaborators

1. In your GitHub repository, go to **Settings** → **Manage access**
2. Click "Invite a collaborator"
3. Add each team member's GitHub username/email
4. Set permission level to **Write** (allows them to create branches and PRs)

#### 2. Set Up Branch Protection

1. Go to **Settings** → **Branches**
2. Click "Add rule"
3. Branch name pattern: `main`
4. Check these options:
   - ✅ Require pull request reviews before merging
   - ✅ Require review from code owners
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators
5. Click "Create"

#### 3. Create Project Board (Optional but Recommended)

1. Go to **Projects** tab in your repository
2. Click "New project"
3. Choose "Basic kanban" template
4. Name it "Documentation Progress"
5. Add columns:
   - 📋 **To Do** (Topics assigned but not started)
   - 🔄 **In Progress** (Currently being worked on)
   - 👀 **Review** (Pull requests under review)
   - ✅ **Done** (Completed and merged)

### Phase 3: Team Member Setup

#### For Each Team Member:

1. **Accept Collaboration Invitation**

   - Check email for GitHub invitation
   - Click "Accept invitation"

2. **Clone Repository**

   ```bash
   git clone https://github.com/[repository-owner]/java-fullstack-documentation.git
   cd java-fullstack-documentation
   ```

3. **Set Up Git Configuration** (if not done before)
   ```bash
   git config --global user.name "Your Full Name"
   git config --global user.email "your.email@example.com"
   ```

### Phase 4: Workflow for Documentation

#### Creating Documentation (Team Members):

1. **Update Local Repository**

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create Topic Branch**

   ```bash
   git checkout -b docs/your-topic-name
   # Example: git checkout -b docs/spring-boot-fundamentals
   ```

3. **Create Your Documentation**

   ```bash
   # Create your folder structure
   mkdir -p docs/backend/spring-boot

   # Copy template and start documenting
   cp templates/topic-template.md docs/backend/spring-boot/fundamentals.md

   # Edit the file with your content
   ```

4. **Commit Your Work**

   ```bash
   git add .
   git commit -m "Add Spring Boot fundamentals documentation

   - Cover basic setup and configuration
   - Include starter dependencies
   - Add code examples for REST controllers
   - Document best practices"
   ```

5. **Push Your Branch**

   ```bash
   git push origin docs/your-topic-name
   ```

6. **Create Pull Request**

   - Go to GitHub repository
   - Click "Compare & pull request" button
   - Fill out PR template:

   ```markdown
   ## Documentation Addition: [Topic Name]

   ### What's Included:

   - [ ] Overview and learning objectives
   - [ ] Code examples with explanations
   - [ ] Best practices section
   - [ ] Common pitfalls
   - [ ] Hands-on exercise

   ### Review Focus:

   - Technical accuracy
   - Code example quality
   - Clarity of explanations
   - Adherence to style guide

   ### Estimated Reading Time: [X minutes]

   Closes #[issue-number]
   ```

#### Review Process:

1. **Assign Reviewers**

   - Add 2 team members as reviewers
   - Request review from someone experienced in the topic

2. **Review Guidelines**

   ```markdown
   ## Review Checklist:

   - [ ] Content is technically accurate
   - [ ] Code examples compile and run
   - [ ] Writing is clear and well-structured
   - [ ] Follows documentation template
   - [ ] Includes practical examples
   - [ ] No spelling/grammar errors
   - [ ] Links work correctly
   ```

3. **Address Review Comments**

   ```bash
   # Make changes based on feedback
   git add .
   git commit -m "Address review feedback: improve code examples"
   git push origin docs/your-topic-name
   ```

4. **Merge After Approval**
   - Team lead or authorized member merges PR
   - Branch is automatically deleted after merge

### Phase 5: Collaboration Features

#### Using Issues for Coordination:

1. **Create Issue Templates**
   Create `.github/ISSUE_TEMPLATE/documentation-request.md`:

   ```markdown
   ---
   name: Documentation Request
   about: Request new documentation or improvements
   title: "[DOCS] "
   labels: documentation
   assignees: ""
   ---

   ## Topic/Area:

   [What needs to be documented]

   ## Priority:

   - [ ] High (blocking other work)
   - [ ] Medium (important for team)
   - [ ] Low (nice to have)

   ## Details:

   [Specific requirements or areas to cover]

   ## Assigned To:

   [Team member if known]

   ## Due Date:

   [If there's a deadline]
   ```

2. **Create Issues for Each Topic**

   ```markdown
   Title: Document Spring Boot Fundamentals

   **Topic**: Spring Boot Fundamentals
   **Assigned to**: @username
   **Due Date**: [Date]
   **Priority**: High

   **Requirements**:

   - Cover basic setup and configuration
   - Explain starter dependencies
   - Include REST controller examples
   - Document testing approaches

   **Resources**:

   - [Link to official docs]
   - [Link to relevant tutorials]
   ```

#### Using GitHub Discussions:

1. **Enable Discussions**

   - Go to repository **Settings**
   - Scroll to **Features** section
   - Check "Discussions"

2. **Create Categories**:
   - 💬 **General** - General discussion about the project
   - 💡 **Ideas** - Suggestions for improvements
   - 🙋 **Q&A** - Questions and answers
   - 📣 **Announcements** - Important updates

#### Team Communication:

1. **Daily Standups** (GitHub Issues)

   ```markdown
   ## Daily Standup - [Date]

   ### @username1

   - **Yesterday**: Completed Collections documentation first draft
   - **Today**: Working on Stream API examples
   - **Blockers**: Need help with performance testing examples

   ### @username2

   - **Yesterday**: Reviewed Spring MVC documentation
   - **Today**: Starting Spring Security documentation
   - **Blockers**: None
   ```

2. **Weekly Progress** (Project Board)
   - Move cards between columns
   - Add comments on progress
   - Update due dates if needed

### Phase 6: Advanced Features

#### GitHub Pages for Documentation Website:

1. **Enable GitHub Pages**

   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

2. **Create Simple Index** (optional)
   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <title>Java Full Stack Documentation</title>
     </head>
     <body>
       <h1>Java Full Stack Documentation</h1>
       <p><a href="README.md">View Documentation</a></p>
     </body>
   </html>
   ```

#### Automation with GitHub Actions:

Create `.github/workflows/documentation-check.yml`:

```yaml
name: Documentation Quality Check

on:
  pull_request:
    paths:
      - "docs/**"
      - "*.md"

jobs:
  check-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Check Markdown Links
        uses: gaurav-nelson/github-action-markdown-link-check@v1
        with:
          use-quiet-mode: "yes"

      - name: Spell Check
        uses: rojopolis/spellcheck-github-actions@0.5.0
        with:
          config_path: .spellcheck.yml
```

## 📋 Quick Reference Commands

### Essential Git Commands for Team:

```bash
# Start new documentation
git checkout main
git pull origin main
git checkout -b docs/topic-name

# Save work
git add .
git commit -m "Descriptive message"
git push origin docs/topic-name

# Update from main branch
git checkout main
git pull origin main
git checkout docs/topic-name
git merge main

# Submit for review
# Create PR on GitHub website
```

### Troubleshooting Common Issues:

```bash
# Forgot to create branch
git checkout -b docs/topic-name
git push origin docs/topic-name

# Made changes on main by mistake
git stash
git checkout -b docs/topic-name
git stash pop

# Need to update branch with latest main
git checkout main
git pull origin main
git checkout docs/topic-name
git rebase main
```

This setup ensures smooth collaboration, proper version control, and easy access for all team members! 🚀
