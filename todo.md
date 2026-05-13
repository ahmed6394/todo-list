# TODO.md — Version 2: Professional AWS DevOps Project

## Project Goal

Build a production-like DevOps portfolio project using:

- Angular frontend
- FastAPI backend
- PostgreSQL database on AWS RDS
- Docker
- AWS ECR
- AWS EKS
- Terraform
- Ansible
- GitHub Actions CI/CD
- Helm
- AWS Load Balancer Controller
- Prometheus
- Grafana
- Optional Argo CD / GitOps

Final project story:

> This project demonstrates a full DevOps workflow: application development, containerization, infrastructure as code, Kubernetes orchestration, CI/CD automation, monitoring, and cloud deployment on AWS.

---

# Phase 0 — Planning and Repository Preparation

## 0.1 Define the final architecture

- [ ] Frontend runs as an Angular container.
- [ ] Backend runs as a FastAPI container.
- [ ] PostgreSQL runs on AWS RDS, not inside Kubernetes for production.
- [ ] Images are stored in AWS ECR.
- [ ] Application runs on AWS EKS.
- [ ] External traffic enters through AWS Load Balancer Controller.
- [ ] Terraform provisions AWS infrastructure.
- [ ] Ansible handles admin/bootstrap/configuration automation.
- [ ] GitHub Actions handles CI/CD.
- [ ] Prometheus and Grafana provide monitoring and dashboards.
- [ ] Optional: Argo CD handles GitOps deployment.

## 0.2 Create target repository structure

- [ ] Restructure the repository like this:

```text
todo-list/
  frontend/
  backend/
  docker-compose.yml

  helm/
    todo-app/

  infra/
    terraform/
      environments/
        dev/
        prod/
      modules/
        vpc/
        eks/
        rds/
        ecr/
        iam/
    ansible/
      inventory/
      playbooks/
      roles/

  monitoring/
    prometheus/
    grafana/
      dashboards/

  .github/
    workflows/

  docs/
    architecture.md
    deployment.md
    monitoring.md
    troubleshooting.md

  README.md
  TODO.md
```

## 0.3 Define naming conventions

- [ ] Choose AWS region, for example `eu-central-1`.
- [ ] Choose project name, for example `todo-devops`.
- [ ] Choose environments:
  - [ ] `dev`
  - [ ] `prod`, optional for portfolio
- [ ] Choose EKS cluster names:
  - [ ] `todo-devops-dev`
  - [ ] `todo-devops-prod`
- [ ] Choose ECR repository names:
  - [ ] `todo-frontend`
  - [ ] `todo-backend`
- [ ] Choose Kubernetes namespace:
  - [ ] `todo`

## 0.4 Create project branches

- [ ] Create `main` branch.
- [ ] Create `dev` branch.
- [ ] Create feature branches using this style:
  - [ ] `feature/backend-fastapi`
  - [ ] `feature/docker-compose`
  - [ ] `feature/terraform-eks`
  - [ ] `feature/github-actions`
  - [ ] `feature/monitoring`

## Deliverable

- [ ] Clean repository structure.
- [ ] Clear naming convention.
- [ ] Project roadmap committed as `TODO.md`.

---

# Phase 1 — Application Foundation

## 1.1 Prepare frontend

- [ ] Move current Angular code into `frontend/` if not already done.
- [ ] Confirm the app runs locally:

```bash
cd frontend
npm install
npm start
```

- [ ] Add environment configuration for API URL.
- [ ] Create frontend production build command.
- [ ] Add a simple frontend health route or static landing page check.
- [ ] Update frontend to call backend API through `/api`.

## 1.2 Create FastAPI backend

- [ ] Create `backend/` directory.
- [ ] Create FastAPI project structure:

```text
backend/
  app/
    main.py
    database.py
    models.py
    schemas.py
    config.py
    routers/
      todos.py
  tests/
  requirements.txt
  Dockerfile
```

- [ ] Create `/health` endpoint.
- [ ] Create `/api/todos` endpoints:
  - [ ] `GET /api/todos`
  - [ ] `POST /api/todos`
  - [ ] `GET /api/todos/{id}`
  - [ ] `PUT /api/todos/{id}`
  - [ ] `DELETE /api/todos/{id}`
