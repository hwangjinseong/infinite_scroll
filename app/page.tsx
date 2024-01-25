"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useInfiniteScroll } from "../hook";
import getItems from "../service/getItems";
import { Item } from "../components/InfiniteScroll";

function Home() {
  const limit = 30;

  const loading = useRef<boolean>(false);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<APIResponse>({
    queryKey: ["home-data-list"],
    queryFn: ({ pageParam }) => getItems(pageParam as number, limit),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.list.length === 0 ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

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

export default Home;
