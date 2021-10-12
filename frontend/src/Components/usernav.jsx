import React from "react";
import axios from "axios";
let source;
/* eslint-disable */
class UserNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: ""||localStorage.getItem("userID"),
      avatar: "",
      banner: "",
      
    };
    source = axios.CancelToken.source();
  }
  componentDidMount = async () => {
    this.GetUser();
  };

  componentWillUnmount() {
    if (source) {
      source.cancel("Landing Component got unmounted");
      
    }
  }
  GetUser = async () => {
    const res = await axios.get(`${process.env.REACT_APP_APIURI}/users/${this.state.user_id}`,{
        cancelToken: source.token,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    this.setState({ 
        avatar: process.env.REACT_APP_APIURI+res.data.avatar.url,
        banner: process.env.REACT_APP_APIURI+res.data.banner.url
    });
    //console.log(res.data.banner);
  };
  render() {
    const { avatar,banner } = this.state;
    return (
      <div className="userinfo_container">
        <div className="card_user">
          <div className="card_user_img">
            <img src={banner} />
          </div>
          <div className="userprofile">
            <img
              src={avatar}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}
export default UserNav;
