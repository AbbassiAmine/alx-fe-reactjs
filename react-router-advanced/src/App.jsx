import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostsComponent from './components/PostsComponent';
import Home from './components/Home';
import Profile from './components/Profile';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div style={{ padding: '20px' }}>
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/posts">Posts</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsComponent />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;