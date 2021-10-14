import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Verified from 'assets/icons/verified';
import { Link } from 'react-router-dom';
import MarkDown from './MarkDown';
import Heart from 'assets/icons/heart';
import TrashICon from 'assets/icons/trash';
import { Notify } from 'notiflix';
import Create from './create';
/* eslint-disable */
let source;
let interval;
const io = require('socket.io-client');
const API_URL = 'http://localhost:1337/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzMTI4MTE5LCJleHAiOjE2MzU3MjAxMTl9.72lZWe_bkGGr3H9Y4IPlrhx64gVDnQfNW_vlLf8TLZI';
// Handshake required, token will be verified against strapi
Notify.init({
  width: '280px',
  position: 'right-bottom', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 8000,
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
class Statusfeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      socket: [],
      author: [],
      authorAvatar: [],
      comments: [],
      authorUser: [],
      page: 1,
      length: 0,
      prevY: 0,
      loading: true,
      user: props.user,
      idpost: props.pid,
    };
    source = axios.CancelToken.source();
    //console.log(props);
  }

  GetPosts = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_APIURI}/posts/${this.state.idpost}?_where[user.username]=${this.state.user}`,
      {
        cancelToken: source.token,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );

    this.setState({
      article: res.data,
      length: res.data.length,
      author: res.data.user[0],
      authorAvatar: res.data.user[0].avatar,
    });
  };
  GetComments = async () => {
    // http://localhost:1337/comments/post:1

    const res = await axios.get(
      `http://localhost:1337/comments?_where[posts.id]=${this.state.idpost}&_sort=created_at:desc`,
      {
        cancelToken: source.token,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
    //console.log(res.data);

    this.setState({
      comments: res.data,
    });
  };

  componentDidMount() {
    this.GetPosts();
    this.GetComments();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }
  componentWillUnmount() {
    if (source) {
      source.cancel('Landing Component got unmounted');
    }
  }

  // LIKE & DISLIKE

  MG = async (e, article) => {
    e.preventDefault();
    const settings = {
      cancelToken: source.token,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    await axios.put(
      'http://localhost:1337/posts/' + article.id,
      {
        mg: article.mg + 1,
      },
      settings
    );
    this.GetPosts();
    //this.GetComments();
  };

  DEL = async (e, article) => {
    e.preventDefault();
    await axios
      .delete('http://localhost:1337/posts/' + article.id, {
        cancelToken: source.token,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(() => {
        Notify.success('Post has been deleted');
        location.replace('/home');
      })
      .catch((err) => {
        Notify.failure('Error while deleting post');
      });
  };

  // COMMENTs
  MGComm = async (e, comment) => {
    e.preventDefault();
    const settings = {
      cancelToken: source.token,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    await axios.put(
      'http://localhost:1337/comments/' + comment.id,
      {
        mg: comment.mg + 1,
      },
      settings
    );
    //this.GetComments();
  };

  DELComm = async (e, id, authorId) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:1337/comments/${id}`, {
        cancelToken: source.token,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(() => {
        Notify.success('Comment has been deleted');
      })
      .catch((err) => {
        Notify.failure('Error while deleting Comment');
      });
  };
  render() {
    const { article, author, authorAvatar, comments } = this.state;
    //console.log(comments);
    socket.emit('subscribe', 'comment');

    socket.on('create', async (data) => {
      this.GetComments();
      this.GetPosts();
    });
    socket.on('update', (data) => {
      this.GetComments();
    });
    socket.on('delete', (data) => {
      this.GetComments();
      this.GetPosts();
    });

    
    return (
      <>
        <div className="timeline post_timeline">
          <ul className="post_container">
            <li key={article.id}>
              <article>
                <div className="content">
                  <div className="post_header">
                    <Link to={`/u/${author.username}`}>
                      <img
                        className="post_image_profile_user"
                        src={`${process.env.REACT_APP_APIURI}${authorAvatar.url}`}
                        alt=""
                      />
                      <div className="us">
                        <span>
                          {author.username}{' '}
                          {author.verified ? (
                            <Verified className="verified" />
                          ) : null}
                        </span>
                        <br />
                        <small>
                          {moment(article.created_at).format('llll')}
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
                        />{' '}
                        {article.mg}
                      </small>
                    </span>
                    <span className="r">
                      {author.username === localStorage.getItem('username') ? (
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
            </li>
            <Create type="comment" postID={article.id} />

            {comments.map((comments, index) => (
              <>
                {comments.blocked ? (
                  <>
                    <li key={`c-${comments.id}`}>
                      <article>
                        <div className="content">
                          <div className="post_header">
                            <Link to={`/u/${comments.users[0].username}`}>
                              <img
                                className="post_image_profile_user"
                                src={`${process.env.REACT_APP_APIURI}${comments.users[0].avatar.url}`}
                                alt=""
                              />
                              <div className="us">
                                <span>
                                  {comments.users[0].username}{' '}
                                  {comments.users[0].verified ? (
                                    <Verified className="verified" />
                                  ) : null}
                                </span>
                                <br />
                                <small>
                                  {moment(comments.created_at).format('llll')}
                                </small>
                              </div>
                            </Link>
                          </div>
                          <br />
                          <div className="body">
                            <br />
                            <p
                              style={{
                                textAlign: 'center',
                              }}
                            >
                              This comment was blocked by the admin
                            </p>
                          </div>
                        </div>
                      </article>
                    </li>
                  </>
                ) : (
                  <>
                    <li key={`c-${comments.id}`}>
                      <article>
                        <div className="content">
                          <div className="post_header">
                            <Link to={`/u/${comments.users[0].username}`}>
                              <img
                                className="post_image_profile_user"
                                src={`${process.env.REACT_APP_APIURI}${comments.users[0].avatar.url}`}
                                alt=""
                              />
                              <div className="us">
                                <span>
                                  {comments.users[0].username}{' '}
                                  {comments.users[0].verified ? (
                                    <Verified className="verified" />
                                  ) : null}
                                </span>
                                <br />
                                <small>
                                  {moment(comments.created_at).format('llll')}
                                </small>
                              </div>
                            </Link>
                          </div>
                          <div className="body">
                            <MarkDown string={comments.body} />
                          </div>
                          <hr />
                          <div className="footer">
                            <span>
                              <small>
                                <Heart
                                  onClick={(e) => this.MGComm(e, comments)}
                                  className="heart"
                                />{' '}
                                {comments.mg > 0 ? comments.mg : 0}
                              </small>
                            </span>
                            <span className="r">
                              {comments.users[0].username ===
                              localStorage.getItem('username') ? (
                                <small
                                  onClick={(e) => this.DELComm(e, comments.id)}
                                >
                                  <TrashICon className="Trash" />
                                </small>
                              ) : null}
                            </span>
                          </div>
                        </div>
                      </article>
                    </li>
                  </>
                )}
              </>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
export default Statusfeed;
