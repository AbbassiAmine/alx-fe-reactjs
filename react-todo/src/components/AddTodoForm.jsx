import { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo"
                className="border rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="todo-input"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                data-testid="add-todo-button"
            >
                Add
            </button>
        </form>
    );
};

export default AddTodoForm;