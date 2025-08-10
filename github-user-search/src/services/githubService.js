import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_GITHUB_API_URL;

export const searchUsers = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/search/users`, {
            params: { q: username },
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};