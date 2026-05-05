import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import getState from "../store";

const StoreContext = createContext();
let latestStore = {};

export function StoreProvider({ children }) {
  const [store, setStoreState] = useState(() => {
    const initialStore = getState({
      getStore: () => ({}),
      getActions: () => ({}),
      setStore: () => { },
    }).store;

    latestStore = initialStore;
    return initialStore;
  });

  useEffect(() => {
    latestStore = store;
  }, [store]);

  const setStore = useCallback((newStore) => {
    setStoreState((currentStore) => {
      const updatedStore = {
        ...currentStore,
        ...newStore,
      };

      latestStore = updatedStore;
      return updatedStore;
    });
  }, []);

  const actions = useMemo(() => {
    let currentActions = {};

    currentActions = getState({
      getStore: () => latestStore,
      getActions: () => currentActions,
      setStore,
    }).actions;

    return currentActions;
  }, [setStore]);

  return (
    <StoreContext.Provider value={{ store, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  return useContext(StoreContext);
}
