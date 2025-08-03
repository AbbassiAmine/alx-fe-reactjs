import { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
    const addRecipe = useRecipeStore((state) => state.addRecipe);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [prepTime, setPrepTime] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title.trim() && description.trim()) {
            const newRecipe = {
                id: Date.now(),
                title,
                description,
                ingredients: ingredients ? ingredients.split(',').map((item) => item.trim()) : [],
                prepTime: prepTime ? parseInt(prepTime) : null,
            };
            addRecipe(newRecipe);
            setTitle('');
            setDescription('');
            setIngredients('');
            setPrepTime('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-recipe-form">
            <h2>Add a New Recipe</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Recipe Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Recipe Description"
                required
            />
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Ingredients (comma-separated)"
            />
            <input
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder="Preparation Time (minutes)"
                min="0"
            />
            <button type="submit">Add Recipe</button>
        </form>
    );
};

export default AddRecipeForm;