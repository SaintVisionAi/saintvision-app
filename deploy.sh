#!/bin/bash

echo "🚀 SAINTVISION ENTERPRISE DEPLOYMENT SCRIPT"
echo "============================================"

# Build the project
echo "Building production version..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Commit any changes
    echo "Committing final changes..."
    git add .
    git commit -m "🚀 FINAL DEPLOYMENT - SAINTVISION ENTERPRISE READY" || echo "No changes to commit"
    
    # Push to trigger Vercel
    echo "Pushing to GitHub to trigger Vercel deployment..."
    git push origin main
    
    echo "✅ DEPLOYMENT TRIGGERED!"
    echo "🌐 Check your Vercel dashboard for deployment status"
    echo "🔥 SAINTVISION ENTERPRISE GOING LIVE!"
    
else
    echo "❌ Build failed - fix errors before deployment"
    exit 1
fi