"use client";

import { useRef } from "react";
import { useInfiniteScroll } from "../../hook";
import { Item } from "../../components/InfiniteScroll";
import { useInfiniteScrollItems } from "../../businessHook/infiniteScroll";

function InfiniteScroll() {
  const limit = 30;

  const loading = useRef<boolean>(false);

  const { data, fetchNextPage, hasNextPage } = useInfiniteScrollItems(limit);

  useInfiniteScroll(
    async () => {
      if (hasNextPage && loading.current === false) {
        loading.current = true;
        await fetchNextPage();
        loading.current = false;
      }
    },
    [data, loading],
    { scrollThreshold: 4000, throttleTime: 16 }
  );

  return (
    <>
      {data?.map((item) => (
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
