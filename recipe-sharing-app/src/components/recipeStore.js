import { create } from 'zustand';

const useRecipeStore = create((set) => ({
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],
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
}));

export default useRecipeStore;