
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from '../utils/localStorage';
import '../App.css';

function AdminDashboardPage() {
  const { services, setServices } = useContext(UserContext);
  const { user } = useContext(UserContext); 
  const [newService, setNewService] = useState('');
  const [maxQuantity, setMaxQuantity] = useState(0);

  const defaultServices = [
    { name: 'Materials', maxQuantity: 0 },
    { name: 'Labor', maxQuantity: 1 },
    { name: 'Packages', maxQuantity: 0 },
  ];

  useEffect(() => {
    const savedServices = loadFromLocalStorage('services', []);
    if (Array.isArray(savedServices) && savedServices.length > 0) {
      setServices(savedServices.filter((service) => service.name && service.name.trim() !== ''));
    } else {
      setServices(defaultServices);
    }
  }, [setServices]);

  useEffect(() => {
    saveToLocalStorage('services', services);
  }, [services]);

  const handleLogout = () => {
    removeFromLocalStorage('isAdminLoggedIn');
    window.location.href = '/';
  };

  const handleAddService = () => {
    if (newService.trim() !== '') {
      setServices([...services, { name: newService.trim(), maxQuantity: parseInt(maxQuantity) || 0 }]);
      setNewService('');
      setMaxQuantity(0);
    } else {
      alert('Service name cannot be blank!');
    }
  };

  const handleRemoveService = (serviceName) => {
    setServices(services.filter((service) => service.name !== serviceName));
  };


  if (!user || !user.isAdmin) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Access Denied</h2>
        <p>You must be logged in as an administrator to view this page.</p>
        <a href="/">Go to Home</a>
      </div>
    );
  }

  return (
    <div className="App-admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="App-logout-button">
        Logout
      </button>
      <div className="App-admin-input">
        <input
          type="text"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          placeholder="New service name"
        />
        <input
          type="number"
          min="0"
          value={maxQuantity}
          onChange={(e) => setMaxQuantity(e.target.value)}
          placeholder="Max quantity (0 = no limit)"
        />
        <button onClick={handleAddService}>Add Service</button>
      </div>

      <h3>Current Services</h3>
      <ul className="App-admin-services">
        {services.map((service, index) => (
          <li key={index} className="App-admin-service-item">
            {service.name} (Max: {service.maxQuantity === 0 ? 'No limit' : service.maxQuantity})
            <button onClick={() => handleRemoveService(service.name)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboardPage;