
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/api';
import Card from '../components/Card';
import Button from '../components/Button';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleUsers, setVisibleUsers] = useState(8);

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedUsers = filteredUsers.slice(0, visibleUsers);

  const loadMore = () => {
    setVisibleUsers(prev => prev + 8);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">User Directory</h1>
          <div className="text-gray-600 dark:text-gray-400">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">User Directory</h1>
          <div className="text-red-600 dark:text-red-400">Error loading users: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Directory</h1>
        <p className="text-gray-600 dark:text-gray-300">Discover and connect with users from around the world</p>
      </div>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedUsers.map((user) => (
          <Card key={user.id} className="p-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {user.name}
                </h3>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                ✉️ {user.email}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                📍 {user.address.city}, {user.address.zipcode}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                🏢 {user.company.name}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredUsers.length > visibleUsers && (
        <div className="text-center">
          <Button onClick={loadMore} variant="secondary">
            Load More Users
          </Button>
        </div>
      )}

      {filteredUsers.length === 0 && searchTerm && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          No users found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default Users;
