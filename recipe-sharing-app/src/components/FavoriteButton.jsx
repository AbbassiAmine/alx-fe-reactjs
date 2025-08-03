import useRecipeStore from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
    const favorites = useRecipeStore((state) => state.favorites);
    const addFavorite = useRecipeStore((state) => state.addFavorite);
    const removeFavorite = useRecipeStore((state) => state.removeFavorite);
    const isFavorite = favorites.includes(recipeId);

    const handleToggle = () => {
        if (isFavorite) {
            removeFavorite(recipeId);
        } else {
            addFavorite(recipeId);
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
        >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
};

export default FavoriteButton;