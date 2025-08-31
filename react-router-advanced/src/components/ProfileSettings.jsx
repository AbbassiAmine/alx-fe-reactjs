import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchUserPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
    if (!response.ok) {
        throw new Error('Failed to fetch user posts');
    }
    return response.json();
}

function ProfileSettings() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['userPosts'],
        queryFn: fetchUserPosts,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });

    const [settings, setSettings] = useState({
        notifications: true,
        theme: 'light',
    });

    const handleSettingsChange = (e) => {
        const { name, type, checked, value } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    if (isLoading) {
        return <div>Loading user posts...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h3>Profile Settings</h3>
            <div>
                <h4>Settings</h4>
                <label>
                    <input
                        type="checkbox"
                        name="notifications"
                        checked={settings.notifications}
                        onChange={handleSettingsChange}
                    />
                    Enable Notifications
                </label>
                <br />
                <label>
                    Theme:
                    <select
                        name="theme"
                        value={settings.theme}
                        onChange={handleSettingsChange}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
            <div>
                <h4>User Posts</h4>
                <button onClick={() => refetch()}>Refetch User Posts</button>
                <ul>
                    {data.slice(0, 3).map((post) => ( // Limit to 3 posts for brevity
                        <li key={post.id}>
                            <h5>{post.title}</h5>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProfileSettings;