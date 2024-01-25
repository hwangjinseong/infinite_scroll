import { useRef } from "react";

function useThrottling<T extends Function>(
  callback: T,
  throttleTime: number | undefined
) {
  const time = useRef<ReturnType<typeof setTimeout> | null>(null);

  return () => {
    if (time.current) return;

    callback();

    time.current = setTimeout(() => {
      time.current = null;
    }, throttleTime);
  };
}

export default useThrottling;
