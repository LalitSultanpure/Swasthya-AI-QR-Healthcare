#!/bin/bash
# Quick Start Script for Swasthya AI Frontend

echo "================================"
echo "Swasthya AI - Frontend Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please download and install Node.js from: https://nodejs.org"
    echo ""
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully!"
    echo ""
    echo "🚀 To start the development server, run:"
    echo "   npm run dev"
    echo ""
    echo "📚 Other available commands:"
    echo "   npm run build    - Build for production"
    echo "   npm run preview  - Preview production build"
    echo "   npm run lint     - Check code quality"
    echo ""
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
