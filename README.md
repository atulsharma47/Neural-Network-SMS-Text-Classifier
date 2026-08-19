<div align="center">

# 🛡️ SpamShield AI

### AI-Powered SMS Spam Detection & Text Intelligence Platform

An end-to-end NLP and Machine Learning application for real-time SMS spam detection, batch message analysis, explainable predictions, and interactive model analytics.

[![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python\&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react\&logoColor=black)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi\&logoColor=white)](#)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-Keras-FF6F00?logo=tensorflow\&logoColor=white)](#)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-ML-F7931E?logo=scikitlearn\&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#)

</div>

---

## 📌 Overview

SpamShield AI is a full-stack **Natural Language Processing and Machine Learning platform** designed to classify SMS messages as **Spam** or **Ham** in real time.

The application combines a modern React frontend with a FastAPI backend and multiple Machine Learning models. Messages pass through a text preprocessing pipeline before being evaluated by trained models.

The project includes:

* Real-time SMS classification
* NLP preprocessing visualization
* Explainable predictions
* Multiple model comparison
* Batch CSV analysis
* Interactive analytics
* Model performance evaluation
* REST API
* Automated testing

The models are trained and evaluated using the **UCI SMS Spam Collection dataset**.

---

# 📸 Screenshots

## 🔍 SMS Analyzer

<p align="center">
  <img src="assets/analyzer.png" width="900" alt="SpamShield AI Analyzer">
</p>

<p align="center">
Real-time SMS classification with prediction confidence, detected spam indicators, and NLP preprocessing visualization.
</p>

---

## 📊 Analytics Dashboard

<p align="center">
  <img src="assets/dashboard.png" width="900" alt="SpamShield AI Analytics Dashboard">
</p>

<p align="center">
Interactive analytics dashboard showing dataset statistics, model comparison, performance metrics, and message distribution.
</p>

---

## 📦 Batch CSV Analysis



<p align="center">
Upload a CSV file containing multiple SMS messages and classify them in bulk.
</p>

---

# ✨ Key Features

## ⚡ Real-Time SMS Classification

Enter any SMS message and receive an instant prediction.

```text
Message
   ↓
Text Preprocessing
   ↓
Feature Extraction
   ↓
Machine Learning Model
   ↓
SPAM / HAM Prediction
```

Each prediction includes a confidence score.

Example:

```text
Prediction: SPAM

Confidence: 98.4%
```

---

## 🧠 Explainable Predictions

SpamShield AI identifies important words and features that contribute to a spam prediction.

Example:

```text
Message:
Congratulations! You have won a FREE prize.

Detected Indicators:

FREE
WON
CONGRATULATIONS
PRIZE
```

The explanation is generated from the trained model's features and preprocessing pipeline rather than using hardcoded keyword matching.

---

## 🔬 NLP Processing Pipeline

The application visualizes how raw text is transformed before classification.

```text
Original Message
        ↓
Lowercasing
        ↓
Removing Punctuation
        ↓
Tokenization
        ↓
Stopword Removal
        ↓
Text Vectorization
        ↓
Model Prediction
```

This makes the Machine Learning process easier to understand and inspect.

---

## 📊 Interactive Analytics Dashboard

The analytics dashboard provides insights into the dataset and trained models.

Available analytics include:

* Total SMS messages
* Spam vs Ham distribution
* Model accuracy
* Precision
* Recall
* F1 Score
* Model comparison
* Confusion Matrix
* Word frequency analysis
* Prediction confidence

All metrics are generated from actual training and evaluation results.

---

## 🧪 Multiple Machine Learning Models

SpamShield AI compares multiple approaches to text classification.

### 1. Multinomial Naive Bayes

A strong baseline model commonly used for text classification and spam filtering.

### 2. Logistic Regression

A high-performing linear model for binary text classification.

### 3. Neural Network

A TensorFlow/Keras-based neural network for SMS classification.

Example architecture:

```text
Text Input
    ↓
Text Vectorization
    ↓
Embedding Layer
    ↓
Global Average Pooling
    ↓
Dense Layer
    ↓
Dropout
    ↓
Sigmoid Output
```

The models are trained and evaluated using the same dataset split, allowing their performance to be compared fairly.

---

## 📦 Batch CSV Prediction

Upload a CSV file containing multiple SMS messages.

Example:

```csv
message
Congratulations! You won a free prize.
Hey, are we still meeting today?
Call now to claim your reward.
```

The application processes every message and returns predictions.

```text
Message                         Prediction    Confidence

Congratulations! You won...    SPAM          98.2%

Hey, are we still meeting...   HAM           99.1%

Call now to claim your...      SPAM          97.6%
```

The processed results can be downloaded for further analysis.

---

# 🛠️ Technology Stack

| Category           | Technologies              |
| ------------------ | ------------------------- |
| Frontend           | React, Vite, Tailwind CSS |
| Data Visualization | Recharts                  |
| API Communication  | Axios                     |
| Backend            | Python, FastAPI, Uvicorn  |
| Machine Learning   | Scikit-learn              |
| Deep Learning      | TensorFlow, Keras         |
| NLP Processing     | NLTK                      |
| Data Processing    | Pandas, NumPy             |
| Testing            | Pytest                    |
| Containerization   | Docker, Docker Compose    |

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │                     │
                    │  Home               │
                    │  SMS Analyzer       │
                    │  Analytics          │
                    │  Batch Processing   │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │    FastAPI Backend  │
                    │                     │
                    │ Prediction Service  │
                    │ NLP Processing      │
                    │ Analytics Service   │
                    │ Batch Processing    │
                    └──────────┬──────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │       Machine Learning         │
              │                                │
              │  Naive Bayes                   │
              │  Logistic Regression           │
              │  Neural Network                │
              └───────────────┬────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  UCI SMS Dataset    │
                    │                     │
                    │ Spam / Ham Messages │
                    └─────────────────────┘
```

---

# 📂 Project Structure

```text
SpamShield-AI/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Analyzer.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── BatchAnalysis.jsx
│   │   │
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── services/
│   │   ├── preprocessing.py
│   │   ├── prediction.py
│   │   ├── analytics.py
│   │   └── model_training.py
│   │
│   ├── scripts/
│   │   └── train.py
│   │
│   ├── models/
│   │   ├── spam_classifier.pkl
│   │   ├── vectorizer.pkl
│   │   ├── neural_network.keras
│   │   └── metrics.json
│   │
│   ├── tests/
│   │   ├── test_prediction.py
│   │   ├── test_preprocessing.py
│   │   └── test_api.py
│   │
│   ├── main.py
│   └── requirements.txt
│
├── assets/
│   ├── home.png
│   ├── analyzer.png
│   ├── dashboard.png
│   └── batch-analysis.png
│
├── docker-compose.yml
├── README.md
├── .gitignore
├── .env.example
└── LICENSE
```

---

# 🤖 Machine Learning Pipeline

The model training workflow follows these stages:

```text
UCI SMS Spam Collection Dataset
              │
              ▼
       Data Loading
              │
              ▼
      Data Cleaning
              │
              ▼
     NLP Preprocessing
              │
              ├── Lowercasing
              ├── Tokenization
              ├── Punctuation Removal
              └── Stopword Removal
              │
              ▼
     Train / Test Split
              │
              ▼
      Model Training
              │
     ┌────────┼────────┐
     ▼        ▼        ▼
 Naive     Logistic   Neural
 Bayes     Regression Network
     │        │        │
     └────────┼────────┘
              ▼
       Model Evaluation
              │
              ▼
     Accuracy / Precision
     Recall / F1 Score
              │
              ▼
      Save Model Artifacts
```

---

# 🚀 Running Locally

## Prerequisites

Make sure you have the following installed:

* Python 3.10 or later
* Node.js 18 or later
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/atulsharma47/Neural-Network-SMS-Text-Classifier.git

cd Neural-Network-SMS-Text-Classifier
```

---

## 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Train the models:

```bash
python scripts/train.py
```

The training pipeline will:

1. Load or download the UCI SMS Spam Collection dataset.
2. Clean and preprocess the text.
3. Split the dataset into training and testing sets.
4. Train multiple Machine Learning models.
5. Evaluate model performance.
6. Save trained model artifacts.
7. Generate evaluation metrics.

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# 📡 API Reference

FastAPI automatically provides interactive API documentation.

Once the backend is running, visit:

```text
http://127.0.0.1:8000/docs
```

## Available Endpoints

| Method | Endpoint                | Description                                 |
| ------ | ----------------------- | ------------------------------------------- |
| GET    | `/health`               | Check API and model status                  |
| POST   | `/api/v1/predict`       | Predict Spam or Ham for a single message    |
| POST   | `/api/v1/batch-predict` | Upload a CSV and classify multiple messages |
| GET    | `/api/v1/analytics`     | Retrieve dataset and model analytics        |
| GET    | `/api/v1/models`        | Retrieve model performance metrics          |

---

# 🔍 Example Prediction

## Request

```json
{
  "message": "Congratulations! You have won a FREE prize. Call now to claim."
}
```

## Response

```json
{
  "prediction": "SPAM",
  "confidence": 98.4,
  "indicators": [
    "congratulations",
    "won",
    "free",
    "prize",
    "call"
  ]
}
```

> The confidence score and indicators shown above are examples. Actual values depend on the trained model.

---

# 🧪 Testing

Run backend tests:

```bash
cd backend

pytest
```

The test suite covers:

* Text preprocessing
* Prediction logic
* API endpoints
* CSV validation
* Batch prediction
* Invalid request handling

---

# 🐳 Docker

If Docker support is configured, run:

```bash
docker-compose up --build
```

This starts both the frontend and backend services.

```text
Frontend
http://localhost:5173

Backend
http://localhost:8000
```

---

# 📊 Dataset

This project uses the **UCI SMS Spam Collection**, a publicly available dataset containing labeled SMS messages.

The dataset contains two categories:

```text
Spam
Ham
```

The dataset is used for training and evaluating all classification models.

Dataset source:

https://archive.ics.uci.edu/dataset/228/sms+spam+collection

---

# 🎯 Skills Demonstrated

This project demonstrates practical experience with:

* Natural Language Processing
* Text preprocessing
* Tokenization
* Stopword removal
* Feature extraction
* Machine Learning classification
* Neural Networks
* TensorFlow and Keras
* Model evaluation
* Accuracy, Precision, Recall, and F1 Score
* Confusion matrices
* Python data manipulation with Pandas and NumPy
* REST API development with FastAPI
* React frontend development
* Batch data processing
* Data visualization
* Software testing
* Full-stack application architecture

---

# 🔮 Future Improvements

* [ ] Transformer-based text classification
* [ ] BERT integration
* [ ] Multilingual SMS classification
* [ ] User authentication
* [ ] Prediction history
* [ ] Database integration
* [ ] Cloud deployment
* [ ] CI/CD pipeline with GitHub Actions
* [ ] LLM-generated prediction explanations
* [ ] Real-time model monitoring

---

# 👨‍💻 Author

**Atul Sharma**

Backend-Focused Developer interested in:

* Backend Development
* Machine Learning
* Natural Language Processing
* Data Engineering
* Full-Stack Development

GitHub: https://github.com/atulsharma47

LinkedIn: https://www.linkedin.com/in/atul-sharma-ab03882b6/

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

### ⭐ If you find this project useful, consider giving it a star.

Built with Python, NLP, Machine Learning, TensorFlow, FastAPI, React, and curiosity.

</div>
