import { useGetItemsQuery } from "../../queries/getItemsQueries";

function useInfiniteScrollItems(limit: number) {
  const { data, fetchNextPage, hasNextPage } = useGetItemsQuery(limit);

  const dataList = data?.pages
    .map((item) => item.list.map((itemList) => itemList))
    .flat();

  return { dataList, fetchNextPage, hasNextPage };
}

export default useInfiniteScrollItems;
