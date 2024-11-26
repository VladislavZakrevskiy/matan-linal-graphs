import { useEffect, useRef } from "react";

function useDebounce< T extends (...args: unknown[]) => unknown>(callback: T, delay: number): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<number | null>(null);

  const debouncedFunction = (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}

export default useDebounce;