- [ ] Add database connection using environment variables.
- [ ] Add SQLAlchemy or SQLModel.
- [ ] Add Alembic for migrations.
- [ ] Add basic tests with `pytest`.

## 1.3 Add PostgreSQL locally

- [ ] Add PostgreSQL service to `docker-compose.yml`.
- [ ] Define database environment variables:
  - [ ] `POSTGRES_DB`
  - [ ] `POSTGRES_USER`
  - [ ] `POSTGRES_PASSWORD`
  - [ ] `DATABASE_URL`
- [ ] Confirm backend can connect to PostgreSQL.
- [ ] Run initial migration.
- [ ] Test CRUD operations.

## 1.4 Add local Docker Compose

- [ ] Create root-level `docker-compose.yml`.
- [ ] Add services:
  - [ ] `frontend`
  - [ ] `backend`
  - [ ] `postgres`
- [ ] Confirm this command works:

```bash
docker compose up --build
```

- [ ] Confirm frontend can call backend.
- [ ] Confirm backend can read/write PostgreSQL data.

## Deliverable

- [ ] Full-stack app works locally.
- [ ] Angular frontend talks to FastAPI backend.
- [ ] FastAPI backend talks to PostgreSQL.
- [ ] Docker Compose starts the whole app.

---

# Phase 2 — Dockerization

## 2.1 Frontend Dockerfile

- [ ] Create `frontend/Dockerfile`.
- [ ] Use multi-stage build:
  - [ ] Node stage builds Angular app.
  - [ ] Nginx stage serves static files.
- [ ] Add `frontend/nginx.conf`.
- [ ] Configure Nginx to route `/api` requests to backend if needed.
- [ ] Confirm build works:

```bash
docker build -t todo-frontend:local ./frontend
```

## 2.2 Backend Dockerfile

- [ ] Create `backend/Dockerfile`.
- [ ] Use lightweight Python image.
- [ ] Install dependencies from `requirements.txt`.
- [ ] Run app with `uvicorn`.
- [ ] Expose port `8000`.
- [ ] Confirm build works:

```bash
docker build -t todo-backend:local ./backend
```

## 2.3 Image tagging strategy

- [ ] Use Git commit SHA as image tag.
- [ ] Use semantic tags for releases.
- [ ] Avoid relying on `latest` for deployment.
- [ ] Final tag examples:
  - [ ] `todo-frontend:<git-sha>`
  - [ ] `todo-backend:<git-sha>`

## Deliverable

- [ ] Frontend image builds successfully.
- [ ] Backend image builds successfully.
- [ ] Docker Compose can use local images.
- [ ] Image tagging strategy documented.

---

# Phase 3 — Kubernetes and Helm

## 3.1 Create initial Kubernetes manifests

- [ ] Create Kubernetes namespace:

```text
helm/todo-app/templates/namespace.yaml
```

- [ ] Create frontend Kubernetes resources:
  - [ ] Deployment
  - [ ] Service
  - [ ] ConfigMap if needed

- [ ] Create backend Kubernetes resources:
  - [ ] Deployment
  - [ ] Service
  - [ ] ConfigMap
  - [ ] Secret reference
  - [ ] Liveness probe
  - [ ] Readiness probe
  - [ ] Resource requests and limits

## 3.2 Create Helm chart

- [ ] Create chart:

```bash
helm create helm/todo-app
```

- [ ] Clean unnecessary default templates.
- [ ] Add templates:
  - [ ] `frontend-deployment.yaml`
  - [ ] `frontend-service.yaml`
  - [ ] `backend-deployment.yaml`
  - [ ] `backend-service.yaml`
  - [ ] `ingress.yaml`
  - [ ] `configmap.yaml`
  - [ ] `secret.yaml`
  - [ ] `hpa.yaml`

## 3.3 Configure Helm values

- [ ] Add frontend values:

```yaml
frontend:
  image:
    repository: ""
    tag: ""
  replicaCount: 2
```

- [ ] Add backend values:

```yaml
backend:
  image:
    repository: ""
    tag: ""
  replicaCount: 2
  env:
    databaseHost: ""
    databaseName: ""
```

