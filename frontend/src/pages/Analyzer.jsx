import { useState } from "react";
import axios from "axios";
import { Send, AlertTriangle, ShieldCheck, FileText, ArrowRight } from "lucide-react";

export default function Analyzer() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [selectedModel, setSelectedModel] = useState("Neural Network");

  const analyzeMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/v1/predict", {
        message,
        model: selectedModel
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Error connecting to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <FileText className="text-blue-400" />
          <span>Real-time Analyzer</span>
        </h2>
        
        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter SMS message here (e.g. 'Congratulations! You won a FREE iPhone!')"
            className="w-full bg-gray-900/80 border border-gray-700 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-100"
          />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full sm:w-auto bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Neural Network">Neural Network (Keras)</option>
              <option value="Logistic Regression">Logistic Regression</option>
              <option value="Naive Bayes">Naive Bayes</option>
            </select>

            <button
              onClick={analyzeMessage}
              disabled={loading || !message.trim()}
              className="w-full sm:w-auto flex justify-center items-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <span>{loading ? "Analyzing..." : "Analyze Message"}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
          {error && <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 space-y-6 shadow-xl h-fit">
            <h3 className="text-xl font-bold border-b border-gray-700 pb-2">Prediction Results</h3>
            
            <div className="flex items-center space-x-4">
              {result.prediction === "SPAM" ? (
                <div className="bg-red-500/10 text-red-400 p-4 rounded-xl flex items-center space-x-3 w-full border border-red-500/20">
                  <AlertTriangle className="w-8 h-8" />
                  <div>
                    <div className="font-bold text-xl">SPAM</div>
                    <div className="text-sm opacity-80">Detected by {result.model_used}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-green-500/10 text-green-400 p-4 rounded-xl flex items-center space-x-3 w-full border border-green-500/20">
                  <ShieldCheck className="w-8 h-8" />
                  <div>
                    <div className="font-bold text-xl">HAM</div>
                    <div className="text-sm opacity-80">Safe message</div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-1">Confidence Score</div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-900 rounded-full h-3 overflow-hidden border border-gray-700">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${result.prediction === 'SPAM' ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-green-600 to-green-400'}`}
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
                <span className="font-bold w-12 text-right">{result.confidence}%</span>
              </div>
            </div>

            {result.prediction === "SPAM" && result.detected_indicators?.length > 0 && (
              <div>
                <div className="text-sm text-gray-400 mb-2">Detected Indicators (Explainability)</div>
                <div className="flex flex-wrap gap-2">
                  {result.detected_indicators.map((word, i) => (
                    <span key={i} className="bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-1 rounded text-sm font-mono">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4">NLP Preprocessing Pipeline</h3>
            <div className="space-y-3">
              <PipelineStep title="Input" content={result.pipeline.original} />
              <ArrowRight className="w-4 h-4 mx-auto text-gray-600" />
              <PipelineStep title="Lowercasing & Punctuation Removal" content={result.pipeline.lowercased} />
              <ArrowRight className="w-4 h-4 mx-auto text-gray-600" />
              <PipelineStep title="Tokenization" content={JSON.stringify(result.pipeline.tokenized)} isMono />
              <ArrowRight className="w-4 h-4 mx-auto text-gray-600" />
              <PipelineStep title="Stopword Removal" content={JSON.stringify(result.pipeline.stopwords_removed)} isMono />
              <ArrowRight className="w-4 h-4 mx-auto text-gray-600" />
              <PipelineStep title="Cleaned String" content={result.pipeline.cleaned_text} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PipelineStep({ title, content, isMono }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-inner">
      <div className="text-xs text-blue-400 font-bold mb-1 uppercase tracking-wider">{title}</div>
      <div className={`text-sm text-gray-300 break-words ${isMono ? 'font-mono text-xs opacity-80' : ''}`}>
        {content || "—"}
      </div>
    </div>
  );
}
