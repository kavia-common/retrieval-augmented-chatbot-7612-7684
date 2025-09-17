import React, { createContext, useContext } from 'react';

/**
 * ApiContext provides baseUrl for API calls.
 */
const Ctx = createContext({ baseUrl: '' });

// PUBLIC_INTERFACE
export const ApiProvider = ({ baseUrl, children }) => {
  return <Ctx.Provider value={{ baseUrl }}>{children}</Ctx.Provider>;
};

// PUBLIC_INTERFACE
export const useApi = () => useContext(Ctx);
