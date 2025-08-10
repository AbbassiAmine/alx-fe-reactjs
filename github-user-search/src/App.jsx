import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import './index.css';
import './app.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <header className="mb-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center">GitHub User Search</h1>
          <p className="text-gray-600 text-center">Find GitHub profiles easily</p>
        </header>
        <main className="w-full max-w-md">
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;