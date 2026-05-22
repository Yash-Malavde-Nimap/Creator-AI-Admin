import { createContext, useContext, useState, type ReactNode } from 'react';

export interface PageActions {
  onSort?:   () => void;
  onExport?: () => void;
  onAdd?:    () => void;
  onFilter?: () => void;
}

interface HeaderContextValue {
  actions:    PageActions;
  setActions: (a: PageActions) => void;
}

const HeaderContext = createContext<HeaderContextValue>({
  actions:    {},
  setActions: () => {},
});

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [actions, setActions] = useState<PageActions>({});
  return (
    <HeaderContext.Provider value={{ actions, setActions }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeaderContext = () => useContext(HeaderContext);
