"use client";

import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/infiniteScroll")}>
        무한 스크롤
      </button>
    </div>
  );
}

export default Home;
