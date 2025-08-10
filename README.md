# BBC News App - DevOps Monitoring Project

A complete DevOps implementation of a BBC-style news application with comprehensive monitoring using Node.js, Docker, Kubernetes, Prometheus, and Grafana.

## Project Overview

This project demonstrates a full DevOps pipeline including:
- Node.js application development
- Automated testing with Jest
- Docker containerization with security best practices
- Kubernetes deployment with 3 replicas
- ClusterIP service configuration
- Prometheus monitoring and metrics collection
- Grafana dashboards for visualization
- Health checks and observability

## Application Features

- **Modern BBC-style responsive design**
- **RESTful API endpoints**
- **Health check monitoring**
- **Real-time news updates**
- **Mobile-responsive interface**
- **Error handling and status monitoring**
- **Prometheus metrics integration**
- **Grafana dashboard visualization**

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
- **Monitoring**: Prometheus, Grafana
- **Package Management**: Helm
- **Local Development**: Minikube

## Quick Start

### Prerequisites
- Node.js (v18+)
- Docker
- Git
- Minikube or Kubernetes cluster
- kubectl
- Helm 3.x

### Local Development
```bash
# Clone the repository
git clone https://github.com/Mide69/BBC-News-App-.git
cd BBC-News-App-

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm start
```

### Docker Deployment
```bash
# Build Docker image
docker build -t bbc-news-app:v1.0.0 .

# Run container
docker run -p 3000:3000 bbc-news-app:v1.0.0
```

### Kubernetes Deployment
```bash
# Start Minikube
minikube start

# Deploy application to Kubernetes
kubectl apply -f K8s/

# Port forward to access application
kubectl port-forward svc/bbc-news-service 3000:80
```

### Monitoring Setup

#### Install Prometheus and Grafana
```bash
# Add Helm repositories
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Create monitoring namespace
kubectl create namespace monitoring

# Install Prometheus stack (includes Grafana)
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false \
  --set prometheus.prometheusSpec.retention=15d
```

#### Access Monitoring Tools

**Prometheus:**
```bash
# Port forward Prometheus
kubectl port-forward -n monitoring svc/prometheus-kube-prometheus-prometheus 9090:9090

# Access at: http://localhost:9090
```

**Grafana:**
```bash
# Get Grafana password
kubectl get secret -n monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

# Port forward Grafana
kubectl port-forward -n monitoring svc/prometheus-grafana 3030:80

# Access at: http://localhost:3030
# Username: admin
# Password: (from command above)
```

## Project Structure
```
BBC-News-App-/
├── K8s/
│   ├── deployment.yaml
│   └── service.yaml
├── Public/
│   ├── index.html
│   └── app.test.js
├── BBC News App - server.js
├── Dockerfile
├── package.json
├── .env.example
├── .dockerignore
├── .gitignore
└── README.md
```

## Security Features

- **CORS Policy**: Configured for specific origins
- **Input Sanitization**: Protected against log injection
- **Container Security**: Non-root user in Docker
- **Resource Limits**: CPU and memory constraints in Kubernetes
- **Health Checks**: Liveness and readiness probes

## Monitoring & Observability

- **Health Endpoint**: `/api/health` for application status
- **Prometheus Metrics**: System and application metrics
- **Grafana Dashboards**: Visual monitoring and alerting
- **Kubernetes Monitoring**: Pod, service, and cluster metrics
- **Log Aggregation**: Centralized logging with proper sanitization

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

**Test Coverage:**
- API endpoint testing
- Health check validation
- Error handling verification
- Response format validation

## Deployment Options

### Local Development
- Direct Node.js execution
- Docker container
- Minikube cluster

### Production
- AWS EKS
- Google GKE
- Azure AKS
- On-premises Kubernetes

## Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Use different ports for services
2. **Resource limits**: Ensure sufficient cluster resources
3. **Image pull errors**: Verify Docker image tags
4. **Network policies**: Check Kubernetes networking

### Monitoring Issues

```bash
# Check monitoring pods
kubectl get pods -n monitoring

# View logs
kubectl logs -n monitoring <pod-name>

# Verify services
kubectl get svc -n monitoring
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

DevOps Engineer - Demonstrating modern containerization and monitoring practices

---

**🚀 Ready for production deployment with comprehensive monitoring and observability!**