import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
        className="flex items-center space-x-2 px-3 py-1 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
      >
        <span className="text-sm font-medium">
          {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;