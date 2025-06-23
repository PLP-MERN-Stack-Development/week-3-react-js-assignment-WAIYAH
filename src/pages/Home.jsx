
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
  const features = [
    {
      title: 'Task Management',
      description: 'Create, organize, and track your personal tasks with ease. Mark as complete, filter by status, and never lose track of your progress.',
      icon: '✅',
      link: '/tasks'
    },
    {
      title: 'User Exploration',
      description: 'Discover and connect with users from around the world. Search by name or email and explore detailed user profiles.',
      icon: '👥',
      link: '/users'
    },
    {
      title: 'Dark Mode',
      description: 'Switch between light and dark themes for a comfortable viewing experience that adapts to your preferences.',
      icon: '🌙',
      link: null
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Welcome to{' '}
            <span className="text-blue-600 dark:text-blue-400">Taskify Pro</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your ultimate productivity companion for managing tasks and exploring connections
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/tasks">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started with Tasks
            </Button>
          </Link>
          <Link to="/users">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Users
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center space-y-4">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {feature.description}
            </p>
            {feature.link && (
              <div className="pt-4">
                <Link to={feature.link}>
                  <Button variant="ghost" size="sm">
                    Learn More →
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">∞</div>
            <div className="text-gray-600 dark:text-gray-300 mt-2">Unlimited Tasks</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">⚡</div>
            <div className="text-gray-600 dark:text-gray-300 mt-2">Lightning Fast</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">🔒</div>
            <div className="text-gray-600 dark:text-gray-300 mt-2">Secure & Private</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
