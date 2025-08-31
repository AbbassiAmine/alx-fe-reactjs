import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

async function fetchPost({ queryKey }) {
    const [, postId] = queryKey; // queryKey is ['post', postId]
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }
    return response.json();
}

function BlogPost() {
    const { id } = useParams(); // Get post ID from URL

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['post', id],
        queryFn: fetchPost,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });

    if (isLoading) {
        return <div>Loading post...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Blog Post</h2>
            <button onClick={() => refetch()}>Refetch Post</button>
            <div>
                <h3>{data.title}</h3>
                <p>{data.body}</p>
            </div>
        </div>
    );
}

export default BlogPost;