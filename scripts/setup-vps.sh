#!/bin/bash

# Initial VPS setup script
# Run this once on your VPS to prepare for deployments

set -e

echo "🔧 Setting up VPS for NX Monorepo deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    echo "Docker already installed"
fi

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose already installed"
fi

# Install Git
echo "📚 Installing Git..."
sudo apt-get install -y git

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /opt/nx-mono-repo
sudo chown -R $USER:$USER /opt/nx-mono-repo

# Setup firewall (UFW)
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw --force enable

# Install Nginx (optional - using Docker nginx instead)
# echo "📡 Installing Nginx..."
# sudo apt-get install -y nginx

echo "✅ VPS setup completed!"
echo ""
echo "Next steps:"
echo "1. Clone your repository to /opt/nx-mono-repo"
echo "2. Configure your GitHub secrets for CI/CD:"
echo "   - VPS_HOST: Your VPS IP address"
echo "   - VPS_USERNAME: Your SSH username"
echo "   - VPS_SSH_KEY: Your SSH private key"
echo "   - VPS_PORT: SSH port (default: 22)"
echo "3. Run: cd /opt/nx-mono-repo && ./scripts/deploy.sh"

