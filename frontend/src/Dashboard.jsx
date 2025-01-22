import React, { useState } from "react";

const TaskManagementDashboard = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState([]);

  const addTask = () => {
    if (taskName && taskDescription) {
      setTasks([
        ...tasks,
        { name: taskName, description: taskDescription, status: "Pending" },
      ]);
      setTaskName("");
      setTaskDescription("");
    }
  };

  const updateTaskStatus = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const removedTask = tasks[index];
    setHistory([...history, removedTask]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const undoLastAction = () => {
    if (history.length > 0) {
      const lastTask = history.pop();
      setTasks([...tasks, lastTask]);
      setHistory([...history]); // Update history after popping
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Task Management Dashboard
          </h1>
          <p className="text-gray-400">
            Organize and track your tasks efficiently.
          </p>
        </div>

        {/* Task Input */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition text-white"
          >
            Add Task
          </button>
        </div>

        {/* Tasks List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Current Tasks</h2>
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-md flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold">{task.name}</h3>
                    <p className="text-gray-400">{task.description}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(index, e.target.value)}
                      className="bg-gray-700 px-3 py-1 rounded-md text-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button
                      onClick={() => removeTask(index)}
                      className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No tasks available. Add some!</p>
            )}
          </div>
        </div>

        {/* Undo Action */}
        <div className="mt-8">
          <button
            onClick={undoLastAction}
            className="px-4 py-2 bg-purple-500 rounded-md hover:bg-purple-600 transition text-white"
            disabled={history.length === 0}
          >
            Undo Last Action
          </button>
        </div>

        {/* Task History (Optional) */}
        {/* <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Task History</h2>
          <div className="space-y-4">
            {history.length > 0 ? (
              history.map((task, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-md">
                  <h3 className="font-bold">{task.name}</h3>
                  <p className="text-gray-400">{task.description}</p>
                  <p className="text-gray-400">Status: {task.status}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No task history available.</p>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TaskManagementDashboard;