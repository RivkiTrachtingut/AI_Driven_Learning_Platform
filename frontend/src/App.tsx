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
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">{t.nav.title}</h1>
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:text-blue-200">{t.nav.home}</Link>
              <Link to="/admin" className="hover:text-blue-200">{t.nav.admin}</Link>
              <LanguageToggle />
            </div>
          </div>
        </nav>

        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/dashboard/:userId" element={<UserDashboard />} />
          </Routes>
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