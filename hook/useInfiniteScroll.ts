import { useEffect } from "react";
import { useThrottling } from ".";

function useInfiniteScroll<T extends Function>(
  callback: T,
  deps: any[],
  scrollThreshold: number | undefined = 0,
  throttleTime: number | undefined = 0
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
