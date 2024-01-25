import { useEffect } from "react";
import { useThrottling } from ".";

function useInfiniteScroll<T extends Function>(callback: T, deps: any[]) {
  const handleScroll = useThrottling(async () => {
    const { scrollTop, offsetHeight } = document.documentElement;

    if (scrollTop >= offsetHeight - window.innerHeight - 3000) {
      callback();
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useInfiniteScroll;
