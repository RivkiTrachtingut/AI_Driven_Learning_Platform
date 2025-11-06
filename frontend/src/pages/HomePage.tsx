import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { userService, categoryService, promptService } from '../services/api';
import { Category, SubCategory } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
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
      const user = await userService.createUser({ name: userName, phone: userPhone });
      setCurrentUser(user.id);
      alert(t.home.register.success);
    } catch (error) {
      console.error('Error registering user:', error);
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
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">{t.home.title}</h2>

      {!currentUser ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">{t.home.register.title}</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder={t.home.register.name}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              placeholder={t.home.register.phone}
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleUserRegistration}
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
            >
              {t.home.register.button}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">{t.home.prompt.title}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.home.prompt.category}</label>
              <select
                value={selectedCategory?.id || ''}
                onChange={(e) => {
                  const category = categories.find(c => c.id === parseInt(e.target.value));
                  setSelectedCategory(category || null);
                  setSelectedSubCategory(null);
                }}
                className="w-full p-3 border border-gray-300 rounded-md"
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
              <div>
                <label className="block text-sm font-medium mb-2">{t.home.prompt.subCategory}</label>
                <select
                  value={selectedSubCategory?.id || ''}
                  onChange={(e) => {
                    const subCategory = selectedCategory.subCategories.find(sc => sc.id === parseInt(e.target.value));
                    setSelectedSubCategory(subCategory || null);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-md"
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
              <label className="block text-sm font-medium mb-2">{t.home.prompt.promptLabel}</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.home.prompt.promptPlaceholder}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <button
              onClick={handleSubmitPrompt}
              disabled={isLoading}
              className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {isLoading ? t.home.prompt.generating : t.home.prompt.generate}
            </button>

            <button
              onClick={() => navigate(`/dashboard/${currentUser}`)}
              className="w-full bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700"
            >
              {t.home.prompt.viewHistory}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;