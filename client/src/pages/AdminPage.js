import React from 'react';

function AdminPage({ user }) {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user.username}. Here you can manage products and view statistics.</p>
      {/* We will move the product management form here next */}
    </div>
  );
}

export default AdminPage;