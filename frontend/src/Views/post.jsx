import React from "react";
import Statusfeed from "Components/Statusfeed";
function Post(props) {
  // console.log(props);
  return (
    <>
      <Statusfeed user={props.match.params.user} pid={props.match.params.pid} />
    </>
  );
}
export default Post;