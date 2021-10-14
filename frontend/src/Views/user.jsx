import React from "react";
import Userfeed from "Components/userfeed";
function UserProfileFeed(props) {
  return (
    <>
      <Userfeed user={props.match.params.user} />
    </>
  );
}
export default UserProfileFeed;
