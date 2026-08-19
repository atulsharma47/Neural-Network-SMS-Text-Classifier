import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download required NLTK data if not present
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)
try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt_tab', quiet=True)
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

try:
    stop_words = set(stopwords.words('english'))
except Exception:
    stop_words = set()

def clean_text_step_by_step(text: str) -> dict:
    original = text
    
    # 1. lowercasing
    lowercased = text.lower()
    
    # 2. remove punctuation and tokenize
    no_punct = lowercased.translate(str.maketrans('', '', string.punctuation))
    tokens = word_tokenize(no_punct)
    
    # 3. rm stopwords
    filtered_tokens = [w for w in tokens if w not in stop_words]
    
    # 4. output string
    cleaned_text = ' '.join(filtered_tokens)
    
    return {
        "original": original,
        "lowercased": lowercased,
        "tokenized": tokens,
        "stopwords_removed": filtered_tokens,
        "cleaned_text": cleaned_text
    }

def preprocess_text(text: str) -> str:
    # returns just the string for the model
    return clean_text_step_by_step(text)["cleaned_text"]
