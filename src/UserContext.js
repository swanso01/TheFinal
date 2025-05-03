import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    selectedItems: [], 
  });

  const [services, setServices] = useState([
    { name: 'Materials', maxQuantity: 0 },
    { name: 'Labor', maxQuantity: 1 },
    { name: 'Packages', maxQuantity: 0 },
  ]);

  return (
    <UserContext.Provider value={{ user, setUser, services, setServices }}>
      {children}
    </UserContext.Provider>
  );
};
