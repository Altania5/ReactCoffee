import React, { useState } from 'react';
import Navbar from './Navbar';
import HomePage from '../pages/HomePage';
import OrderPage from '../pages/OrderPage';
import AdminPage from '../pages/AdminPage';

function AppLayout({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(currentCart => {
      const existing = currentCart.find(item => item._id === product._id);
      if (existing) {
        return currentCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const handleLogout = () => {
      setCart([]); // Clear cart on logout
      onLogout();
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'order':
        return <OrderPage user={user} cart={cart} setCart={setCart} addToCart={addToCart} />;
      case 'admin':
        // Only render Admin page if the user role is 'owner'
        return user.role === 'owner' ? <AdminPage user={user} /> : <HomePage />;
      case 'home':
      default:
        return <HomePage user={user} />;
    }
  };

  return (
    <div>
      <Navbar
        user={user}
        onLogout={handleLogout}
        setActiveTab={setActiveTab}
        cartItemCount={cart.reduce((count, item) => count + item.quantity, 0)}
      />
      <main style={{ padding: '20px' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default AppLayout;