import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { userService, promptService } from '../services/api';
import { User, Prompt } from '../types';

const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'prompts'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const loadData = async () => {
    try {
      const [usersData, promptsData] = await Promise.all([
        userService.getAllUsers(),
        promptService.getAllPrompts(),
      ]);
      setUsers(usersData);
      setAllPrompts(promptsData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">{t.admin.loading}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{t.admin.title}</h2>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.admin.users.replace('{count}', users.length.toString())}
            </button>
            <button
              onClick={() => setActiveTab('prompts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'prompts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.admin.prompts.replace('{count}', allPrompts.length.toString())}
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder={t.admin.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.admin.userCol}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.admin.phoneCol}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.admin.promptsCountCol}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.admin.lastActivityCol}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 && searchTerm ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    {t.admin.noResults}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">ID: {user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.prompts?.length || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.prompts && user.prompts.length > 0
                      ? new Date(user.prompts[0].createdAt).toLocaleDateString()
                      : t.admin.noActivity}
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'prompts' && (
        <div className="space-y-4">
          {allPrompts.map((prompt) => (
            <div key={prompt.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {prompt.user?.name} - {prompt.category?.name} / {prompt.subCategory?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(prompt.createdAt).toLocaleString()} | Phone: {prompt.user?.phone}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">{t.admin.question}</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{prompt.prompt}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">{t.admin.response}</h4>
                <div className="text-gray-700 bg-blue-50 p-3 rounded whitespace-pre-wrap text-sm">
                  {prompt.response.length > 300 
                    ? `${prompt.response.substring(0, 300)}...` 
                    : prompt.response}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;