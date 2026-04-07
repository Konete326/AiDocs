import React from 'react';
import { useAuth } from '../context/AuthContext';
import ApiTester from '../components/ApiTester';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white text-center mt-20">Bootloader...</div>;

  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      <header className="flex justify-between items-center p-6 border-b border-gray-900 bg-gray-950/80 backdrop-blur-md">
        <h1 className="text-2xl font-black text-white px-2 tracking-tighter">
          Ai<span className="text-indigo-500">Docs</span> 
        </h1>
        <nav>
          {user ? (
            <span className="text-gray-400 text-sm bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
              Session Live: {user.email || 'Admin'}
            </span>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-indigo-400 hover:text-white px-2">Operator Login</Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded shadow-lg transition-all">Registration</Link>
            </div>
          )}
        </nav>
      </header>
      
      <main className="pt-4">
        {user ? (
          <ApiTester />
        ) : (
          <div className="text-center mt-32 text-gray-500 max-w-xl mx-auto">
            <h2 className="text-5xl text-white font-bold mb-6">Awaiting Identity Context</h2>
            <p className="text-lg">Deploy this instance immediately to Vercel and verify functionality dynamically.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
