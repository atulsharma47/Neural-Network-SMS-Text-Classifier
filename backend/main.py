from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
import io

from services.prediction import classifier

app = FastAPI(title="SpamShield AI", description="Intelligent SMS Spam Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    message: str
    model: str = "Neural Network"

@app.get("/health")
def health_check():
    return {"status": "ok", "models_loaded": classifier.metrics is not None}

@app.post("/api/v1/predict")
def predict(req: PredictRequest):
    if not classifier.metrics:
        # try reloading
        classifier.load_models()
        if not classifier.metrics:
            raise HTTPException(status_code=503, detail="Models not loaded yet. Please run training script.")
    return classifier.predict_single(req.message, req.model)

@app.post("/api/v1/batch-predict")
async def batch_predict(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Must upload a CSV file")
    
    contents = await file.read()
    try:
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        if 'message' not in df.columns:
            raise HTTPException(status_code=400, detail="CSV must contain a 'message' column")
        
        texts = df['message'].dropna().tolist()
        results = classifier.predict_batch(texts)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing CSV: {str(e)}")

@app.get("/api/v1/analytics")
def get_analytics():
    if not classifier.metrics:
        classifier.load_models()
        if not classifier.metrics:
            raise HTTPException(status_code=503, detail="Models not loaded yet")
    return classifier.metrics
