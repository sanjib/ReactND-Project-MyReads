import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListBooks from "./ListBooks";
import Message from "./Message";

class SearchBooks extends Component {
  state = { searchTerm: "" };
  sendBookQuery = null;
  intervalAfterTyping = 1000;

  onSearchTermChange = e => {
    this.setState({ searchTerm: e.target.value });
    // don't query the API immediately, give a little
    // pause to allow the user to finish typing
    clearTimeout(this.sendBookQuery);
    this.sendBookQuery = setTimeout(() => {
      this.props.queryBook(this.state.searchTerm);
    }, this.intervalAfterTyping);
  };

  render() {
    return (
      <div className="search-books ui container">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={this.state.searchTerm}
              onChange={this.onSearchTermChange}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <Message
            message={this.props.message}
            updateMessage={this.props.updateMessage}
          />
          <ListBooks
            books={this.props.books}
            moveBookToShelf={this.props.moveBookToShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