- [ ] Add ingress values:

```yaml
ingress:
  enabled: true
  host: ""
```

- [ ] Add resource limits.
- [ ] Add autoscaling values.

## 3.4 Test Helm locally

- [ ] Use `kind`, `minikube`, or Docker Desktop Kubernetes.
- [ ] Run:

```bash
helm lint helm/todo-app
helm template todo-app helm/todo-app
helm upgrade --install todo-app helm/todo-app --namespace todo --create-namespace
```

- [ ] Confirm pods are running:

```bash
kubectl get pods -n todo
```

## Deliverable

- [ ] Helm chart deploys app successfully.
- [ ] Helm chart supports configurable image tags.
- [ ] App can run on local Kubernetes.

---

# Phase 4 — Terraform Infrastructure

## 4.1 Create Terraform base structure

- [ ] Create:

```text
infra/terraform/
  environments/
    dev/
      main.tf
      variables.tf
      outputs.tf
      backend.tf
      terraform.tfvars.example
    prod/
      main.tf
      variables.tf
      outputs.tf
      backend.tf
      terraform.tfvars.example
  modules/
    vpc/
    eks/
    rds/
    ecr/
    iam/
```

## 4.2 Configure Terraform backend

- [ ] Create S3 bucket for Terraform state.
- [ ] Create DynamoDB table for state locking, optional but recommended.
- [ ] Add backend configuration:

```hcl
terraform {
  backend "s3" {
    bucket         = "your-terraform-state-bucket"
    key            = "todo-devops/dev/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

## 4.3 Create VPC module

- [ ] Create VPC.
- [ ] Create public subnets.
- [ ] Create private subnets.
- [ ] Create internet gateway.
- [ ] Create NAT gateway, optional for cost control.
- [ ] Add route tables.
- [ ] Add tags required by EKS and load balancers.
- [ ] Output:
  - [ ] `vpc_id`
  - [ ] `public_subnets`
  - [ ] `private_subnets`

## 4.4 Create ECR module

- [ ] Create ECR repository for frontend.
- [ ] Create ECR repository for backend.
- [ ] Enable image scanning if desired.
- [ ] Add lifecycle policy to remove old images.
- [ ] Output:
  - [ ] `frontend_repository_url`
  - [ ] `backend_repository_url`

## 4.5 Create EKS module

- [ ] Create EKS cluster.
- [ ] Create managed node group.
- [ ] Use private subnets for worker nodes.
- [ ] Configure IAM roles.
- [ ] Configure cluster security group.
- [ ] Enable OIDC provider for IAM roles for service accounts.
- [ ] Output:
  - [ ] `cluster_name`
  - [ ] `cluster_endpoint`
  - [ ] `cluster_certificate_authority_data`
  - [ ] `oidc_provider_arn`

## 4.6 Create RDS module

- [ ] Create DB subnet group.
- [ ] Create PostgreSQL RDS instance.
- [ ] Place RDS in private subnets.
- [ ] Create RDS security group.
- [ ] Allow PostgreSQL access only from EKS worker node security group.
- [ ] Store username and password securely.
- [ ] Output:
  - [ ] `rds_endpoint`
  - [ ] `rds_port`
  - [ ] `database_name`

## 4.7 Add IAM/OIDC support

- [ ] Enable EKS OIDC provider.
- [ ] Add IAM role for AWS Load Balancer Controller.
- [ ] Add IAM role for External Secrets Operator if used later.
- [ ] Add IAM role for cluster autoscaler if used later.

## 4.8 Validate Terraform

- [ ] Run:

```bash
cd infra/terraform/environments/dev
terraform fmt -recursive
terraform init
terraform validate
terraform plan
```

## 4.9 Apply Terraform

- [ ] Apply infrastructure:

```bash
terraform apply
```

- [ ] Save outputs.
- [ ] Update kubeconfig:

```bash
aws eks update-kubeconfig --region eu-central-1 --name todo-devops-dev
```

- [ ] Validate cluster:

```bash
kubectl get nodes
```

## Deliverable

- [ ] AWS VPC created.
- [ ] ECR repositories created.
- [ ] EKS cluster created.
- [ ] RDS PostgreSQL created.
- [ ] Terraform outputs documented.
- [ ] Local kubectl can access EKS.

---

# Phase 5 — Ansible Automation

## 5.1 Define Ansible purpose

For this project, Ansible should not replace Terraform or Helm.

Use Ansible for:

- [ ] Installing local/admin tools.
- [ ] Configuring an optional admin EC2 instance.
- [ ] Validating EKS access.
- [ ] Running environment checks.
- [ ] Optionally configuring a self-hosted GitHub Actions runner.

## 5.2 Create Ansible structure

- [ ] Create:

```text
infra/ansible/
  inventory/
    dev.ini
  playbooks/
    install-tools.yml
    validate-cluster.yml
    configure-runner.yml
  roles/
    common/
    awscli/
    kubectl/
    helm/
