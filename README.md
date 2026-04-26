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
