import React from "react";
import axios from "axios";
import moment from "moment";
import Verified from "assets/icons/verified";
import { Link } from "react-router-dom";
import MarkDown from "./MarkDown";
import Heart from "assets/icons/heart";
import TrashICon from "assets/icons/trash";
import { Notify } from "notiflix";
import CommentsIcon from "assets/icons/comments";
/* eslint-disable */
let source;
let interval;
const io = require("socket.io-client");
const API_URL = "http://localhost:1337/";
const token = localStorage.getItem("token");
// Handshake required, token will be verified against strapi
Notify.init({
  width: '280px',
  position: 'right-bottom', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 10000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },

  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },

  warning: {
    background: '#eebf31',
    textColor: '#fff',
    childClassName: 'warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },

  info: {
    background: '#26c0d3',
    textColor: '#fff',
    childClassName: 'info',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.2)',
  },
});
/* eslint-disable */
const socket = io.connect(API_URL, {
  query: token,
});
class Publicfeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      socket: [],
      page: 50,
      length: 0,
      userIDPost: "",
      user: this.props.user,
      avatar: "",
      banner: "",
      bio: "",
      User_id: 0,
      patreonID: "",
      scroll: false,
      userData: [],
    };
    source = axios.CancelToken.source();
    this.handleScroll = this.handleScroll.bind(this);

  }

  GetPosts = async () => {
    const res = await axios.get(
      "http://localhost:1337/posts?_sort=created_at:desc&_where[user.username]=" +
      this.state.user,
      {
        cancelToken: source.token,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (res.status === 200) {
      this.setState({
        article: res.data,
        length: res.data.length,
      });
      //console.log(res.data)
      return res.data.length;
    }
  };

  GetUser = async () => {
    const res = await axios.get(
      "http://localhost:1337/users?_where[username]=" + this.state.user,
      {
        cancelToken: source.token,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    this.setState({
      avatar: res.data[0].avatar.url,
      banner: res.data[0].banner.url,
      verified: res.data[0].verified,
      bio: res.data[0].biografia,
      User_id: res.data[0].user_id,
      patreonID: res.data[0].patreonID,
      userData: res.data[0],
    });
    //console.log(res.data);
  };

  componentDidMount = async () => {
    window.addEventListener('scroll', this.handleScroll);
    this.GetPosts();
    this.GetUser();
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    if (source) {
      source.cancel("Landing Component got unmounted");
      //location.reload();
    }
  }
  handleScroll() {
    if (window.pageYOffset > 0) {
      this.setState({
        scroll: true
      })
    } else {
      this.setState({
        scroll: false
      })
    }
  }
  // LIKE & DISLIKE

  MG = async (e, article) => {
    e.preventDefault();
    const settings = {
      cancelToken: source.token,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    };
    await axios.put("http://localhost:1337/posts/" + article.id, {
      mg: article.mg + 1,
    }, settings);
    this.GetPosts();
  };

  DEL = async (e, article) => {
    e.preventDefault();
    await axios.delete("http://localhost:1337/posts/" + article.id, {
      cancelToken: source.token,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(() => {
      Notify.success('Post has beend deleted');
    }).catch(err => {
      Notify.failure('Error while deleting post');
    })

  };
  RedirectPost(author,idPost){
    location.replace(`/s/${author}/${idPost}`);
  }
  render() {
    socket.emit("subscribe", "post");

    socket.on("create", async (data) => {
      this.GetPosts();
    });
    socket.on("update", async (data) => {
      this.GetPosts();
    });
    socket.on("delete", async (data) => {
      this.GetPosts();
    });

    return (
      <>
        <div className={this.state.scroll ? "add pos_fixed" : "add"}>
          <div className="header">
            <div className="banner">

              {this.state.patreonID > 0 ? (
                <div className="patreon">
                  <a target="_blank" href={`https://www.patreon.com/bePatron?u=${this.state.patreonID}`}>Become a Patron!</a>
                </div>
              ) : null}
              <img src={`${process.env.REACT_APP_APIURI}${this.state.banner}`} alt="" />
            </div>
            <div className="avatar">
              <img src={`${process.env.REACT_APP_APIURI}${this.state.avatar}`} alt="" />
            </div>
            <br /><br />
            <div className="desc">
              <div className="username">
                <b>
                  {this.state.user}
                  {this.state.verified ? (
                    <Verified className="verified" />
                  ) : null}
                </b>
              </div><br />
             
            </div>
          </div>
        </div>
        <div className={this.state.scroll ? "timeline user_timeline" : "timeline"}>
          <ul className="post_container">
            {this.state.article.length > 0 ? (
              <>
                {this.state.article.map((article) => (
                  <li key={article.id}>
                    
                    <article onClick={()=>this.RedirectPost(article.user[0].username,article.id)}>
                      <div className="content">
                        <div className="post_header">
                          <Link to={`/u/${article.user[0].username}`}>
                            <img
                              className="post_image_profile_user"
                              src={`${process.env.REACT_APP_APIURI}${article.user[0].avatar.url}`}
                              alt=""
                            />
                            <div className="us">
                              <span>
                                {article.user[0].username}{" "}
                                {article.user[0].verified ? (
                                  <Verified className="verified" />
                                ) : null}
                              </span>
                              <br />
                              <small>
                                {moment(article.created_at).format("llll")}
                              </small>
                            </div>
                          </Link>
                        </div>
                        <div className="body">
                          <MarkDown string={article.body} />
                        </div>
                        <hr />
                        <div className="footer">
                          <span>
                            <small>
                              <Heart
                                onClick={(e) => this.MG(e, article)}
                                className="heart"
                              />{" "}
                              {article.mg}
                            </small>
                          </span>
                          &nbsp;&nbsp;
                          <span>
                            <small>
                              <CommentsIcon
                                className="heart"
                              />{" "}
                              {article.comments.length}

                            </small>
                          </span>

                          <span className="r">
                            {article.user[0].username === localStorage.getItem('username') ? (
                              <>
                                {article.comments.length > 0 ? null : (<>
                                  <small onClick={(e) => this.DEL(e, article)}>
                                    <TrashICon className="Trash" />
                                  </small>
                                </>)}
                              </>
                            ) : null}
                          </span>
                        </div>
                      </div>
                    </article>

                  </li>
                ))}
              </>
            ) : (
              <li>

                <article>
                  <div className="content">
                    <div className="body">
                      <p style={{
                        textAlign: "center",
                      }}><b>{this.state.user}</b> don't has post yet</p>
                    </div>
                  </div>
                </article>
              </li>
            )}
          </ul>
        </div>
      </>
    );
  }
}
export default Publicfeed;
