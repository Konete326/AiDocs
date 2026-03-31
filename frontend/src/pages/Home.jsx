import React from 'react';
import Navbar from '../components/layout/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h1>Welcome to AIDocs</h1>
        <p>Your document management solution.</p>
      </main>
    </div>
  );
};

export default Home;
