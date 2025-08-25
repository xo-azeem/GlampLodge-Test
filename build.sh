#!/bin/bash

# Netlify Build Script for GlampLodges
echo "🚀 Starting GlampLodges build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output in: dist/"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Build process completed!"
