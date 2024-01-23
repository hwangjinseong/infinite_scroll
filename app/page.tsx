"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

async function getItems(page: number, limit: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`
  );

  const data = await response.json();

  return {
    page: page && page + 1,
    list: data as Item[],
  };
}

function Home() {
  const limit = 300;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<APIResponse>({
    queryKey: ["home-item"],
    queryFn: ({ pageParam }) => getItems(pageParam as number, limit),
    getNextPageParam: (res) => res.page,
    initialPageParam: 1,
  });

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;

      if (window.innerHeight + scrollTop >= offsetHeight) {
        if (!hasNextPage) {
          fetchNextPage();
        }
      }
    }

    console.log(hasNextPage);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  const dataList = data?.pages
    .map((item) => item.list.map((itemList) => itemList))
    .flat();

  return (
    <div>
      {dataList?.map((item) => (
        <div key={item.id} className="mb-10 border-solid border-2 border-black">
          <li>
            postId : {item.postId}
            <ol>id : {item.id}</ol>
            <ol>name : {item.name}</ol>
            <ol>email : {item.email}</ol>
            <ol>body : {item.body}</ol>
          </li>
        </div>
      ))}
    </div>
  );
}

export default Home;
