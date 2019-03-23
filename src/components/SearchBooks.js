import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "../BooksAPI";
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
      this.queryBook(this.state.searchTerm);
    }, this.intervalAfterTyping);
  };

  queryBook = searchTerm => {
    this.props.emptyBooksQueried();
    if (searchTerm.trim() === "") {
      this.props.emptyMessage();
      return;
    }
    this.props.updateMessage(
      `Searching for '${searchTerm}'`,
      Message.type.loading
    );
    BooksAPI.search(searchTerm)
      .then(result => {
        if (result.error) {
          this.props.updateMessage(
            `Could not find any book for '${searchTerm}'`,
            Message.type.negative
          );
        } else if (result) {
          this.props.updateBooksQueriedWithShelfStatus(result);
          this.props.updateMessage(
            `Found ${result.length} books on ${searchTerm}`,
            Message.type.positive
          );
        }
      })
      .catch(() => {
        this.props.updateMessage(
          `Could not find any book for: '${searchTerm}'`,
          Message.type.negative
        );
      });
  };

  componentDidMount() {
    this.props.emptyMessage();
    this.props.emptyBooksQueried();
  }

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
            books={this.props.booksQueried}
            moveBookToShelf={this.props.moveBookToShelf}
          />
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  message: PropTypes.object.isRequired,
  updateMessage: PropTypes.func.isRequired,
  emptyMessage: PropTypes.func.isRequired,
  booksQueried: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyBooksQueried: PropTypes.func.isRequired,
  updateBooksQueriedWithShelfStatus: PropTypes.func.isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default SearchBooks;
