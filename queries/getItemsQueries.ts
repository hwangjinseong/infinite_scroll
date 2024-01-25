import { useInfiniteQuery } from "@tanstack/react-query";
import getItems from "../service/getItems";

export const useGetItemsQuery = (limit: number) =>
  useInfiniteQuery<APIResponse>({
    queryKey: ["home-data-list"],
    queryFn: ({ pageParam }) => getItems(pageParam as number, limit),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.list.length === 0 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });
