import React from "react";
import MarkdownView from 'react-showdown';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
/* eslint-disable */
let text;
class MarkDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      url:false,
      link:""
    }
  }
  getId(url) {


    return (url && url[2].length === 11)
      ? url[2]
      : null;
  }
  componentDidMount() {
    if (this.props.string) {

      if (/@/g.test(this.props.string)) {
        var str = this.props.string;

        var user = str.replace(/@/g, "");

        this.setState({ text: `[@${user}](http://localhost:3000/u/${user})` });

      } else if (/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.test(this.props.string)) {
        // if this.props.string return a youtube link then we need to parse it and return a embeded video.
        var str = this.props.string;
        var pattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        var video = str.match(pattern);
        var embed = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${this.getId(video)}?rel=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen="allowfullscreen"></iframe>`


        var deluri = this.props.string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
        this.setState({ text: `<p>${deluri}<p> ${embed}` });
        //this.setState({ text: this.props.string.replace(video[0], ) });

        //
      } else if (/(https?:\/\/.*\.(?:png|jpg|gif|.))/i.test(this.props.string)) {
        // if this.props.string return a youtube link then we need to parse it and return a embeded video.
        var str = this.props.string;
        var pattern = /(https?:\/\/.*\.(?:png|jpg|gif))/i
        var image = str.match(pattern);
        var embed = `<img src="${image[0]}" alt="image" />`
        var deluri = this.props.string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
        this.setState({ text: `<p>${deluri}<p> ${embed}` });
      }else if (/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(this.props.string)) {
        var str = this.props.string;
        var pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        var uri = str.match(pattern);
        var deluri = this.props.string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")

        this.setState({ text: `<p>${deluri}<p> `, link: uri[0]  });

        

      } else {
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
      {this.state.link ? <LinkPreview url={this.state.link} borderColor="#424546" /> : null}
    </>;
  }
}
export default MarkDown;