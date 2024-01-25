import { useEffect } from "react";
import { useThrottling } from ".";

interface Options {
  scrollThreshold?: number;
  throttleTime?: number;
}

function useInfiniteScroll<T extends Function>(
  callback: T,
  deps: any[],
  { scrollThreshold = 0, throttleTime = 0 }: Options = {}
) {
  const handleScroll = useThrottling(() => {
    const { scrollTop, offsetHeight } = document.documentElement;

    if (scrollTop >= offsetHeight - window.innerHeight - scrollThreshold) {
      callback();
    }
  }, throttleTime);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useInfiniteScroll;