```

## 5.3 Install admin tools

- [ ] Create playbook `install-tools.yml`.
- [ ] Install:
  - [ ] AWS CLI
  - [ ] kubectl
  - [ ] Helm
  - [ ] Git
  - [ ] Docker CLI if needed
  - [ ] unzip
  - [ ] curl

## 5.4 Validate cluster

- [ ] Create playbook `validate-cluster.yml`.
- [ ] Run checks:
  - [ ] AWS identity check
  - [ ] EKS cluster accessibility
  - [ ] Kubernetes nodes ready
  - [ ] Helm installed
  - [ ] Namespace exists
  - [ ] Application pods running

## 5.5 Optional self-hosted runner

- [ ] Create EC2 instance with Terraform if needed.
- [ ] Use Ansible to install GitHub Actions runner.
- [ ] Register runner manually or through secure automation.
- [ ] Add runner labels:
  - [ ] `self-hosted`
  - [ ] `aws`
  - [ ] `devops`

## Deliverable

- [ ] Ansible playbooks exist.
- [ ] Ansible role is clearly documented.
- [ ] Ansible validates the environment successfully.
- [ ] Optional admin host or self-hosted runner is configured.

---

# Phase 6 — AWS Load Balancer Controller and Ingress

## 6.1 Install AWS Load Balancer Controller

- [ ] Create IAM policy for AWS Load Balancer Controller.
- [ ] Create IAM role using EKS OIDC.
- [ ] Create Kubernetes service account.
- [ ] Install controller using Helm.
- [ ] Confirm controller pod is running.

## 6.2 Configure application ingress

- [ ] Add ingress template to Helm chart.
- [ ] Use path routing:
  - [ ] `/` routes to Angular frontend.
  - [ ] `/api` routes to FastAPI backend.
- [ ] Add ALB annotations.
- [ ] Configure health checks.
- [ ] Deploy Helm chart.
- [ ] Confirm AWS ALB is created.
- [ ] Test app through ALB DNS name.

## 6.3 Optional HTTPS

- [ ] Register domain or use existing domain.
- [ ] Create ACM certificate.
- [ ] Validate certificate.
- [ ] Add certificate ARN to ingress annotations.
- [ ] Redirect HTTP to HTTPS.
- [ ] Test secure URL.

## Deliverable

- [ ] Application is publicly reachable through AWS ALB.
- [ ] Frontend route works.
- [ ] Backend API route works.
- [ ] Optional HTTPS works.

---

# Phase 7 — GitHub Actions CI

## 7.1 Create frontend CI

- [ ] Create `.github/workflows/frontend-ci.yml`.
- [ ] Trigger on pull request and push.
- [ ] Steps:
  - [ ] Checkout code.
  - [ ] Set up Node.js.
  - [ ] Install dependencies.
  - [ ] Run lint.
  - [ ] Run tests.
  - [ ] Build Angular app.

## 7.2 Create backend CI

- [ ] Create `.github/workflows/backend-ci.yml`.
- [ ] Trigger on pull request and push.
- [ ] Steps:
  - [ ] Checkout code.
  - [ ] Set up Python.
  - [ ] Install dependencies.
  - [ ] Run formatting check.
  - [ ] Run tests.
  - [ ] Optional: run security check.

## 7.3 Create Docker build workflow

- [ ] Create `.github/workflows/docker-build.yml`.
- [ ] Trigger on merge to `main`.
- [ ] Authenticate to AWS.
- [ ] Login to ECR.
- [ ] Build frontend image.
- [ ] Build backend image.
- [ ] Tag images with Git SHA.
- [ ] Push images to ECR.
- [ ] Output image tags.

## 7.4 Add image scanning

- [ ] Add Trivy scan for frontend image.
- [ ] Add Trivy scan for backend image.
- [ ] Fail pipeline on critical vulnerabilities, optional.
- [ ] Upload scan report as artifact.

## Deliverable

- [ ] Pull requests run frontend tests.
- [ ] Pull requests run backend tests.
- [ ] Merge to main builds Docker images.
- [ ] Images are pushed to ECR.
- [ ] Image scan report is available.

---

# Phase 8 — GitHub Actions Terraform

## 8.1 Terraform plan workflow

- [ ] Create `.github/workflows/terraform-plan.yml`.
- [ ] Trigger when files under `infra/terraform/` change.
- [ ] Steps:
  - [ ] Checkout code.
  - [ ] Configure AWS credentials.
  - [ ] Set up Terraform.
  - [ ] Run `terraform fmt -check`.
  - [ ] Run `terraform init`.
  - [ ] Run `terraform validate`.
  - [ ] Run `terraform plan`.

## 8.2 Terraform apply workflow

- [ ] Create `.github/workflows/terraform-apply.yml`.
- [ ] Trigger manually using `workflow_dispatch`.
- [ ] Protect with GitHub Environment approval.
- [ ] Steps:
  - [ ] Checkout code.
  - [ ] Configure AWS credentials.
  - [ ] Set up Terraform.
  - [ ] Run `terraform init`.
  - [ ] Run `terraform apply`.

## 8.3 Use secure AWS authentication

- [ ] Prefer GitHub OIDC to AWS over long-lived AWS keys.
- [ ] Create IAM role for GitHub Actions.
- [ ] Restrict role permissions.
- [ ] Add environment protection rules.

## Deliverable

- [ ] Terraform plan runs automatically.
- [ ] Terraform apply runs manually.
- [ ] Infrastructure changes are auditable.
- [ ] AWS credentials are handled securely.

---

# Phase 9 — GitHub Actions Deployment to EKS

## 9.1 Create deployment workflow

- [ ] Create `.github/workflows/deploy.yml`.
- [ ] Trigger after Docker images are pushed.
- [ ] Configure AWS credentials.
- [ ] Update kubeconfig.
- [ ] Deploy Helm chart.

Example command:

```bash
helm upgrade --install todo-app ./helm/todo-app   --namespace todo   --create-namespace   --set frontend.image.repository=$FRONTEND_REPO   --set frontend.image.tag=$GITHUB_SHA   --set backend.image.repository=$BACKEND_REPO   --set backend.image.tag=$GITHUB_SHA
```

## 9.2 Add deployment verification

- [ ] Wait for frontend rollout.
- [ ] Wait for backend rollout.
- [ ] Check pods:

```bash
kubectl get pods -n todo
```

- [ ] Run smoke test against ALB URL.
- [ ] Fail deployment if health check fails.

## 9.3 Add rollback strategy

- [ ] Document Helm rollback command:

```bash
helm rollback todo-app <REVISION> -n todo
```

- [ ] Add workflow step to show Helm history.
- [ ] Optional: add manual rollback workflow.

## Deliverable

- [ ] Main branch deployment updates EKS.
- [ ] Helm release is created.
- [ ] Application rollout is verified.
- [ ] Rollback process is documented.

---

# Phase 10 — Monitoring with Prometheus and Grafana

## 10.1 Install kube-prometheus-stack

- [ ] Add Helm repo:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

- [ ] Create monitoring namespace.
- [ ] Install kube-prometheus-stack:

```bash
helm upgrade --install monitoring prometheus-community/kube-prometheus-stack   --namespace monitoring   --create-namespace
```

- [ ] Confirm monitoring pods are running:

```bash
kubectl get pods -n monitoring
```

## 10.2 Expose FastAPI metrics

- [ ] Add Prometheus instrumentation to FastAPI.
- [ ] Expose `/metrics` endpoint.
- [ ] Confirm metrics endpoint works locally.
- [ ] Confirm metrics endpoint works inside Kubernetes.

## 10.3 Add ServiceMonitor

- [ ] Add ServiceMonitor template to Helm chart.
- [ ] Add labels required by Prometheus Operator.
- [ ] Confirm Prometheus discovers backend target.
- [ ] Check target status in Prometheus UI.

## 10.4 Create Grafana dashboard

- [ ] Create custom dashboard:
  - [ ] Request rate
  - [ ] Error rate
  - [ ] Average latency
  - [ ] 95th percentile latency
  - [ ] Backend CPU usage
  - [ ] Backend memory usage
  - [ ] Pod restarts
  - [ ] Node CPU usage
  - [ ] Node memory usage
- [ ] Export dashboard JSON.
- [ ] Save dashboard to:

```text
monitoring/grafana/dashboards/todo-app-dashboard.json
```

## 10.5 Add alerts

- [ ] Create alert for high error rate.
- [ ] Create alert for high latency.
- [ ] Create alert for backend pod down.
- [ ] Create alert for repeated pod restarts.
- [ ] Optional: configure Slack/email notification.

## Deliverable

- [ ] Prometheus is installed.
- [ ] Grafana is installed.
- [ ] FastAPI metrics are scraped.
- [ ] Custom dashboard exists.
- [ ] Basic alerts exist.

---

# Phase 11 — Security and Secrets

## 11.1 GitHub secrets

- [ ] Add required GitHub secrets:
  - [ ] `AWS_ROLE_ARN`, if using OIDC
  - [ ] `AWS_REGION`
  - [ ] `EKS_CLUSTER_NAME`
  - [ ] `FRONTEND_ECR_REPOSITORY`
  - [ ] `BACKEND_ECR_REPOSITORY`

## 11.2 Kubernetes secrets

- [ ] Do not commit plain database passwords.
- [ ] Use Kubernetes Secret for database connection details.
- [ ] For better production style, use AWS Secrets Manager.
- [ ] Optional: integrate External Secrets Operator.

## 11.3 Container security

- [ ] Use non-root user in backend container.
- [ ] Use minimal base images where practical.
- [ ] Add `.dockerignore`.
- [ ] Remove unnecessary files from images.
- [ ] Scan images using Trivy.

## 11.4 Kubernetes security

- [ ] Add resource requests and limits.
- [ ] Add readiness and liveness probes.
- [ ] Add NetworkPolicies, optional.
- [ ] Avoid privileged containers.
- [ ] Restrict public access to backend where possible.
- [ ] Keep RDS private.

## Deliverable

- [ ] Secrets are not committed.
- [ ] Images are scanned.
- [ ] RDS is private.
- [ ] Backend uses secure runtime settings.
- [ ] Security checklist documented.

---

# Phase 12 — Optional GitOps with Argo CD

## 12.1 Install Argo CD

- [ ] Create `argocd` namespace.
- [ ] Install Argo CD.
- [ ] Access Argo CD UI.
- [ ] Change default admin password.

## 12.2 Create GitOps structure

Option A: same repository:

```text
gitops/
  apps/
    todo-app/
      values-dev.yaml
      values-prod.yaml
