import React, { useState, useReducer, useCallback } from 'react';
import { 
  Brain, 
  CheckSquare, 
  Clock, 
  Target, 
  Filter, 
  ArrowDownUp, 
  MoreHorizontal,
  X,
  Plus,
  Calendar,
  Tag,
  List,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Task Reducer for Complex State Management
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, {
        ...action.payload,
        id: Date.now(),
        aiConfidence: Math.floor(Math.random() * 30) + 70,
        origin: 'Manual',
        createdAt: new Date().toISOString(),
        subtasks: action.payload.subtasks.map((title, index) => ({
          id: `subtask-${Date.now()}-${index}`,
          title,
          completed: false
        }))
      }];
    
    case 'UPDATE_TASK':
      return state.map(task => 
        task.id === action.payload.id 
          ? { ...task, ...action.payload.updates } 
          : task
      );
    
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    
    case 'TOGGLE_SUBTASK':
      return state.map(task => {
        if (task.id === action.payload.taskId) {
          const updatedSubtasks = task.subtasks.map(subtask => 
            subtask.id === action.payload.subtaskId 
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          );
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      });
    
    default:
      return state;
  }
};

const TaskManagementDashboard = () => {
  const [tasks, dispatchTasks] = useReducer(taskReducer, [
    {
      id: 1,
      title: "Quarterly Sales Report",
      priority: "High",
      status: "In Progress",
      aiConfidence: 95,
      origin: "Email",
      category: "Business",
      dueDate: "2024-02-15",
      createdAt: new Date().toISOString(),
      subtasks: [
        { id: 'subtask-1', title: "Compile Q4 revenue data", completed: true },
        { id: 'subtask-2', title: "Create visualization", completed: false },
        { id: 'subtask-3', title: "Write executive summary", completed: false }
      ]
    }
  ]);

  const [filters, setFilters] = useState({
    priority: null,
    status: null,
    category: null
  });

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const initialTaskState = {
    title: '',
    priority: 'Medium',
    status: 'Not Started',
    category: '',
    dueDate: '',
    subtasks: []
  };

  const [newTask, setNewTask] = useState(initialTaskState);
  const [newSubtask, setNewSubtask] = useState('');

  const addSubtask = useCallback(() => {
    if (newSubtask.trim()) {
      setNewTask(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, newSubtask.trim()]
      }));
      setNewSubtask('');
    }
  }, [newSubtask]);

  const submitTask = useCallback(() => {
    if (!newTask.title) return;

    dispatchTasks({ 
      type: 'ADD_TASK', 
      payload: newTask 
    });

    setNewTask(initialTaskState);
    setIsAddTaskModalOpen(false);
  }, [newTask]);

  const filteredTasks = tasks.filter(task => 
    (!filters.priority || task.priority === filters.priority) &&
    (!filters.status || task.status === filters.status) &&
    (!filters.category || task.category === filters.category)
  );

  const categories = [...new Set(tasks.map(task => task.category).filter(Boolean))];

  const toggleSubtaskCompletion = useCallback((taskId, subtaskId) => {
    dispatchTasks({
      type: 'TOGGLE_SUBTASK',
      payload: { taskId, subtaskId }
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Filter */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setFilters(prev => ({
                      ...prev, 
                      category: prev.category === category ? null : category
                    }))}
                    className={`px-3 py-1 rounded-full text-sm 
                      ${filters.category === category 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-400'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Priorities</h3>
              <div className="flex flex-wrap gap-2">
                {['High', 'Medium', 'Low'].map(priority => (
                  <button
                    key={priority}
                    onClick={() => setFilters(prev => ({
                      ...prev, 
                      priority: prev.priority === priority ? null : priority
                    }))}
                    className={`px-3 py-1 rounded-full text-sm 
                      ${filters.priority === priority 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-400'}`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Tasks</h1>
              <button 
                onClick={() => setIsAddTaskModalOpen(true)}
                className="bg-blue-600 px-4 py-2 rounded-xl text-white flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" /> New Task
              </button>
            </div>

            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                className="bg-gray-900 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{task.title}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs 
                      ${task.priority === 'High' ? 'bg-red-600/20 text-red-400' : 
                        task.priority === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' : 
                        'bg-green-600/20 text-green-400'}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {task.subtasks.map(subtask => (
                    <div 
                      key={subtask.id} 
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => toggleSubtaskCompletion(task.id, subtask.id)}
                        className="form-checkbox rounded text-blue-600"
                      />
                      <span className={subtask.completed ? 'line-through text-gray-500' : ''}>
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between text-sm text-gray-400">
                  <span>Due: {task.dueDate}</span>
                  <span>Category: {task.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Task Modal */}
        <AnimatePresence>
          {isAddTaskModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl"
              >
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({
                      ...prev, 
                      title: e.target.value
                    }))}
                    placeholder="Task Title"
                    className="w-full bg-gray-800 rounded-xl p-3 border border-white/10"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({
                        ...prev, 
                        priority: e.target.value
                      }))}
                      className="w-full bg-gray-800 rounded-xl p-3"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>

                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({
                        ...prev, 
                        dueDate: e.target.value
                      }))}
                      className="w-full bg-gray-800 rounded-xl p-3"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTask.category}
                      onChange={(e) => setNewTask(prev => ({
                        ...prev, 
                        category: e.target.value
                      }))}
                      placeholder="Category"
                      className="flex-1 bg-gray-800 rounded-xl p-3"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSubtask}
                      onChange={(e) => setNewSubtask(e.target.value)}
                      placeholder="Add Subtask"
                      className="flex-1 bg-gray-800 rounded-xl p-3"
                      onKeyPress={(e) => e.key === 'Enter' && addSubtask()}
                    />
                    <button 
                      onClick={addSubtask}
                      className="bg-blue-600 p-3 rounded-xl"
                    >
                      <Plus className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {newTask.subtasks.map((subtask, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between bg-gray-800 p-2 rounded-xl"
                    >
                      {subtask}
                      <button 
                        onClick={() => setNewTask(prev => ({
                          ...prev,
                          subtasks: prev.subtasks.filter((_, i) => i !== index)
                        }))}
                        className="text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <div className="flex space-x-4">
                    <button 
                      onClick={submitTask}
                      className="flex-1 bg-blue-600 text-white p-3 rounded-xl"
                    >
                      Create Task
                    </button>
                    <button 
                      onClick={() => setIsAddTaskModalOpen(false)}
                      className="flex-1 bg-gray-800 text-white p-3 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskManagementDashboard;