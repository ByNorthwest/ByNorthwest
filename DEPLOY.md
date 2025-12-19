# Deployment Guide

## 1. Push Code
You have already pushed your code to GitHub. Make sure the latest changes (including the workflow file I just created) are pushed:
```bash
git add .
git commit -m "feat: setup github pages deployment"
git push origin main
```

## 2. Configure GitHub Repository
1. Go to your repository settings on GitHub.
2. Navigate to **Pages** (left sidebar).
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
   *(Do not select "Deploy from a branch")*

## 3. Monitor Deployment
1. Go to the **Actions** tab in your repository.
2. You should see a workflow named "Deploy to GitHub Pages" running.
3. Once green, your site will be live at `https://<username>.github.io`!
