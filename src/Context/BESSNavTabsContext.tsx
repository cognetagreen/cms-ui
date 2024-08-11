import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';

interface BESSNavTabsContextType {
  BESSNavTabs: boolean;
  setBESSNavTabs: (BESSNavTabs: boolean) => void;
}

const BESSNavTabsContext = createContext<BESSNavTabsContextType | undefined>(undefined);

export const BESSNavTabsProvider = ({ children }: { children: ReactNode }) => {
  const [BESSNavTabs, setBESSNavTabs] = useState<boolean>(false);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/bess_overview' || location.pathname === '/bess_kpi' || location.pathname === '/bess_health') {
      setBESSNavTabs(true);
    } else {
      setBESSNavTabs(false);
    }
  }, [location]);

  return (
    <BESSNavTabsContext.Provider value={{ BESSNavTabs, setBESSNavTabs }}>
      {children}
    </BESSNavTabsContext.Provider>
  );
};

export const useBESSNavTabsContext = () => {
  const context = React.useContext(BESSNavTabsContext);
  if (context === undefined) {
    throw new Error('useBESSNavTabsContext must be used within a SelectedCustomerProvider');
  }
  return context;
};
