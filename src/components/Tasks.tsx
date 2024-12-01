import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Task {
    id: number;
    title: string;
    dueDate: string;
    completed: boolean;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        // Load tasks from localStorage on initial render
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [taskTitle, setTaskTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [editMode, setEditMode] = useState<{ id: number | null; title: string; dueDate: string }>({ id: null, title: '', dueDate: '' });
    const [showModal, setShowModal] = useState(false);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (taskTitle.trim() === '') return;

        const newTask: Task = {
            id: Date.now(), // Simple unique ID
            title: taskTitle,
            dueDate,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        resetForm();
    };

    const handleEditTask = (id: number) => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setEditMode({ id, title: taskToEdit.title, dueDate: taskToEdit.dueDate });
            setTaskTitle(taskToEdit.title);
            setDueDate(taskToEdit.dueDate);
            setShowModal(true);
        }
    };

    const handleUpdateTask = () => {
        if (editMode.id === null) return;

        const updatedTasks = tasks.map(task =>
            task.id === editMode.id ? { ...task, title: taskTitle, dueDate } : task
        );

        setTasks(updatedTasks);
        resetForm();
    };

    const handleRemoveTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleCompletion = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const resetForm = () => {
        setTaskTitle('');
        setDueDate('');
        setEditMode({ id: null, title: '', dueDate: '' });
        setShowModal(false);
    };

    // Handle key press for adding a task
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className="p-4 m-4">
            <h1 className="text-2xl font-semibold mb-4">Your Tasks</h1>

            {/* Task Form */}
            <div className="mb-4 flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    onKeyPress={handleKeyPress} // Add key press handler
                    className="border rounded p-2 w-full"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border rounded p-2 w-40"
                />
                <button onClick={handleAddTask} className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded">
                    <PlusIcon className="h-6 w-6" />
                </button>
            </div>

            {/* Task List */}
            <ul className="list-disc pl-5">
                {tasks.map((task) => (
                    <li key={task.id} className={`flex justify-between items-center mb-2 p-2 border rounded ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleCompletion(task.id)}
                                className="mr-2"
                            />
                            <span className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                            </span>
                            <span className="text-sm text-gray-600 ml-2">{task.dueDate}</span>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => handleEditTask(task.id)} className="text-yellow-500 mr-2">
                                <PencilIcon className="h-6 w-6" />
                            </button>
                            <button onClick={() => handleRemoveTask(task.id)} className="text-red-500">
                                <TrashIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Edit Task Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="border rounded p-2 w-full mb-4"
                        />
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="border rounded p-2 w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button onClick={handleUpdateTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Update
                            </button>
                            <button onClick={resetForm} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;