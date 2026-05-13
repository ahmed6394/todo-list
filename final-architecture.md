Developer pushes code to GitHub
        |
        v
GitHub Actions CI/CD
        |
        |-- test frontend
        |-- test backend
        |-- build Docker images
        |-- scan images
        |-- push images to Docker Hub or AWS ECR
        |-- deploy to Kubernetes/EKS
        v
AWS EKS Cluster
        |
        |-- Angular frontend pod
        |-- FastAPI backend pod
        |-- PostgreSQL database, preferably AWS RDS
        |-- Ingress / AWS Load Balancer
        |-- Prometheus
        |-- Grafana
        |-- Alertmanager