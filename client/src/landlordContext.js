import React, { createContext, useContext, useState } from 'react';

const LandlordContext = createContext();

export const useLandlord = () => {
  return useContext(LandlordContext);
};

export const LandlordProvider = ({ children }) => {
  const [landlord, setLandlord] = useState({ name: 'Default Landlord' }); // Replace with actual initial state

  return (
    <LandlordContext.Provider value={{ landlord, setLandlord }}>
      {children}
    </LandlordContext.Provider>
  );
};
