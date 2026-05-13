import pytest
from fastapi.testclient import TestClient
from app.app import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_create_todo():
    response = client.post("/api/todos", json={"content": "Test todo", "status": False})
    assert response.status_code == 201
    assert response.json()["content"] == "Test todo"

def test_get_todos():
    client.post("/api/todos", json={"content": "Todo 1"})
    response = client.get("/api/todos")
    assert response.status_code == 200
    assert len(response.json()) >= 1

def test_get_todo_by_id():
    create_response = client.post("/api/todos", json={"content": "Test"})
    todo_id = create_response.json()["id"]
    response = client.get(f"/api/todos/{todo_id}")
    assert response.status_code == 200

def test_update_todo():
    create_response = client.post("/api/todos", json={"content": "Original"})
    todo_id = create_response.json()["id"]
    response = client.put(f"/api/todos/{todo_id}", json={"content": "Updated", "status": True})
    assert response.status_code == 200
    assert response.json()["content"] == "Updated"

def test_delete_todo():
    create_response = client.post("/api/todos", json={"content": "To delete"})
    todo_id = create_response.json()["id"]
    response = client.delete(f"/api/todos/{todo_id}")
    assert response.status_code == 204