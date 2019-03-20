import React, { Component } from "react";

class Message extends Component {
  static empty = {
    content: "",
    type: ""
  };

  static type = {
    info: "info",
    warning: "warning",
    positive: "positive",
    negative: "negative",
    loading: "loading"
  };

  static messageClass = {
    info: "info",
    warning: "warning",
    positive: "positive",
    negative: "negative",
    loading: "info"
  };

  static iconTypes = {
    info: "lightbulb",
    warning: "exclamation triangle",
    positive: "check circle",
    negative: "exclamation triangle",
    loading: "notched circle loading"
  };

  render() {
    const { content, type } = this.props.message;
    if (content) {
      const uiMessageClass = `ui mini icon message ${
        Message.messageClass[type]
      }`;
      const iconClass = `icon ${Message.iconTypes[type]}`;
      return (
        <div className={uiMessageClass}>
          <i className={iconClass} />
          <i
            className="close icon"
            onClick={() => this.props.updateMessage("", "")}
          />
          <div className="content">
            <div className="header">{content}</div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
}

export default Message;
