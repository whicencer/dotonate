import { useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  return function(...args: Parameters<T>): void {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
