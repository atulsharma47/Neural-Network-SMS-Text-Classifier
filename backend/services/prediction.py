import os
import json
import pickle
import pandas as pd
from services.preprocessing import clean_text_step_by_step, preprocess_text

try:
    from tensorflow.keras.models import load_model
    TF_AVAILABLE = True
except ImportError:
    TF_AVAILABLE = False

MODELS_DIR = os.path.join(os.path.dirname(__file__), '..', 'models')

class SpamClassifier:
    def __init__(self):
        self.vectorizer = None
        self.nb_model = None
        self.lr_model = None
        self.nn_model = None
        self.metrics = None
        self.load_models()
        
    def load_models(self):
        try:
            with open(os.path.join(MODELS_DIR, 'vectorizer.pkl'), 'rb') as f:
                self.vectorizer = pickle.load(f)
            with open(os.path.join(MODELS_DIR, 'nb_model.pkl'), 'rb') as f:
                self.nb_model = pickle.load(f)
            with open(os.path.join(MODELS_DIR, 'lr_model.pkl'), 'rb') as f:
                self.lr_model = pickle.load(f)
            with open(os.path.join(MODELS_DIR, 'metrics.json'), 'r') as f:
                self.metrics = json.load(f)
            
            if TF_AVAILABLE and os.path.exists(os.path.join(MODELS_DIR, 'nn_model.keras')):
                self.nn_model = load_model(os.path.join(MODELS_DIR, 'nn_model.keras'))
        except Exception as e:
            print(f"Error loading models: {e}. Run the training script first.")

    def predict_single(self, text: str, use_model: str = "Neural Network"):
        pipeline_steps = clean_text_step_by_step(text)
        cleaned_text = pipeline_steps["cleaned_text"]
        
        confidence = 0.0
        prediction = 0
        
        if use_model == "Neural Network" and self.nn_model is not None:
            import tensorflow as tf
            input_data = tf.constant([text])
            prob = self.nn_model.predict(input_data, verbose=0)[0][0]
            confidence = float(prob) if prob > 0.5 else float(1 - prob)
            prediction = 1 if prob > 0.5 else 0
        elif use_model == "Logistic Regression" and self.lr_model is not None:
            vec = self.vectorizer.transform([cleaned_text])
            prob = self.lr_model.predict_proba(vec)[0][1]
            confidence = float(prob) if prob > 0.5 else float(1 - prob)
            prediction = 1 if prob > 0.5 else 0
        else:
            if self.nb_model is None:
                return {"error": "Models not trained"}
            vec = self.vectorizer.transform([cleaned_text])
            prob = self.nb_model.predict_proba(vec)[0][1]
            confidence = float(prob) if prob > 0.5 else float(1 - prob)
            prediction = 1 if prob > 0.5 else 0

        # hardcoded list of spammy words (could improve this later)
        spam_indicators = ["free", "win", "winner", "prize", "urgent", "call", "now", "text", "cash", "claim", "guaranteed", "reply", "stop", "100%", "offer", "discount"]
        detected_indicators = [w for w in pipeline_steps["stopwords_removed"] if w in spam_indicators]
        
        return {
            "prediction": "SPAM" if prediction == 1 else "HAM",
            "confidence": round(confidence * 100, 2),
            "pipeline": pipeline_steps,
            "detected_indicators": detected_indicators,
            "model_used": use_model if (use_model != "Neural Network" or self.nn_model is not None) else "Naive Bayes"
        }

    def predict_batch(self, texts: list):
        if not self.lr_model:
            return []
        
        results = []
        for text in texts:
            cleaned = preprocess_text(text)
            vec = self.vectorizer.transform([cleaned])
            prob = self.lr_model.predict_proba(vec)[0][1]
            pred = "SPAM" if prob > 0.5 else "HAM"
            
            results.append({
                "message": text,
                "prediction": pred,
                "confidence": round((prob if prob > 0.5 else (1 - prob)) * 100, 2)
            })
        return results

classifier = SpamClassifier()
