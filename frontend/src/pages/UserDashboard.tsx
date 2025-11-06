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
    return <div className="text-center">{t.dashboard.loading}</div>;
  }

  if (!user) {
    return <div className="text-center">{t.common.userNotFound}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">{t.dashboard.welcome.replace('{name}', user.name)}</h2>
        <p className="text-gray-600">{t.dashboard.phone.replace('{phone}', user.phone)}</p>
        <Link
          to="/"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {t.dashboard.createNew}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4">{t.dashboard.history}</h3>
        
        {!user.prompts || user.prompts.length === 0 ? (
          <p className="text-gray-500">{t.dashboard.noLessons}</p>
        ) : (
          <div className="space-y-6">
            {user.prompts.map((prompt: Prompt) => (
              <div key={prompt.id} className="border border-gray-200 rounded-lg p-4">
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2">
                    {prompt.category?.name}
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                    {prompt.subCategory?.name}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">
                    {new Date(prompt.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2">{t.dashboard.question}</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">{prompt.prompt}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t.dashboard.response}</h4>
                  <div className="text-gray-700 bg-blue-50 p-3 rounded whitespace-pre-wrap">
                    {prompt.response}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;