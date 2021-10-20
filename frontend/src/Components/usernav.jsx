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
      avatar: res.data.avatar ? process.env.REACT_APP_APIURI + res.data.avatar.url : res.data.picture,
      banner: res.data.banner ? process.env.REACT_APP_APIURI + res.data.banner.url : "https://images.squarespace-cdn.com/content/v1/5aaa042ab27e39d1bff9feb7/1522214250417-5CR04L9W9PABPQVBYJ97/bg-banner-blue.png",
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
