import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { Database, PieChart } from "lucide-react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/analytics");
        setMetrics(res.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Could not load metrics. Ensure backend models are trained.");
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading Analytics...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="bg-red-500/10 text-red-400 p-6 rounded-xl border border-red-500/20 inline-block">
          {error}
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const { dataset, models } = metrics;
  
  const performanceData = Object.keys(models).map(key => ({
    name: key.replace(" ", "\n"),
    accuracy: Math.round(models[key].accuracy * 100),
    f1: Math.round(models[key].f1 * 100)
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <Database className="w-8 h-8 text-blue-400 mb-2" />
          <div className="text-3xl font-bold text-gray-100">{dataset.total.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Messages</div>
        </div>
        <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="text-3xl font-bold text-green-400">{dataset.ham.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Ham (Legitimate)</div>
        </div>
        <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="text-3xl font-bold text-red-400">{dataset.spam.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Spam Detected</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
            <BarChart className="w-5 h-5 text-indigo-400" />
            <span>Model Performance Comparison</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} domain={[90, 100]} />
                <RechartsTooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                  contentStyle={{backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff'}}
                />
                <Bar dataKey="accuracy" name="Accuracy (%)" radius={[4, 4, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#3B82F6' : '#6366F1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Neural Network Confusion Matrix */}
        <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Neural Network Matrix</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-400 mb-4">
              Detailed breakdown of predictions for the Keras TextVectorization model on the test split.
            </p>
            <div className="grid grid-cols-3 gap-2 text-sm text-center">
              <div className="p-3"></div>
              <div className="p-3 bg-gray-900 rounded font-semibold text-gray-300">Pred: Ham</div>
              <div className="p-3 bg-gray-900 rounded font-semibold text-gray-300">Pred: Spam</div>
              
              <div className="p-3 bg-gray-900 rounded font-semibold text-gray-300 flex items-center justify-center">Actual Ham</div>
              <div className="p-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded font-bold text-lg">
                {models["Neural Network"].confusion_matrix[0][0]}
              </div>
              <div className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded font-bold">
                {models["Neural Network"].confusion_matrix[0][1]}
              </div>

              <div className="p-3 bg-gray-900 rounded font-semibold text-gray-300 flex items-center justify-center">Actual Spam</div>
              <div className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded font-bold">
                {models["Neural Network"].confusion_matrix[1][0]}
              </div>
              <div className="p-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded font-bold text-lg">
                {models["Neural Network"].confusion_matrix[1][1]}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700 mt-4 text-center">
              <div>
                <div className="text-xs text-gray-500">Accuracy</div>
                <div className="font-bold text-blue-400">{(models["Neural Network"].accuracy * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Precision</div>
                <div className="font-bold text-blue-400">{(models["Neural Network"].precision * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Recall</div>
                <div className="font-bold text-blue-400">{(models["Neural Network"].recall * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
