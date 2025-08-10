# BBC News App - DevOps Monitoring Project

A complete DevOps implementation of a BBC-style news application using Node.js, Docker, and Kubernetes.

## Project Overview

This project demonstrates a full DevOps pipeline including:
- Node.js application development
- Automated testing
- Docker containerization
- Kubernetes deployment with 3 replicas
- ClusterIP service configuration
- Minikube local deployment

## Application Features

- **Modern BBC-style responsive design**
- **RESTful API endpoints**
- **Health check monitoring**
- **Real-time news updates**
- **Mobile-responsive interface**
- **Error handling and status monitoring**

## API Endpoints

- `GET /` - Main application interface
- `GET /api/news` - Fetch all news articles
- `GET /api/news/:id` - Fetch specific article
- `GET /api/health` - Application health check

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **Testing**: Jest, Supertest
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Local Development**: Minikube

## Quick Start

### Prerequisites
- Node.js (v18+)
- Docker
- Git
- Minikube
- kubectl

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd bbc-news-app

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

### Docker Deployment
```bash
# Build Docker image
docker build -t bbc-news-app .

# Run container
docker run -p 3000:3000 bbc-news-app
```

### Kubernetes Deployment
```bash
# Start Minikube
minikube start

# Deploy to Kubernetes
kubectl apply -f k8s/

# Port forward to access application
kubectl port-forward svc/bbc-news-service 3000:80
```

## Project Structure
```
bbc-news-