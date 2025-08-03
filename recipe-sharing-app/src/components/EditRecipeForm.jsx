import { useState } from 'react';
import useRecipeStore from '../components/recipeStore.js';

const EditRecipeForm = ({ recipe }) => {
    const updateRecipe = useRecipeStore((state) => state.updateRecipe);
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title.trim() && description.trim()) {
            updateRecipe({ ...recipe, title, description });
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
            <button type="submit">Update Recipe</button>
        </form>
    );
};

export default EditRecipeForm;