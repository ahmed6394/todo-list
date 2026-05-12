todo-list/
|-- frontend/
|   |-- src/
|   |-- angular.json
|   |-- package.json
|   |-- Dockerfile
|   `-- nginx.conf
|
|-- backend/
|   |-- app/
|   |   |-- main.py
|   |   |-- database.py
|   |   |-- models.py
|   |   |-- schemas.py
|   |   `-- routers/
|   |       `-- todos.py
|   |-- tests/
|   |-- requirements.txt
|   `-- Dockerfile
|
|-- docker-compose.yml
|
|-- k8s/
|   |-- base/
|   |   `-- namespace.yaml
|   |-- frontend/
|   |   |-- deployment.yaml
|   |   |-- service.yaml
|   |   `-- ingress.yaml
|   `-- backend/
|       |-- deployment.yaml
|       |-- service.yaml
|       |-- configmap.yaml
|       |-- secret.yaml
|       `-- hpa.yaml
|-- overlays/
|   |-- dev/
|   |   `-- kustomization.yaml
|   `-- prod/
|       `-- kustomization.yaml
|
|-- helm/
|   `-- todo-app/
|       |-- Chart.yaml
|       |-- values.yaml
|       `-- templates/
|
|-- infra/
|   |-- terraform/
|   |   |-- environments/
|   |   |   |-- dev/
|   |   |   |   |-- main.tf
|   |   |   |   |-- variables.tf
|   |   |   |   |-- outputs.tf
|   |   |   |   |-- backend.tf
|   |   |   |   `-- terraform.tfvars.example
|   |   |   `-- prod/
|   |   |       |-- main.tf
|   |   |       |-- variables.tf
|   |   |       |-- outputs.tf
|   |   |       |-- backend.tf
|   |   |       `-- terraform.tfvars.example
|   |   `-- modules/
|   |       |-- vpc/
|   |       |-- eks/
|   |       |-- rds/
|   |       |-- ecr/
|   |       `-- iam/
|   `-- ansible/
|       |-- inventory/
|       |   `-- dev.ini
|       |-- playbooks/
|       |   |-- bootstrap-admin.yml
|       |   |-- install-tools.yml
|       |   `-- validate-cluster.yml
|       `-- roles/
|           |-- common/
|           |-- kubectl/
|           |-- helm/
|           `-- awscli/
|
|-- monitoring/
|   |-- prometheus/
|   |   `-- values.yaml
|   `-- grafana/
|       `-- dashboards/
|           `-- todo-app-dashboard.json
|
|-- .github/
|   `-- workflows/
|       |-- ci.yml
|       |-- docker-build.yml
|       |-- terraform-plan.yml
|       |-- terraform-apply.yml
|       `-- deploy.yml
|
|-- README.md
|-- ARCHITECTURE.md
`-- DEPLOYMENT.md