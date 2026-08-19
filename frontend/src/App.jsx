import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ShieldCheck, Activity, BarChart2 } from "lucide-react";
import Home from "./pages/Home";
import Analyzer from "./pages/Analyzer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-blue-500/30">
        <nav className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight hover:text-blue-400 transition-colors">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              <span>SpamShield<span className="text-blue-500">.ai</span></span>
            </Link>
            <div className="flex space-x-6 text-sm font-medium text-gray-400">
              <Link to="/analyzer" className="hover:text-white transition-colors flex items-center space-x-1">
                <Activity className="w-4 h-4" />
                <span>Analyzer</span>
              </Link>
              <Link to="/dashboard" className="hover:text-white transition-colors flex items-center space-x-1">
                <BarChart2 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </nav>
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
