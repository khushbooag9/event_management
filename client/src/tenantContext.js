import React, { createContext, useContext, useState } from 'react';

// Create a context
const TenantContext = createContext();

// Create a provider component
export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState({ name: 'Default Tenant' });

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

// Create a custom hook to use the tenant context
export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};