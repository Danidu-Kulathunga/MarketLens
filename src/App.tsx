import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { MarketDataProvider } from '@/context/MarketDataContext';
import { AppRoutes } from '@/routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MarketDataProvider>
          <AppRoutes />
        </MarketDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
