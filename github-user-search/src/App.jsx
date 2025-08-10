import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4">
        <header className="mb-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center">GitHub User Search</h1>
          <p className="text-gray-600 text-center">Find GitHub profiles easily</p>
        </header>
        <main className="w-full max-w-md">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />
                  <button
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    onClick={() => {
                      console.log('Search for:', searchQuery);
                    }}
                  >
                    Search
                  </button>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;