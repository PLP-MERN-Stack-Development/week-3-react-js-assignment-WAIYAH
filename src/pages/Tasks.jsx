
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';

const Tasks = () => {
  const [tasks, setTasks] = useLocalStorage('taskify-tasks', [
    { id: 1, name: 'Welcome to Taskify Pro!', description: 'This is your first task. Mark it as complete when you\'re ready.', completed: false, createdAt: new Date().toISOString() },
    { id: 2, name: 'Try the dark mode toggle', description: 'Click the moon/sun icon in the navigation to switch themes.', completed: false, createdAt: new Date().toISOString() },
    { id: 3, name: 'Explore the Users page', description: 'Check out the user directory to see how API integration works.', completed: false, createdAt: new Date().toISOString() }
  ]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const addTask = () => {
    if (!newTaskName.trim()) return;
    
    const newTask = {
      id: Date.now(),
      name: newTaskName.trim(),
      description: newTaskDescription.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskName('');
    setNewTaskDescription('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Stay organized and boost your productivity
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <span className="text-blue-600 dark:text-blue-400">
            {activeCount} active
          </span>
          <span className="text-green-600 dark:text-green-400">
            {completedCount} completed
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {tasks.length} total
          </span>
        </div>
      </div>

      {/* Add Task Form */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <textarea
            placeholder="Task description (optional)"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <Button onClick={addTask} disabled={!newTaskName.trim()}>
            Add Task
          </Button>
        </div>
      </Card>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-2">
        {['all', 'active', 'completed'].map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter(filterType)}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </Button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-600 dark:text-gray-400">
              {filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks.`}
            </div>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="p-6">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  {task.completed && '✓'}
                </button>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-medium ${
                    task.completed 
                      ? 'line-through text-gray-500 dark:text-gray-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {task.name}
                  </h3>
                  {task.description && (
                    <p className={`mt-1 text-sm ${
                      task.completed 
                        ? 'line-through text-gray-400 dark:text-gray-500' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {task.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Created {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
