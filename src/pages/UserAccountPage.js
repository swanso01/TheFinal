// UserAccountPage.js
import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';

function UserAccountPage() {
  const { user } = useContext(UserContext);

  if (!user || !user.email) {
    return <Navigate to="/LoginPage" />;
  }

  return (
    <div>
      <h2>My Account</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.name}</p>

      <h3>Order History:</h3>
      {user.orders.length > 0 ? (
        <ul>
          {user.orders.map((order, index) => (
            <li key={index}>{order}</li>
          ))}
        </ul>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
}

export default UserAccountPage;