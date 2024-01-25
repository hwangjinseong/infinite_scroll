import { DetailedHTMLProps, LiHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  postId: number;
  numberId: number;
  name: string;
  email: string;
  body: string;
}

function Item({ postId, numberId, name, email, body, ...props }: Props) {
  return (
    <li {...props}>
      postId : {postId}
      <ol>id : {numberId}</ol>
      <ol>name : {name}</ol>
      <ol>email : {email}</ol>
      <ol>body : {body}</ol>
    </li>
  );
}

export default Item;
