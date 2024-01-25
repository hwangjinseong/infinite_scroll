async function getItems(page: number, limit: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`
  );

  const data = await response.json();

  return {
    page: page,
    list: data as Item[],
  };
}

export default getItems;
