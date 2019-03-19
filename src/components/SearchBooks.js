import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import ListBooks from "./ListBooks";
import Message from "./Message";

class SearchBooks extends Component {
  state = { searchTerm: "", booksQueried: [] };
  sendBookQuery = null;
  intervalAfterTyping = 1000;
  onSearchTermChange = e => {
    this.setState({ searchTerm: e.target.value });
    // don't query the API immediately, give a little
    // pause to allow the user to finish typing
    clearTimeout(this.sendBookQuery);
    this.sendBookQuery = setTimeout(() => {
      this.setState({ booksQueried: [] });
      console.log(`* query for book: ${this.state.searchTerm}`);
      this.queryBook();
    }, this.intervalAfterTyping);
  };

  queryBook() {
    BooksAPI.search(this.state.searchTerm).then(result => {
      if (result.error) {
        console.log(result.error);
      } else if (result) {
        // console.log(result);
        this.setState({ booksQueried: result });
        // console.log(this.state.booksQueried);
      } else {
        // console.log(result);
      }
    });
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
          <Message />
          <ListBooks
            books={this.state.booksQueried}
            moveBookToShelf={this.props.moveBookToShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
