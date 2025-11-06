import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
      >
        <span className="text-sm font-medium text-white">
          {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;