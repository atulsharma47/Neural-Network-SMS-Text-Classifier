# SpamShield AI

**AI-powered SMS spam detection platform built using Python, NLP, Machine Learning, Neural Networks, FastAPI and React.**

An end-to-end NLP and machine learning platform for real-time SMS spam detection, batch message analysis, model evaluation, explainable predictions, and interactive data visualization. Trained and evaluated using the UCI SMS Spam Collection dataset.

## Screenshots

<p align="center">
  <img src="assets/analyzer.png" width="800" alt="Analyzer Dashboard">
  <br>
  <em>Real-time inference and NLP pipeline visualization</em>
</p>

<p align="center">
  <img src="assets/dashboard.png" width="800" alt="Analytics Dashboard">
  <br>
  <em>Interactive analytics and model evaluation metrics</em>
</p>

## Features

- ✓ Real-time SMS classification
- ✓ Spam/Ham confidence scoring
- ✓ NLP preprocessing pipeline visualization
- ✓ Batch CSV analysis
- ✓ Model performance comparison (Naive Bayes, Logistic Regression, Neural Networks)
- ✓ Confusion matrix and analytics dashboard
- ✓ Explainable predictions (Keyword highlighting)
- ✓ REST API
- ✓ Deployed live application

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Recharts, Lucide React
**Backend:** Python, FastAPI, Scikit-learn, TensorFlow / Keras, NLTK, Pandas

## Project Architecture

```
SpamShield-AI/
├── frontend/             # React application (Vite + Tailwind)
│   ├── src/
│   │   ├── pages/        # Home, Analyzer, Dashboard
│   │   ├── App.jsx       # Routing and Layout
│   │   └── index.css     # Global styles
│   └── package.json
│
├── backend/              # FastAPI server and ML pipeline
│   ├── data/             # UCI dataset (auto-downloaded)
│   ├── models/           # Trained models (.pkl, .keras) and metrics.json
│   ├── scripts/
│   │   └── train.py      # Reproducible model training pipeline
│   ├── services/
│   │   ├── preprocessing.py # NLTK text processing
│   │   └── prediction.py    # Inference logic
│   ├── main.py           # API Endpoints
│   └── requirements.txt
```

## Running Locally

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Train the models (downloads dataset automatically):
   ```bash
   # On Windows, enforce UTF-8 encoding
   $env:PYTHONUTF8="1"
   python scripts/train.py
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:8000`.

## API Documentation

- `GET /health` - Check API and model load status.
- `POST /api/v1/predict` - Predict spam on a single message.
- `POST /api/v1/batch-predict` - Upload a CSV for bulk predictions.
- `GET /api/v1/analytics` - Fetch dataset statistics and model metrics.