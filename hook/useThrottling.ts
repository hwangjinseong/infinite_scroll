import { useRef } from "react";

function useThrottling<T extends Function>(
  callback: T,
  throttleTime = 3000
): Function {
  const time = useRef<ReturnType<typeof setTimeout> | null>(null);

  return () => {
    callback();
    time.current = setTimeout(() => {
      time.current = null;
    }, throttleTime);
  };
}

export default useThrottling;
