import React from 'react';

// Notice we replace inline styles with classNames
function Navbar({ user, onLogout, setActiveTab, cartItemCount }) {
  return (
    <header className="app-header">
      <div className="app-title">Altanian Coffee</div>
      <nav className="navbar">
        <div className="nav-tabs">
          <button onClick={() => setActiveTab('home')}>Home</button>
          <button onClick={() => setActiveTab('order')}>Order</button>
          {user.role === 'owner' && (
            <button onClick={() => setActiveTab('admin')}>Admin</button>
          )}
        </div>
        <div className="nav-user">
          <span>Cart: {cartItemCount}</span>
          <span>Welcome, {user.username}!</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;