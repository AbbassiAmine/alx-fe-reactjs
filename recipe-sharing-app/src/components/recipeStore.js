import { create } from 'zustand';

const useRecipeStore = create((set) => ({
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],
    favorites: [], // Array to store IDs of favorite recipes
    recommendations: [], // Array to store recommended recipes
    addRecipe: (newRecipe) => set((state) => ({
        recipes: [...state.recipes, newRecipe],
        filteredRecipes: [...state.recipes, newRecipe].filter((recipe) =>
            recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(state.searchTerm.toLowerCase())
            ) ||
            (recipe.prepTime && recipe.prepTime.toString().includes(state.searchTerm))
        ),
    })),
    setRecipes: (recipes) => set((state) => ({
        recipes,
        filteredRecipes: recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(state.searchTerm.toLowerCase())
            ) ||
            (recipe.prepTime && recipe.prepTime.toString().includes(state.searchTerm))
        ),
    })),
    deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== id),
        filteredRecipes: state.filteredRecipes.filter((recipe) => recipe.id !== id),
        favorites: state.favorites.filter((favId) => favId !== id), // Remove from favorites if deleted
        recommendations: state.recommendations.filter((rec) => rec.id !== id), // Remove from recommendations if deleted
    })),
    updateRecipe: (updatedRecipe) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ),
        filteredRecipes: state.filteredRecipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ).filter((recipe) =>
            recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(state.searchTerm.toLowerCase())
            ) ||
            (recipe.prepTime && recipe.prepTime.toString().includes(state.searchTerm))
        ),
        recommendations: state.recommendations.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ), // Update recommendation if recipe changes
    })),
    setSearchTerm: (term) => set((state) => ({
        searchTerm: term,
        filteredRecipes: state.recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(term.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(term.toLowerCase())
            ) ||
            (recipe.prepTime && recipe.prepTime.toString().includes(term))
        ),
    })),
    addFavorite: (recipeId) => set((state) => ({
        favorites: state.favorites.includes(recipeId)
            ? state.favorites
            : [...state.favorites, recipeId],
        recommendations: state.recommendations, // Trigger recommendation update if needed
    })),
    removeFavorite: (recipeId) => set((state) => ({
        favorites: state.favorites.filter((id) => id !== recipeId),
        recommendations: state.recommendations, // Trigger recommendation update if needed
    })),
    generateRecommendations: () => set((state) => {
        // If no favorites, return empty recommendations or random recipes
        if (state.favorites.length === 0) {
            return { recommendations: state.recipes.slice(0, 3) }; // Suggest up to 3 random recipes
        }
        // Get ingredients from favorite recipes
        const favoriteRecipes = state.recipes.filter((recipe) =>
            state.favorites.includes(recipe.id)
        );
        const favoriteIngredients = [...new Set(
            favoriteRecipes.flatMap((recipe) => recipe.ingredients)
        )];
        // Recommend recipes that share ingredients with favorites, excluding favorites
        const recommended = state.recipes
            .filter((recipe) => !state.favorites.includes(recipe.id)) // Exclude favorites
            .filter((recipe) =>
                recipe.ingredients.some((ingredient) =>
                    favoriteIngredients.includes(ingredient)
                )
            )
            .sort(() => Math.random() - 0.5) // Shuffle for variety
            .slice(0, 3); // Limit to 3 recommendations
        return { recommendations: recommended };
    }),
}));

export default useRecipeStore;