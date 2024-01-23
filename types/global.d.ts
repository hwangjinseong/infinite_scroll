type APIResponse = {
  page: number;
  list: Item[];
};

type Item = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
