import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
};

function PostsComponent() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Posts</h1>
            <button onClick={() => refetch()}>Refetch Posts</button>
            <ul>
                {data?.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default PostsComponent;