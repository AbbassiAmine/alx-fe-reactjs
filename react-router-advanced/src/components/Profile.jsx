import { useQuery } from '@tanstack/react-query';

async function fetchProfile() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }
    return response.json();
}

function Profile() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });

    if (isLoading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <button onClick={() => refetch()}>Refetch Profile</button>
            <div>
                <p><strong>Name:</strong> {data.name}</p>
                <p><strong>Username:</strong> {data.username}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Phone:</strong> {data.phone}</p>
                <p><strong>Website:</strong> {data.website}</p>
            </div>
        </div>
    );
}

export default Profile;