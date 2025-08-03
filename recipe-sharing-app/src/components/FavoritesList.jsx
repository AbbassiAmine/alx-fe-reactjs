import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
    const favorites = useRecipeStore((state) =>
        state.favorites
            .map((id) => state.recipes.find((recipe) => recipe.id === id))
            .filter((recipe) => recipe) // Filter out undefined recipes
    );

    return (
        <div className="favorites-list">
            <h2>My Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorite recipes yet. Add some from the recipe list!</p>
            ) : (
                favorites.map((recipe) => (
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

export default FavoritesList;