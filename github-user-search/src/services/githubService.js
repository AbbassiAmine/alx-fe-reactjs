import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

const api = axios.create({
    baseURL: API_URL,
    headers: API_KEY ? { Authorization: `token ${API_KEY}` } : {},
});

// Existing function for single user (from previous)
export const fetchUserData = async (username) => {
    try {
        const response = await api.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('User not found');
    }
};

// New function for advanced user search
export const searchUsers = async (queryParams, page = 1, per_page = 10) => {
    let q = '';
    const { searchTerm, location, minRepos } = queryParams;

    if (searchTerm) q += `${searchTerm} `;
    if (location) q += `location:"${location}" `;
    if (minRepos !== null && minRepos >= 0) q += `repos:>=${minRepos} `;

    q = q.trim();

    if (!q) {
        throw new Error('At least one search criterion is required');
    }

    const response = await api.get('/search/users', {
        params: { q, page, per_page },
    });

    // Fetch full user details for each result to get location and public_repos
    const users = await Promise.all(
        response.data.items.map(async (item) => {
            const userResponse = await api.get(`/users/${item.login}`);
            return userResponse.data;
        })
    );

    return {
        users,
        total_count: response.data.total_count,
        page,
        per_page,
    };
};