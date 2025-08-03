import { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe }) => {
    const updateRecipe = useRecipeStore((state) => state.updateRecipe);
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const [ingredients, setIngredients] = useState(recipe.ingredients.join(', '));
    const [prepTime, setPrepTime] = useState(recipe.prepTime || '');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title.trim() && description.trim()) {
            updateRecipe({
                ...recipe,
                title,
                description,
                ingredients: ingredients ? ingredients.split(',').map((item) => item.trim()) : [],
                prepTime: prepTime ? parseInt(prepTime) : null,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-recipe-form">
            <h2>Edit Recipe</h2>
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
            <button type="submit">Update Recipe</button>
        </form>
    );
};

export default EditRecipeForm;
