import React from 'react';

function HomePage({ user }) {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>This is the home page. News and offers will be displayed here.</p>
    </div>
  );
}

export default HomePage;