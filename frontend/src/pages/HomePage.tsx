import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { userService, categoryService, promptService } from '../services/api';
import { Category, SubCategory } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<number | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleUserRegistration = async () => {
    if (!userName || !userPhone) {
      alert(t.home.register.fillAll);
      return;
    }

    try {
      const result = await userService.loginOrRegister({ name: userName, phone: userPhone });
      setCurrentUser(result.user.id);
      alert(result.message);
    } catch (error) {
      console.error('Error with user login/registration:', error);
      alert(t.home.register.error);
    }
  };

  const handleSubmitPrompt = async () => {
    if (!currentUser || !selectedCategory || !selectedSubCategory || !prompt) {
      alert(t.home.prompt.completeFields);
      return;
    }

    setIsLoading(true);
    try {
      const response = await promptService.createPrompt({
        userId: currentUser,
        categoryId: selectedCategory.id,
        subCategoryId: selectedSubCategory.id,
        prompt,
      });

      alert(t.home.prompt.success);
      navigate(`/dashboard/${currentUser}`);
    } catch (error) {
      console.error('Error creating prompt:', error);
      alert(t.home.prompt.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 slide-in">
        <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-2xl">{t.home.title}</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          {language === 'he' ? 'פלטפורמת למידה מתקדמת עם בינה מלאכותית לחוויה למידה מותאמת אישית' : 'Advanced learning platform with AI for personalized educational experience'}
        </p>
      </div>

      {!currentUser ? (
        <div className="modern-card p-8 rounded-2xl mb-8 fade-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.home.register.title}</h3>
            <p className="text-gray-600">{language === 'he' ? 'הצטרפו למסע הלמידה שלכם' : 'Join your learning journey'}</p>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t.home.register.name}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-4 pr-12 modern-input rounded-xl border-0 focus:ring-0 text-lg"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-gray-400">👤</span>
              </div>
            </div>
            <div className="relative">
              <input
                type="tel"
                placeholder={t.home.register.phone}
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full p-4 pr-12 modern-input rounded-xl border-0 focus:ring-0 text-lg"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <span className="text-gray-400">📱</span>
              </div>
            </div>
            <button
              onClick={handleUserRegistration}
              className="w-full btn-primary text-white p-4 rounded-xl font-semibold text-lg border-0"
            >
              {t.home.register.button}
            </button>
          </div>
        </div>
      ) : (
        <div className="modern-card p-8 rounded-2xl fade-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.home.prompt.title}</h3>
            <p className="text-gray-600">{language === 'he' ? 'בחרו נושא ושאלו את השאלה שלכם' : 'Choose a topic and ask your question'}</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">{t.home.prompt.category}</label>
              <select
                value={selectedCategory?.id || ''}
                onChange={(e) => {
                  const category = categories.find(c => c.id === parseInt(e.target.value));
                  setSelectedCategory(category || null);
                  setSelectedSubCategory(null);
                }}
                className="w-full p-4 modern-input rounded-xl border-0 focus:ring-0 text-lg"
              >
                <option value="">{t.home.prompt.chooseCat}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div className="slide-in">
                <label className="block text-lg font-semibold mb-3 text-gray-700">{t.home.prompt.subCategory}</label>
                <select
                  value={selectedSubCategory?.id || ''}
                  onChange={(e) => {
                    const subCategory = selectedCategory.subCategories.find(sc => sc.id === parseInt(e.target.value));
                    setSelectedSubCategory(subCategory || null);
                  }}
                  className="w-full p-4 modern-input rounded-xl border-0 focus:ring-0 text-lg"
                >
                  <option value="">{t.home.prompt.chooseSubCat}</option>
                  {selectedCategory.subCategories.map(subCategory => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">{t.home.prompt.promptLabel}</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.home.prompt.promptPlaceholder}
                rows={4}
                className="w-full p-4 modern-input rounded-xl border-0 focus:ring-0 text-lg resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSubmitPrompt}
                disabled={isLoading}
                className="flex-1 btn-secondary text-white p-4 rounded-xl font-semibold text-lg border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="loading-pulse mr-2">⏳</span>
                    {t.home.prompt.generating}
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">✨</span>
                    {t.home.prompt.generate}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => navigate(`/dashboard/${currentUser}`)}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white p-4 rounded-xl font-semibold text-lg border-0 hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">📈</span>
                {t.home.prompt.viewHistory}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;