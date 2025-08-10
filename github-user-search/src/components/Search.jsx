import { useState } from 'react';
import { searchUsers } from '../services/githubService';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [total, setTotal] = useState(0);

    const handleSearch = async (e) => {
        e.preventDefault();
        setUsers([]);
        setPage(1);
        setError(null);
        setLoading(true);
        setHasMore(false);
        setTotal(0);

        try {
            const params = {
                searchTerm,
                location,
                minRepos: minRepos ? parseInt(minRepos, 10) : null,
            };
            const data = await searchUsers(params, 1);
            setUsers(data.users);
            setTotal(data.total_count);
            setHasMore(data.total_count > data.per_page);
        } catch (err) {
            setError(`Error searching users: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        setLoadingMore(true);
        try {
            const nextPage = page + 1;
            const params = {
                searchTerm,
                location,
                minRepos: minRepos ? parseInt(minRepos, 10) : null,
            };
            const data = await searchUsers(params, nextPage);
            setUsers((prev) => [...prev, ...data.users]);
            setPage(nextPage);
            setHasMore((prev.length + data.users.length) < total);
        } catch (err) {
            setError(`Error loading more users: ${err.message}`);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <form onSubmit={handleSearch} className="space-y-4">
                <div>
                    <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">
                        Search Term (username or keyword)
                    </label>
                    <input
                        id="searchTerm"
                        type="text"
                        placeholder="Enter username or keyword"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        placeholder="Enter location (e.g., New York)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">
                        Minimum Repositories
                    </label>
                    <input
                        id="minRepos"
                        type="number"
                        min="0"
                        placeholder="Enter minimum number of repositories"
                        value={minRepos}
                        onChange={(e) => setMinRepos(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p className="mt-4 text-center text-red-500">{error}</p>}

            <div className="mt-6 space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-gray-50 p-4 rounded-md shadow flex items-center space-x-4">
                        <img
                            src={user.avatar_url}
                            alt={`${user.login}'s avatar`}
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
                            <p className="text-gray-600">Location: {user.location || 'Not specified'}</p>
                            <p className="text-gray-600">Repositories: {user.public_repos}</p>
                            <a
                                href={user.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                View Profile
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {users.length === 0 && !loading && !error && (
                <p className="mt-4 text-center text-gray-600">No users found</p>
            )}

            {hasMore && (
                <button
                    onClick={loadMore}
                    className="mt-4 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                    disabled={loadingMore}
                >
                    {loadingMore ? 'Loading More...' : 'Load More'}
                </button>
            )}
        </div>
    );
}

export default Search;