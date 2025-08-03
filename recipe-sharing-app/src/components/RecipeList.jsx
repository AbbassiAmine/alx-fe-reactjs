import { Link } from 'react-router-dom';
import useRecipeStore from '../components/recipeStore';

const RecipeList = () => {
    const recipes = useRecipeStore((state) => state.recipes);

    return (
        <div className="recipe-list">
            <h2>Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes available. Add one below!</p>
            ) : (
                recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <h3>
                            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        </h3>
                        <p>{recipe.description}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default RecipeList;