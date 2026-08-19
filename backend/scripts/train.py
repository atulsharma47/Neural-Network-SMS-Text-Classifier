import os
import json
import urllib.request
import zipfile
import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# Note: TensorFlow is only used if installed, else fallback.
try:
    import tensorflow as tf
    from tensorflow.keras.layers import TextVectorization, Embedding, GlobalAveragePooling1D, Dense, Dropout
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.callbacks import EarlyStopping
    TF_AVAILABLE = True
except ImportError:
    TF_AVAILABLE = False

import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.preprocessing import preprocess_text

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
MODELS_DIR = os.path.join(os.path.dirname(__file__), '..', 'models')
DATASET_URL = "https://archive.ics.uci.edu/ml/machine-learning-databases/00228/smsspamcollection.zip"

def download_data():
    os.makedirs(DATA_DIR, exist_ok=True)
    zip_path = os.path.join(DATA_DIR, 'smsspamcollection.zip')
    if not os.path.exists(zip_path):
        print("Downloading UCI SMS Spam Collection dataset...")
        urllib.request.urlretrieve(DATASET_URL, zip_path)
    
    extracted_path = os.path.join(DATA_DIR, 'SMSSpamCollection')
    if not os.path.exists(extracted_path):
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(DATA_DIR)
    
    return extracted_path

def load_data(file_path):
    print("Loading and preprocessing data...")
    df = pd.read_csv(file_path, sep='\t', header=None, names=['label', 'message'])
    df['label'] = df['label'].map({'ham': 0, 'spam': 1})
    df['cleaned_message'] = df['message'].apply(preprocess_text)
    return df

def train_sklearn_models(X_train, X_test, y_train, y_test, vectorizer):
    print("Training Naive Bayes...")
    nb_model = MultinomialNB()
    nb_model.fit(X_train, y_train)
    nb_pred = nb_model.predict(X_test)
    
    print("Training Logistic Regression...")
    lr_model = LogisticRegression(max_iter=1000)
    lr_model.fit(X_train, y_train)
    lr_pred = lr_model.predict(X_test)
    
    return nb_model, lr_model, nb_pred, lr_pred

def train_keras_model(train_texts, test_texts, y_train, y_test):
    print("Training Neural Network...")
    max_vocab_length = 5000
    max_sequence_length = 50

    text_vectorizer = TextVectorization(
        max_tokens=max_vocab_length,
        output_mode='int',
        output_sequence_length=max_sequence_length
    )
    text_vectorizer.adapt(train_texts)

    model = Sequential([
        text_vectorizer,
        Embedding(input_dim=max_vocab_length, output_dim=64),
        GlobalAveragePooling1D(),
        Dense(64, activation='relu'),
        Dropout(0.5),
        Dense(1, activation='sigmoid')
    ])

    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    
    early_stop = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
    
    X_train_np = train_texts.to_numpy()
    y_train_np = y_train.to_numpy()
    X_test_np = test_texts.to_numpy()
    y_test_np = y_test.to_numpy()
    
    model.fit(
        X_train_np, y_train_np, 
        epochs=10, 
        validation_data=(X_test_np, y_test_np),
        callbacks=[early_stop],
        verbose=1
    )
    
    nn_pred_probs = model.predict(X_test_np)
    nn_pred = (nn_pred_probs > 0.5).astype(int).flatten()
    
    return model, nn_pred

def compute_metrics(y_true, y_pred):
    return {
        "accuracy": float(accuracy_score(y_true, y_pred)),
        "precision": float(precision_score(y_true, y_pred)),
        "recall": float(recall_score(y_true, y_pred)),
        "f1": float(f1_score(y_true, y_pred)),
        "confusion_matrix": confusion_matrix(y_true, y_pred).tolist()
    }

def main():
    os.makedirs(MODELS_DIR, exist_ok=True)
    file_path = download_data()
    df = load_data(file_path)
    
    X = df['cleaned_message']
    y = df['label']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    vectorizer = TfidfVectorizer(max_features=5000)
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)
    
    nb_model, lr_model, nb_pred, lr_pred = train_sklearn_models(X_train_vec, X_test_vec, y_train, y_test, vectorizer)
    
    metrics = {
        "dataset": {
            "total": len(df),
            "spam": int(df['label'].sum()),
            "ham": int(len(df) - df['label'].sum())
        },
        "models": {
            "Naive Bayes": compute_metrics(y_test, nb_pred),
            "Logistic Regression": compute_metrics(y_test, lr_pred)
        }
    }
    
    if TF_AVAILABLE:
        nn_model, nn_pred = train_keras_model(X_train, X_test, y_train, y_test)
        metrics["models"]["Neural Network"] = compute_metrics(y_test, nn_pred)
        nn_model.save(os.path.join(MODELS_DIR, 'nn_model.keras'))
    else:
        print("TensorFlow not available, skipping NN model.")

    print("Saving models and metrics...")
    with open(os.path.join(MODELS_DIR, 'vectorizer.pkl'), 'wb') as f:
        pickle.dump(vectorizer, f)
    with open(os.path.join(MODELS_DIR, 'nb_model.pkl'), 'wb') as f:
        pickle.dump(nb_model, f)
    with open(os.path.join(MODELS_DIR, 'lr_model.pkl'), 'wb') as f:
        pickle.dump(lr_model, f)
        
    with open(os.path.join(MODELS_DIR, 'metrics.json'), 'w') as f:
        json.dump(metrics, f, indent=4)
        
    print("Training complete!")

if __name__ == "__main__":
    main()
