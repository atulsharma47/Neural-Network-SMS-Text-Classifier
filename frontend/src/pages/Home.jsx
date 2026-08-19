import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Powered by Neural Networks</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Intelligent SMS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Spam Detection
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
          An end-to-end NLP and machine learning platform for real-time SMS spam detection, 
          batch message analysis, model evaluation, and interactive data visualization.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
        <Link 
          to="/analyzer" 
          className="group flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20"
        >
          <span>Analyze Message</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          to="/dashboard" 
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-8 py-4 rounded-xl font-semibold transition-all border border-gray-700"
        >
          <span>View Analytics</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-16 border-t border-gray-800 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 text-left">
          <Zap className="w-8 h-8 text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Real-time Inference</h3>
          <p className="text-gray-400">Classify messages instantly with high confidence using our optimized models.</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 text-left">
          <Database className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Batch Processing</h3>
          <p className="text-gray-400">Upload CSV files containing thousands of messages for bulk analysis.</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 text-left">
          <ShieldCheck className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">98%+ Accuracy</h3>
          <p className="text-gray-400">Trained on the UCI SMS Spam dataset with comprehensive preprocessing.</p>
        </div>
      </div>
    </div>
  );
}
