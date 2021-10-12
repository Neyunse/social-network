import React from "react";
import axios from "axios";
import moment from "moment";
import Verified from "assets/icons/verified";
import { Link } from "react-router-dom";
import MarkDown from "./MarkDown";
import Heart from "assets/icons/heart";
import Create from "./create";
import TrashICon from "assets/icons/trash";
import CommentsIcon from "assets/icons/comments";
import { Notify } from "notiflix";

/* eslint-disable */
let source;
let interval;
const io = require("socket.io-client");
const API_URL = "http://localhost:1337/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzMTI4MTE5LCJleHAiOjE2MzU3MjAxMTl9.72lZWe_bkGGr3H9Y4IPlrhx64gVDnQfNW_vlLf8TLZI";
// Handshake required, token will be verified against strapi
Notify.init({
  width: "280px",
  position: "right-bottom", // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: "10px",
  opacity: 1,
  borderRadius: "5px",
  rtl: false,
  timeout: 8000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: "rgba(0,0,0,0.5)",
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: "NotiflixNotify",
  className: "notiflix-notify",
  zindex: 4001,
  fontFamily: "Quicksand",
  fontSize: "13px",
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: "fade", // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: "basic", // 'basic' - 'shadow'
  fontAwesomeIconSize: "34px",

  success: {
    background: "#32c682",
    textColor: "#fff",
    childClassName: "success",
    notiflixIconColor: "rgba(0,0,0,0.2)",
    fontAwesomeClassName: "fas fa-check-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(50,198,130,0.2)",
  },

  failure: {
    background: "#ff5549",
    textColor: "#fff",
    childClassName: "failure",
    notiflixIconColor: "rgba(0,0,0,0.2)",
    fontAwesomeClassName: "fas fa-times-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(255,85,73,0.2)",
  },

  warning: {
    background: "#eebf31",
    textColor: "#fff",
    childClassName: "warning",
    notiflixIconColor: "rgba(0,0,0,0.2)",
    fontAwesomeClassName: "fas fa-exclamation-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(238,191,49,0.2)",
  },

  info: {
    background: "#26c0d3",
    textColor: "#fff",
    childClassName: "info",
    notiflixIconColor: "rgba(0,0,0,0.2)",
    fontAwesomeClassName: "fas fa-info-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(38,192,211,0.2)",
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
      page: 1,
      length: 0,
      prevY: 0,
      loading: true,
      user: "" || localStorage.getItem("username"),
      scroll: false,
    };
    source = axios.CancelToken.source();
    this.handleScroll = this.handleScroll.bind(this);
  }

  GetPosts = async (page) => {
    await axios
      .get(`${process.env.REACT_APP_APIURI}/posts?_sort=created_at:desc`, {
        cancelToken: source.token,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //console.log(res);
        this.setState({ article: res.data, length: res.data.length });
      })
      .catch((err) => {});
    // if (res.status === 200) {
    //   this.setState({ article: res.data, length: res.data.length });
    // }
  };

  componentDidMount = async () => {
    this.GetPosts();
    window.addEventListener("scroll", this.handleScroll);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    if (source) {
      source.cancel("Landing Component got unmounted");
      //location.reload();
    }
  }
  handleScroll() {
    if (window.pageYOffset > 0) {
      this.setState({
        scroll: true,
      });
    } else {
      this.setState({
        scroll: false,
      });
    }
  }

  // LIKE & DISLIKE

  MG = async (e, article) => {
    e.preventDefault();
    const settings = {
      cancelToken: source.token,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios.put(
      "http://localhost:1337/posts/" + article.id,
      {
        mg: article.mg + 1,
      },
      settings
    );
  };

  DEL = async (e, article) => {
    e.preventDefault();

    await axios
      .delete("http://localhost:1337/posts/" + article.id, {
        cancelToken: source.token,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        Notify.success("Post has been deleted");
      })
      .catch((err) => {
        Notify.failure("Error while deleting post");
      });
  };

  // Get Comments count

  render() {
    socket.emit("subscribe", "post");

    socket.on("create", async (data) => {
      this.GetPosts();
    });
    socket.on("update", (data) => {
      this.GetPosts();
    });
    socket.on("delete", (data) => {
      this.GetPosts();
    });

    return (
      <>
        <Create isfixed={true} postID="null" />
        <div className={this.state.scroll ? "timeline tm_top" : "timeline"}>
          <ul className="post_container">
            {this.state.article.map((article) => (
              <li key={article.id}>
                <Link
                  className="no-link"
                  to={`/s/${article.user[0].username}/${article.id}`}
                >
                  <article>
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
                            <CommentsIcon className="heart" />{" "}
                            {article.comments.length}
                          </small>
                        </span>
                        <span className="r">
                          {article.user[0].username ===
                          localStorage.getItem("username") ? (
                            <>
                              {article.comments.length > 0 ? null : (
                                <>
                                  <small onClick={(e) => this.DEL(e, article)}>
                                    <TrashICon className="Trash" />
                                  </small>
                                </>
                              )}
                            </>
                          ) : null}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
export default Publicfeed;
