import { useState } from 'react';
import { fetchUserData } from '../services/githubService.js';

function Search() {
    const [query, setQuery] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setUserData(null);

        try {
            const data = await fetchUserData(query);
            setUserData(data);
        } catch (err) {
            setError('Looks like we cant find the user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    disabled={loading}
                >
                    Search
                </button>
            </form>

            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {userData && (
                <div className="text-center">
                    <img
                        src={userData.avatar_url}
                        alt={`${userData.login}'s avatar`}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-xl font-semibold">{userData.name || userData.login}</h2>
                    <a
                        href={userData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        View GitHub Profile
                    </a>
                </div>
            )}
        </div>
    );
}

export default Search;