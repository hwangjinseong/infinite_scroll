"use client";

import { useRef } from "react";
import { useGetItemsQuery } from "../../queries/getItemsQueries";
import { useInfiniteScroll } from "../../hook";
import { Item } from "../../components/InfiniteScroll";

function InfiniteScroll() {
  const limit = 30;

  const loading = useRef<boolean>(false);

  const { data, fetchNextPage, hasNextPage } = useGetItemsQuery(limit);

  useInfiniteScroll(async () => {
    if (hasNextPage && loading.current === false) {
      loading.current = true;
      await fetchNextPage();
      loading.current = false;
    }
  }, [data, loading]);

  const dataList = data?.pages
    .map((item) => item.list.map((itemList) => itemList))
    .flat();

  return (
    <>
      {dataList?.map((item) => (
        <Item
          key={item.id}
          postId={item.postId}
          numberId={item.id}
          name={item.name}
          email={item.email}
          body={item.body}
        />
      ))}
    </>
  );
}

export default InfiniteScroll;
