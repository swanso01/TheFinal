import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import '../App.css';

function OrderMaterialsPage() {
  const { user, setUser, services } = useContext(UserContext);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemName, value, maxQuantity) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    if (maxQuantity === 0 || quantity <= maxQuantity) {
      setQuantities((prev) => ({
        ...prev,
        [itemName]: quantity,
      }));
    } else {
      alert(`You cannot order more than ${maxQuantity} of ${itemName}`);
    }
  };

  const handleSelectItem = (item) => {
    if (!user) {
      console.error('User is undefined');
      return;
    }

    const quantityToAdd = item.name === 'Labor' ? 1 : quantities[item.name] || 1;
    if (item.maxQuantity !== 0 && quantityToAdd > item.maxQuantity && item.name !== 'Labor') {
      alert(`You cannot order more than ${item.maxQuantity} of ${item.name}`);
      return;
    }

    setUser((prevUser) => {
      const updatedCart = [...(prevUser.selectedItems || [])];
      const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.name === item.name);

      if (existingItemIndex > -1) {
        const updatedQuantity = updatedCart[existingItemIndex].quantity + quantityToAdd;
        if (item.maxQuantity === 0 || updatedQuantity <= item.maxQuantity || item.name === 'Labor') {
          updatedCart[existingItemIndex] = { ...updatedCart[existingItemIndex], quantity: updatedQuantity };

        } else {
          alert(`You cannot order more than ${item.maxQuantity} of ${item.name}`);
          return prevUser;
        }
      } else {
        updatedCart.push({ name: item.name, quantity: quantityToAdd });
        
      }

      return { ...prevUser, selectedItems: updatedCart };
    });
  };

  const laborService = services.find(service => service.name === 'Labor');
  const otherServices = services.filter(service => service.name !== 'Labor');

  return (
    <div className="App-order-materials">
      <h2>Order Materials</h2>

      <div className="App-order-labor">
        {laborService && (
          <div className="App-order-item">
            <span>{laborService.name}</span>
            <button className="App-order-button" onClick={() => handleSelectItem(laborService)}>
              Add to Cart
            </button>
          </div>
        )}
      </div>

      <div className="App-order-list">
        {otherServices.map((service, index) => (
          <div key={index} className="App-order-item">
            <span>{service.name}</span>
            <input
              type="number"
              min="1"
              value={quantities[service.name] || 1}
              onChange={(e) => handleQuantityChange(service.name, e.target.value, service.maxQuantity)}
              className="App-order-quantity-input"
            />
            <button
              className="App-order-button"
              onClick={() => handleSelectItem(service)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderMaterialsPage;