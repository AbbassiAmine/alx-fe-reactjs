import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton';

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const recipe = useRecipeStore((state) =>
        state.recipes.find((recipe) => recipe.id === parseInt(recipeId))
    );

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div className="recipe-details">
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            {recipe.prepTime && <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>}
            <div className="recipe-actions">
                <Link to="/">Back to Home</Link>
                <FavoriteButton recipeId={recipe.id} />
                <EditRecipeForm recipe={recipe} />
                <DeleteRecipeButton recipeId={recipe.id} />
            </div>
        </div>
    );
};

export default RecipeDetails;