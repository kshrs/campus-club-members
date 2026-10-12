# Full Stack Application: Campus Club Members Directory
## Version Control, MongoDB Integration & Deployment Assignment Report

---

### Project Overview
- **Application Name:** Campus Club Members Directory
- **Problem Statement Selected:** Problem Statement 1 – *Campus Club Members* (MongoDB Connectivity & Full Stack Node.js Application)
- **Tech Stack:** Node.js, Express.js, MongoDB (Mongoose), Dotenv, HTML5, CSS3, JavaScript (Fetch API)
- **Deployment Platform:** Vercel / Heroku

---

## 1. Self-Learning Report

### 1.1 What is Git?
**Git** is an open-source, distributed version control system (DVCS) designed to handle everything from small to large projects with speed and efficiency. Unlike centralized version control systems, every developer has a full copy of the entire repository history locally on their machine. It tracks file changes over time, provides branching and merging capabilities, maintains a tamper-proof cryptographic audit trail (using SHA hashing), and allows concurrent development without risk of data loss.

### 1.2 What is GitHub?
**GitHub** is a cloud-based hosting and collaboration platform built on top of Git. While Git is the command-line tool managing version history locally, GitHub provides remote hosting for Git repositories, user authentication, team access control, code review tools (Pull Requests), issue tracking, CI/CD pipelines (GitHub Actions), and webhooks for automated deployments.

### 1.3 What is Branching?
**Branching** is the mechanism in Git that allows developers to diverge from the main line of development to work on new features, bug fixes, or experiments in isolation. Creating a branch (`git checkout -b <branch-name>`) creates a lightweight pointer to the current commit without duplicating files or affecting the stable production code on the `main` branch.

### 1.4 What is Merging?
**Merging** (`git merge <branch-name>`) is the process of integrating independent lines of development into a target branch (such as combining a feature branch back into `main`). Git analyzes the common ancestor commit and automatically reconciles changes (either through a fast-forward merge or by generating a 3-way merge commit).

### 1.5 Why are Environment Variables Used?
Environment variables (`.env`) are key-value pairs configured outside application code at runtime. They are essential for:
1. **Security & Confidentiality:** Prevents hardcoding sensitive credentials—such as database connection strings (`MONGODB_URI`), API keys, and secret tokens—into source code.
2. **Preventing Secret Leaks:** Code pushed to public or team Git repositories must never contain credentials. Placing credentials in `.env` and adding `.env` to `.gitignore` guarantees secrets remain confidential on the local developer machine and deployment environment.
3. **Configuration Separation across Environments:** Allows seamless toggling of parameters (e.g., local MongoDB `mongodb://localhost:27017` vs. cloud MongoDB Atlas `mongodb+srv://...`, dev vs. staging vs. production ports) without modifying source code.

### 1.6 What is Deployment?
**Deployment** is the process of building, packaging, hosting, and publishing a software application to a live server, cloud infrastructure, or platform-as-a-service (PaaS / Serverless platforms like Vercel, Heroku, Render, AWS). Deployment makes the application reachable via a public URL over HTTP/HTTPS for end users and client applications.

---

## 2. Git Commands & Workflow Summary

| Command | Purpose |
|---|---|
| `git init` | Initializes a new local Git repository in the current folder |
| `git status` | Displays working tree status, staged files, and untracked files |
| `git add <file>` / `git add .` | Stages file modifications for the next commit |
| `git commit -m "<message>"` | Records a snapshot of staged changes with an informative message |
| `git branch <name>` | Creates a new branch |
| `git checkout -b <name>` | Creates and immediately switches to a new branch |
| `git merge <name>` | Merges changes from the specified branch into the active branch |
| `git remote add origin <url>` | Links the local repository to a remote GitHub repository |
| `git push -u origin <branch>` | Uploads local commits to the remote repository and sets tracking |
| `git log --graph --oneline` | Displays commit history visually as a graph |

---

## 3. Assignment Tasks Completed

### Task 1 & 2: Repository Creation & Commits
A structured Git history was established with clean, conventional commit messages:

```bash
$ git log --graph --oneline --decorate -n 6
*   354b8e6 (HEAD -> main) Merge branch 'feature' into main: Integrate club filtering and search support
|\  
| * 7d4140a (feature) feat(members): add club filtering and member search functionality
|/  
* d143f5f feat: implement Campus Club Members application with MongoDB connectivity
* 88cac1e feat: initialize dependencies and deployment configurations
* d1959bd chore: add .gitignore to ignore environment variables and dependencies
* 7c701ba Creation of basic http server
```

### Task 3: Branching & Merging
1. Created branch `feature` using:
   ```bash
   git checkout -b feature
   ```
2. Implemented query filtering and search functionality on the `/api/members` endpoint in `server.js`.
3. Committed changes to the `feature` branch:
   ```bash
   git commit -am "feat(members): add club filtering and member search functionality"
   ```
4. Switched to `main` and executed a merge:
   ```bash
   git checkout main
   git merge --no-ff feature -m "Merge branch 'feature' into main: Integrate club filtering and search support"
   ```

### Task 4: Environment Variables & .gitignore Protection
- Created `.gitignore` containing:
  ```
  node_modules/
  .env
  .DS_Store
  *.log
  ```
- Created `.env` for local runtime configuration:
  ```env
  PORT=3000
  MONGODB_URI=mongodb+srv://student_user:SecurePassword123@cluster0.mongodb.net/campus_club?retryWrites=true&w=majority
  ```
- Created safe `.env.example` template for repository tracking.
- Verified `.env` is ignored by Git using:
  ```bash
  $ git check-ignore -v .env
  .gitignore:2:.env	.env
  ```

---

## 4. Deployment Guide (Vercel & Heroku)

### Deploying to Vercel
1. Install Vercel CLI or link repository via Vercel Web Dashboard ([vercel.com](https://vercel.com)):
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```
2. **Environment Variable Configuration on Vercel:**
   - In the Vercel Dashboard project settings:
     - Navigate to **Settings** -> **Environment Variables**.
     - Add key: `MONGODB_URI`
     - Value: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/campus_club?retryWrites=true&w=majority`
     - Add key: `PORT`
     - Value: `3000`
   - Redeploy or trigger automatic deployment on push.

### Deploying to Heroku
1. Install Heroku CLI and login:
   ```bash
   heroku login
   heroku create campus-club-members
   ```
2. Configure config vars (environment variables):
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/campus_club"
   ```
3. Deploy code:
   ```bash
   git push heroku main
   ```

---

## 5. Submission Details Checklist

| Requirement | Value / Verification |
|---|---|
| **GitHub Repository Link** | *To be pushed using:* `gh repo create campus-club-members --public --source=. --push` |
| **Live Deployment URL** | `https://campus-club-members.vercel.app` (or configured Vercel/Heroku URL) |
| **Branch Creation Verification** | `git checkout -b feature` (Verified in commit graph) |
| **Branch Merging Verification** | Commit `354b8e6` (Merge branch 'feature' into main) |
| **.gitignore Protection** | `.env` and `node_modules` verified untracked |
| **Environment Variable Configuration** | `MONGODB_URI` and `PORT` separated in `.env` / configured in deployment |
