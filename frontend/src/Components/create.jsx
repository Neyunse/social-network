import React from "react";
import CameraIcon from "assets/icons/camera";
import GifIcon from "assets/icons/gif";
import axios from "axios";

import ReactGiphySearchbox from "react-giphy-searchbox";
import { Notify } from "notiflix";
let source;
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
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      textLength: 0,
      maxLength: 280,
      modal: false,
      fixed: props.isfixed ? "pos_fixed" : null,
      type: props.type,
      scroll: false
    };
    source = axios.CancelToken.source();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScroll = this.handleScroll.bind(this)
  }
  log(gif) {
    var uri = gif.images.original.url;
    var el = document.getElementById("new-post");
    el.value = `![](${uri})`;
    this.setState({ modal: false, value: `![](${uri})` });
    el.style.cssText = "height:72px; padding:0";
  }
  // Create new post

  handleChange(event) {
    this.setState({ value: event.target.value });
    var el = document.getElementById("new-post");
    this.setState({
      textLength: this.state.maxLength - event.target.value.length,
    });
    setTimeout(function () {
      el.style.cssText = "height:auto; padding:0";
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = "height:" + el.scrollHeight + "px";
    }, 0);
  }
  handleSubmit(event) {
    event.preventDefault();
    var el = document.getElementById("new-post");
    el.style.cssText = "height:22px; padding:0";
    el.value = "";
    this.setState({ value: "", textLength: 0 });

    if (this.state.type === "comment") {
      this.SendComment()
    } else {
      this.SendPost();
    }
    //this.GetPosts(); // call again the post list...
  }

  SendPost = async () => {
    const settings = {
      //cancelToken: source.token,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    };
    await axios.post(`${process.env.REACT_APP_APIURI}/posts`, {
      body: this.state.value,
      user: {
        id: localStorage.getItem("userID"),
      },
    },settings
    
    ).then(() => {
      Notify.success("Post has been created");
    }).catch(err => {
      Notify.failure("Error creating the post: " + err);
    })
  };

  SendComment = async () => {
    const settings = {
      //cancelToken: source.token,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    };
    await axios.post("http://localhost:1337/comments", {      
      body: this.state.value,
      users: {
        id: localStorage.getItem("userID"),
      },
      posts:{
        id: this.props.postID
      }
    },settings).then(() => {
      Notify.success("Post has been created");
    }).catch(err => {
      Notify.failure("Error creating the post: " + err);
    })
  };

  componentDidMount = async () => {
    window.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    if (source) {
      source.cancel("Landing Component got unmounted");
      //location.reload();   
    }
  }
  handleScroll() {
    if (window.pageYOffset > 0){
      this.setState({
        scroll:true
      })
    }else{
      this.setState({
        scroll:false
      })
    }
  }
  render() {
    return (
      <>
        <div className={this.state.scroll ? `add ${this.state.fixed}` : "add"}>
          <form onSubmit={this.handleSubmit}>
            <textarea
              id="new-post"
              onChange={this.handleChange}
              maxLength={280}
              defaultValue={this.state.value}
            ></textarea>
            <div>
              {this.state.type === "comment" ? (<button className="button_new_post">Reply</button>):(<button className="button_new_post">Post</button>)}
              
              <div className="txt-md">
                <div hidden className="cm">
                  <label htmlFor="upload-photo">
                    <CameraIcon className="cameraicon" />
                  </label>
                </div>
                <input type="file" onChange={this.upload} id="upload-photo" />
                <small>
                  <GifIcon
                    className="cameraicon"
                    onClick={() => this.setState({ modal: true })}
                  />
                </small>
                <small className="nm-ct">{this.state.textLength}</small>
              </div>
            </div>
          </form>
        </div>
        {this.state.modal ? (
          <>
            <div className="modal-gif">
              <ReactGiphySearchbox
                apiKey="9902SzcaqDP0iiFC0Aw55nLfmKztUTDt" // Required: get your on https://developers.giphy.com
                onSelect={this.log.bind(this)}
              />
            </div>
          </>
        ) : null}
      </>
    );
  }
}
export default Create;
