import React, { Component } from "react";

class Message extends Component {
  // static messageType = {

  // };
  render() {
    // const { content, type } = this.props;
    return (
      <div className="ui message">
        <i className="close icon" />
        <div className="header">Welcome back!</div>
        <p>
          This is a special notification which you can dismiss if you're bored
          with it.
        </p>
      </div>
    );
  }
}

export default Message;
