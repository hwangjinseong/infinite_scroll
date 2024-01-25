import { useEffect } from "react";
import { useThrottling } from ".";

function useInfiniteScroll<T extends Function>(
  callback: T,
  scrollThreshold: number | undefined = 3000,
  deps: any[]
) {
  const handleScroll = useThrottling(async () => {
    const { scrollTop, offsetHeight } = document.documentElement;

    if (scrollTop >= offsetHeight - window.innerHeight - scrollThreshold) {
      callback();
    }
  }, 17);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useInfiniteScroll;
