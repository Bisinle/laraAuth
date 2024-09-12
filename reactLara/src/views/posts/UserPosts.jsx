import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

function UserPosts() {
  const { currentUserPosts } = useStateContext();
  console.log(currentUserPosts);

  return <div>UserPosts</div>;
}

export default UserPosts;
