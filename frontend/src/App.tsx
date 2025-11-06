import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserDashboard from './pages/UserDashboard';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Router>
      <div className="min-h-screen gradient-bg luxury-pattern">
        <nav className="glass-effect backdrop-blur-lg border-b border-white/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🧠</span>
                </div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">{t.nav.title}</h1>
              </div>
              <div className="flex items-center space-x-6">
                <Link 
                  to="/" 
                  className="text-white/90 hover:text-white transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  {t.nav.home}
                </Link>
                <Link 
                  to="/admin" 
                  className="text-white/90 hover:text-white transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  {t.nav.admin}
                </Link>
                <LanguageToggle />
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto py-12 px-6">
          <div className="fade-in">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/dashboard/:userId" element={<UserDashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;