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
  componentDidMount() {
    if (this.props.string) {

      if (this.props.string.includes("@")) {
        var str = this.props.string;
        var pattern = /\B@[a-z0-9_-]+/gi;
        var user = str.match(pattern);
        this.setState({ text: this.props.string.replace(user,`[${user}](http://localhost:3000/u/${user})`) });
      }else{

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