```

Option B: separate repository:

```text
todo-gitops/
  environments/
    dev/
    prod/
```

- [ ] Choose same-repo or separate-repo approach.
- [ ] Store Helm values in GitOps folder.
- [ ] Create Argo CD Application manifest.

## 12.3 Update CI/CD flow

New flow:

- [ ] GitHub Actions builds and pushes images.
- [ ] GitHub Actions updates image tag in GitOps values file.
- [ ] Argo CD syncs the app to EKS.

## Deliverable

- [ ] Argo CD is installed.
- [ ] Argo CD manages the todo app.
- [ ] Git is the source of truth for deployment.
- [ ] Argo CD dashboard screenshot added to README.

---

# Phase 13 — Documentation

## 13.1 README

- [ ] Add project title.
- [ ] Add architecture diagram.
- [ ] Add tech stack table.
- [ ] Add local setup instructions.
- [ ] Add Docker Compose instructions.
- [ ] Add Terraform deployment instructions.
- [ ] Add CI/CD explanation.
- [ ] Add monitoring explanation.
- [ ] Add screenshots.
- [ ] Add cost warning.
- [ ] Add cleanup instructions.

## 13.2 Architecture documentation

Create `docs/architecture.md`.

Include:

- [ ] High-level architecture.
- [ ] AWS architecture.
- [ ] Kubernetes architecture.
- [ ] CI/CD flow.
- [ ] Monitoring flow.
- [ ] Security design.

## 13.3 Deployment documentation

Create `docs/deployment.md`.

Include:

- [ ] Prerequisites.
- [ ] AWS setup.
- [ ] Terraform commands.
- [ ] EKS kubeconfig command.
- [ ] Helm deployment command.
- [ ] GitHub Actions deployment flow.
- [ ] Rollback command.

## 13.4 Monitoring documentation

Create `docs/monitoring.md`.

Include:

- [ ] Prometheus installation.
- [ ] Grafana access.
- [ ] Dashboard explanation.
- [ ] Alert rules.
- [ ] Metrics endpoint explanation.

## 13.5 Troubleshooting documentation

Create `docs/troubleshooting.md`.

Include common issues:

- [ ] EKS nodes not ready.
- [ ] Pods stuck in pending.
- [ ] ImagePullBackOff.
- [ ] CrashLoopBackOff.
- [ ] RDS connection failure.
- [ ] ALB not created.
- [ ] Prometheus target missing.
- [ ] Grafana dashboard not loading.

## Deliverable

- [ ] README is portfolio-ready.
- [ ] Architecture is documented.
- [ ] Deployment is documented.
- [ ] Monitoring is documented.
- [ ] Troubleshooting guide exists.

---

# Phase 14 — Portfolio Screenshots and Demo

## 14.1 Screenshots to capture

- [ ] Application running in browser.
- [ ] GitHub Actions successful CI.
- [ ] GitHub Actions successful Docker build.
- [ ] GitHub Actions successful deployment.
- [ ] Terraform plan/apply output.
- [ ] AWS EKS cluster page.
- [ ] AWS ECR repositories.
- [ ] AWS RDS instance.
- [ ] `kubectl get pods -n todo`.
- [ ] `kubectl get ingress -n todo`.
- [ ] Prometheus targets page.
- [ ] Grafana dashboard.
- [ ] Optional: Argo CD dashboard.

## 14.2 Demo video

- [ ] Record short demo video.
- [ ] Show app.
- [ ] Show GitHub repo.
- [ ] Show CI/CD pipeline.
- [ ] Show EKS pods.
- [ ] Show Grafana dashboard.
- [ ] Explain Terraform and Ansible roles.
- [ ] Keep demo around 3–6 minutes.

## 14.3 Portfolio explanation

Prepare a short explanation:

> I built a full-stack todo application and deployed it using a production-like DevOps workflow. Terraform provisions AWS infrastructure, GitHub Actions builds and deploys Docker images to EKS, Helm manages Kubernetes manifests, RDS provides the database, and Prometheus/Grafana provide observability.

## Deliverable

- [ ] Screenshots added to README.
- [ ] Demo video recorded.
- [ ] Portfolio explanation written.
- [ ] LinkedIn/GitHub project post prepared.

---

# Phase 15 — Cost Control and Cleanup

## 15.1 Cost-control checklist

- [ ] Use small EKS node instances for dev.
- [ ] Use only one dev environment unless needed.
- [ ] Avoid unnecessary NAT Gateway if cost is a concern.
- [ ] Stop or destroy unused infrastructure.
- [ ] Use RDS small instance type for demo.
- [ ] Set AWS budget alerts.

## 15.2 Cleanup commands

- [ ] Delete Helm app:

```bash
helm uninstall todo-app -n todo
```

- [ ] Delete monitoring stack:

```bash
helm uninstall monitoring -n monitoring
```

- [ ] Destroy Terraform infrastructure:

```bash
cd infra/terraform/environments/dev
terraform destroy
```

- [ ] Confirm AWS resources are deleted:
  - [ ] EKS cluster
  - [ ] EC2 nodes
  - [ ] Load balancer
  - [ ] NAT Gateway
  - [ ] RDS instance
  - [ ] EBS volumes
  - [ ] ECR repositories, if desired

## Deliverable

- [ ] Cleanup process documented.
- [ ] Cost warning added to README.
- [ ] AWS resources can be safely destroyed.

---

# Final Completion Checklist

## Application

- [ ] Angular frontend complete.
- [ ] FastAPI backend complete.
- [ ] PostgreSQL integration complete.
- [ ] CRUD operations complete.
- [ ] Health endpoint complete.
- [ ] Metrics endpoint complete.

## Docker

- [ ] Frontend Dockerfile complete.
- [ ] Backend Dockerfile complete.
- [ ] Docker Compose complete.
- [ ] Images build successfully.

## Kubernetes and Helm

- [ ] Helm chart complete.
- [ ] Frontend Deployment complete.
- [ ] Backend Deployment complete.
- [ ] Services complete.
- [ ] Ingress complete.
- [ ] HPA complete.
- [ ] Probes and resource limits complete.

## AWS and Terraform

- [ ] VPC complete.
- [ ] EKS complete.
- [ ] ECR complete.
- [ ] RDS complete.
- [ ] IAM/OIDC complete.
- [ ] Remote state complete.
- [ ] Terraform plan/apply works.

## Ansible

- [ ] Tool installation playbook complete.
- [ ] Cluster validation playbook complete.
- [ ] Optional runner configuration complete.
- [ ] Ansible usage documented.

## CI/CD

- [ ] Frontend CI complete.
- [ ] Backend CI complete.
- [ ] Docker build workflow complete.
- [ ] Terraform plan workflow complete.
- [ ] Terraform apply workflow complete.
- [ ] EKS deploy workflow complete.
- [ ] Rollback documented.

## Monitoring

- [ ] Prometheus installed.
- [ ] Grafana installed.
- [ ] FastAPI metrics exposed.
- [ ] ServiceMonitor complete.
- [ ] Dashboard complete.
- [ ] Alerts complete.

## Security

- [ ] Secrets are not committed.
- [ ] GitHub OIDC configured.
- [ ] RDS is private.
- [ ] Image scanning complete.
- [ ] Resource limits complete.

## Documentation

- [ ] README complete.
- [ ] Architecture doc complete.
- [ ] Deployment doc complete.
- [ ] Monitoring doc complete.
- [ ] Troubleshooting doc complete.
- [ ] Screenshots added.
- [ ] Demo video prepared.

---

# Recommended Build Order Summary

Use this exact order:

1. Restructure repository.
2. Add FastAPI backend.
3. Add PostgreSQL locally.
4. Add Docker Compose.
5. Dockerize frontend and backend.
6. Create Helm chart.
7. Test Helm locally.
8. Create Terraform VPC.
9. Create Terraform ECR.
10. Create Terraform EKS.
11. Create Terraform RDS.
12. Configure kubectl access to EKS.
13. Install AWS Load Balancer Controller.
14. Deploy app to EKS manually with Helm.
15. Add GitHub Actions CI.
16. Add Docker image build and push to ECR.
17. Add GitHub Actions deploy to EKS.
18. Add Terraform plan/apply workflows.
19. Add Ansible automation.
20. Add Prometheus and Grafana.
21. Add FastAPI metrics and ServiceMonitor.
22. Add Grafana dashboard and alerts.
23. Add security improvements.
24. Add documentation and screenshots.
25. Optional: add Argo CD GitOps.
26. Record demo video.
27. Add cleanup instructions.

---

# Notes for Recruiters / Reviewers

This project demonstrates:

- Full-stack application development
- Docker-based containerization
- Kubernetes deployment
- AWS EKS orchestration
- AWS RDS managed database
- AWS ECR container registry
- Terraform infrastructure as code
- Ansible automation
- GitHub Actions CI/CD
- Helm-based deployment
- Prometheus monitoring
- Grafana visualization
- Cloud security basics
- Production-like documentation

