import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import { useEffect } from 'react';

const RecommendationsList = () => {
    const recommendations = useRecipeStore((state) => state.recommendations);
    const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

    // Generate recommendations when component mounts or favorites change
    useEffect(() => {
        generateRecommendations();
    }, [generateRecommendations]);

    return (
        <div className="recommendations-list">
            <h2>Recommended Recipes</h2>
            {recommendations.length === 0 ? (
                <p>No recommendations yet. Add some favorites to get personalized suggestions!</p>
            ) : (
                recommendations.map((recipe) => (
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

export default RecommendationsList;