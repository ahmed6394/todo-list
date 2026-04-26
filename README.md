# Todo List (Angular)

Clean Angular 14 Todo app with local dev, Dockerized production, and Kubernetes manifests.

## Quick start

```bash
npm install
npm start
```

Local URL: `http://localhost:4200`

## Architecture

```text
Browser -> Angular SPA -> Nginx container -> Kubernetes Service (NodePort 30080) -> Pods (todo-list)
```

- Frontend: Angular app in `src/app/` (`todo/` component + `Todo.model.ts`).
- Container: multi-stage `Dockerfile` (`dev` for hot reload, `prod` with Nginx).
- Orchestration: manifests in `k8s/` (`namespace`, `deployment`, `service`, optional `pod`).

### UI preview placeholders

- Desktop screenshot: `docs/screenshots/todo-desktop.png`
- Mobile screenshot: `docs/screenshots/todo-mobile.png`
- Demo GIF: `docs/gifs/todo-flow.gif`

## Run with Docker

```bash
docker compose up --build todo-dev
docker compose --profile prod up --build todo-prod
docker compose down
```

Production URL (compose): `http://localhost:8080`

## Build and push image

```bash
docker build -t ahmed63/todo-list:v1 --target prod .
docker push ahmed63/todo-list:v1
```

## CI/CD (GitHub Actions)

Workflow file: `.github/workflows/main.yaml`

The pipeline runs on push to `main` (and can also be triggered manually).

### What the pipeline does

1. Builds the Docker image using the `prod` stage.
2. Pushes tags `v1` and `latest` to Docker Hub.
3. SSHes into an EC2 instance.
4. Pulls `ahmed63/todo-list:v1` on EC2.
5. Replaces the running `todo-list` container on port `80`.

### Required GitHub repository secrets

Add these in GitHub repository settings:

- `DOCKER_USERNAME` - Docker Hub username (example: `ahmed63`)
- `DOCKER_PASSWORD` - Docker Hub password or access token
- `AWS_HOST` - EC2 public IP or DNS where container is deployed
- `AWS_USER` - SSH user for that EC2 instance (example: `ubuntu`)
- `AWS_KEY` - Full private key content (`.pem`) for EC2 SSH access

Path in GitHub UI:

`Repository -> Settings -> Secrets and variables -> Actions -> New repository secret`

### Trigger and monitor pipeline

1. Commit and push changes to `main`.
2. Open the Actions tab in GitHub.
3. Open the latest run of `CI/CD for todo-list App`.
4. Check `build-and-push` and `deploy` job logs.

### Verify deployment on EC2

```bash
docker ps
docker logs todo-list
curl http://localhost
```

### Common CI/CD issues

- `denied: requested access to the resource is denied`
	- Check `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets.
- `Permission denied (publickey)`
	- Check `AWS_USER`, `AWS_HOST`, and `AWS_KEY` secrets.
- Image not updated on EC2
	- Confirm workflow pushed `v1` successfully.
	- Confirm deploy job pulled `todo-list:v1` and restarted container.

## Deploy to Kubernetes

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods -n kubernetes-cluster
kubectl get svc -n kubernetes-cluster
```

## Scripts

- `npm start` - dev server
- `npm run build` - production build to `dist/todo_list`
- `npm run watch` - watch build
- `npm test` - unit tests (Karma)
