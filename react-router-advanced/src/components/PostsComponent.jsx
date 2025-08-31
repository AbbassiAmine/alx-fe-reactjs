import { useQuery } from '@tanstack/react-query';

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
}

function PostsComponent() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });

    if (isLoading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Posts</h2>
            <button onClick={() => refetch()}>Refetch Posts</button>
            <ul>
                {data.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostsComponent;