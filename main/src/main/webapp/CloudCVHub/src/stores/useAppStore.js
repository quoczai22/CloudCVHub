import { useState, useEffect } from 'react';

/**
 * Quản lý trạng thái ứng dụng chung (Global State)
 */
let globalState = {
  activePage: 'dashboard',
  theme: 'light',
  notifications: [],
};

const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener(globalState));
}

export const appStore = {
  getState: () => globalState,
  setState: (updater) => {
    globalState = typeof updater === 'function' ? updater(globalState) : { ...globalState, ...updater };
    notify();
  },
  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useAppStore() {
  const [state, setState] = useState(appStore.getState());

  useEffect(() => {
    return appStore.subscribe(setState);
  }, []);

  return [state, appStore.setState];
}

export default appStore;
