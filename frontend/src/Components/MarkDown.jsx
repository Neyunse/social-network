import React from "react";
import MarkdownView from 'react-showdown';
/* eslint-disable */
let text;
class MarkDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }
  getId(url) {
    

    return (url && url[2].length === 11)
      ? url[2]
      : null;
  }
  componentDidMount() {
    if (this.props.string) {

      if (this.props.string.includes("@")) {
        var str = this.props.string;
        var pattern = /\B@[a-z0-9_-]+/gi;
        var user = str.match(pattern);
        this.setState({ text: this.props.string.replace(user, `[${user}](http://localhost:3000/u/${user})`) });
      } else if (this.props.string.includes("https://www.youtube.com/watch")) {
        // if this.props.string return a youtube link then we need to parse it and return a embeded video.
        var str = this.props.string;
        var pattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        var video = str.match(pattern);
        var embed = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${this.getId(video)}?rel=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen="allowfullscreen"></iframe>`
        
        
        var deluri = this.props.string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
        console.log(deluri);
        this.setState({ text: `<p>${deluri}<p> ${embed}` });
        //this.setState({ text: this.props.string.replace(video[0], ) });
      }else {
        this.setState({ text: this.props.string });
      }


    }
    if (this.props.bio) {
      this.setState({ text: this.props.bio });
    }
  }

  componentWillUnmount() {

  }
  render() {
    //console.log(this.props);
    return <>
      <MarkdownView
        markdown={this.state.text}
        options={{ tables: false, emoji: true, simplifiedAutoLink: true, openLinksInNewWindow: true }}
      />
    </>;
  }
}
export default MarkDown;