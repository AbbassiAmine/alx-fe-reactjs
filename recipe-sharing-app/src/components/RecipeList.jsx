import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
    const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

    return (
        <div className="recipe-list">
            <h2>Recipes</h2>
            {filteredRecipes.length === 0 ? (
                <p>No recipes match your search. Try a different term or add a new recipe!</p>
            ) : (
                filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <h3>
                            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        </h3>
                        <p>{recipe.description}</p>
                        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                        {recipe.prepTime && <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>}
                    </div>
                ))
            )}
        </div>
    );
};

export default RecipeList;