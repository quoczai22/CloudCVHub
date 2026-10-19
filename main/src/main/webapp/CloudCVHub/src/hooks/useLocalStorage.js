import { useState, useEffect } from 'react';

/**
 * Custom hook quản lý giá trị lưu trong localStorage
 * @param {string} key - Khóa lưu trữ
 * @param {any} initialValue - Giá trị mặc định
 * @returns {[any, Function]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Lỗi khi đọc key "${key}" từ localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Lỗi khi lưu key "${key}" vào localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
