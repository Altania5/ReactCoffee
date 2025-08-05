import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderHistory({ token }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const headers = { 'x-auth-token': token };
                const response = await axios.get('http://localhost:5000/orders/myorders', { headers });
                setOrders(response.data);
            } catch (err) {
                console.error("Error fetching order history:", err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    if (loading) {
        return <p>Loading order history...</p>;
    }

    return (
        <div>
            <h2>Your Order History</h2>
            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {orders.map(order => (
                        <li key={order._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <ul>
                                {order.products.map(item => (
                                    <li key={item.product._id}>
                                        {item.product.name} - ${item.product.price.toFixed(2)} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Total: ${order.total.toFixed(2)}</strong></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OrderHistory;