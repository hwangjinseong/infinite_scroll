import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  postId: number;
  numberId: number;
  name: string;
  email: string;
  body: string;
}

function Item({ postId, numberId, name, email, body, ...props }: Props) {
  return (
    <ul {...props}>
      postId : {postId}
      <li>id : {numberId}</li>
      <li>name : {name}</li>
      <li>email : {email}</li>
      <li>body : {body}</li>
    </ul>
  );
}

export default Item;
