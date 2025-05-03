// CartPage.js
import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import '../App.css';

function CartPage() {
  const { user, setUser } = useContext(UserContext);

  if (!user || !user.selectedItems || user.selectedItems.length === 0) {
    return <div className="App-cart-empty">Your cart is empty.</div>;
  }

  const handleRemoveItem = (itemName) => {
    setUser((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  };

  return (
    <div className="App-cart">
      <h2>Your Cart</h2>
      <ul>
        {user.selectedItems.map((item, index) => (
          <li key={index} className="App-cart-item">
            <span>{item.name}</span>
            <div className="App-cart-actions">
              <span>Quantity: {item.quantity}</span>
              <button
                className="App-cart-remove-button"
                onClick={() => handleRemoveItem(item.name)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartPage;