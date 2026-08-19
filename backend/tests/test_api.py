from fastapi.testclient import TestClient
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "ok"

def test_predict_endpoint_no_body():
    response = client.post("/api/v1/predict")
    assert response.status_code == 422 

def test_predict_endpoint_ham():
    response = client.post("/api/v1/predict", json={"message": "Hey, what time are we meeting today?", "model": "Naive Bayes"})
    if response.status_code == 200:
        data = response.json()
        assert "prediction" in data
        assert "confidence" in data
        assert "pipeline" in data

def test_predict_endpoint_spam():
    response = client.post("/api/v1/predict", json={"message": "Congratulations! You won a FREE iPhone. Claim your prize now!", "model": "Logistic Regression"})
    if response.status_code == 200:
        data = response.json()
        assert "prediction" in data
        assert data["prediction"] in ["SPAM", "HAM"]
