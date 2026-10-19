import { useState, useEffect } from 'react';

/**
 * Custom hook hoãn cập nhật giá trị theo delay (debounce)
 * @param {any} value - Giá trị cần debounce
 * @param {number} delay - Thời gian chờ tính bằng ms
 * @returns {any}
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
