import { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build Todo App', completed: false },
        { id: 3, text: 'Write Tests', completed: false },
    ]);

    const addTodo = (text) => {
        const newTodo = {
            id: todos.length + 1,
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
            <AddTodoForm addTodo={addTodo} />
            <ul data-testid="todo-list">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`flex justify-between items-center p-2 border-b ${todo.completed ? 'line-through text-gray-500' : ''
                            }`}
                    >
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            className="cursor-pointer"
                            data-testid={`todo-item-${todo.id}`}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-500 hover:text-red-700"
                            data-testid={`delete-button-${todo.id}`}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;