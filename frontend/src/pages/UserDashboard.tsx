import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { userService } from '../services/api';
import { User, Prompt } from '../types';

const UserDashboard: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadUser(parseInt(userId));
    }
  }, [userId]);

  const loadUser = async (id: number) => {
    try {
      const userData = await userService.getUserById(id);
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="modern-card p-8 rounded-2xl text-center">
          <div className="loading-pulse text-4xl mb-4">📚</div>
          <p className="text-xl text-gray-700">{t.dashboard.loading}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="modern-card p-8 rounded-2xl text-center">
          <div className="text-4xl mb-4">😕</div>
          <p className="text-xl text-gray-700">{t.common.userNotFound}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="modern-card p-8 rounded-2xl mb-8 fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍🎓</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">{t.dashboard.welcome.replace('{name}', user.name)}</h2>
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">📱</span>
                {t.dashboard.phone.replace('{phone}', user.phone)}
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="btn-primary text-white px-6 py-3 rounded-xl font-semibold border-0 flex items-center space-x-2"
          >
            <span>✨</span>
            <span>{t.dashboard.createNew}</span>
          </Link>
        </div>
      </div>

      <div className="modern-card rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📈</span>
            <h3 className="text-2xl font-bold">{t.dashboard.history}</h3>
          </div>
        </div>
        <div className="p-6">
        
          {!user.prompts || user.prompts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-xl text-gray-500">{t.dashboard.noLessons}</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {user.prompts.map((prompt: Prompt, index: number) => (
                <div key={prompt.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-3 py-1 rounded-full">
                      <span className="mr-1">📚</span>
                      {prompt.category?.name}
                    </span>
                    <span className="inline-flex items-center bg-gradient-to-r from-green-500 to-teal-600 text-white text-sm px-3 py-1 rounded-full">
                      <span className="mr-1">🎯</span>
                      {prompt.subCategory?.name}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <span className="mr-1">📅</span>
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                      <span className="mr-2">❓</span>
                      {t.dashboard.question}
                    </h4>
                    <p className="text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-l-4 border-blue-400">{prompt.prompt}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                      <span className="mr-2">🧠</span>
                      {t.dashboard.response}
                    </h4>
                    <div className="text-gray-700 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border-l-4 border-green-400 whitespace-pre-wrap">
                      {prompt.response}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;