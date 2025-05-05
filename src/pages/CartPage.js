import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import '../App.css';

function CartPage() {
  const { user, setUser } = useContext(UserContext);

  if (!user || !user.selectedItems || user.selectedItems.length === 0) {
    return <div className="App-cart-empty">Your cart is empty.</div>;
  }

  const handleRemoveItem = (itemName) => {
    if (!user) {
      console.error('User is undefined');
      return;
    }

    setUser({
      ...user,
      selectedItems: user.selectedItems.reduce((acc, curr) => {
        if (curr.name === itemName) {
          const newQuantity = curr.quantity - 1;
          if (newQuantity > 0) {
            return [...acc, { ...curr, quantity: newQuantity }];
          }
          return acc;
        }
        return [...acc, curr];
      }, []),
    });
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