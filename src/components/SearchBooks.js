import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
// import ListBooks from "./ListBooks";

class SearchBooks extends Component {
  state = { searchTerm: "", booksQueried: [] };
  sendBookQuery = null;
  intervalAfterTyping = 3000;
  onSearchTermChange = e => {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
    // don't query the API immediately, give a little pause to allow user to finish typing
    clearTimeout(this.sendBookQuery);
    this.sendBookQuery = setTimeout(() => {
      console.log("*** query for book ***");
      this.queryBook();
    }, this.intervalAfterTyping);
  };

  queryBook() {
    BooksAPI.search(this.state.searchTerm).then(books => {
      console.log(books);
    });
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              value={this.state.searchTerm}
              onChange={this.onSearchTermChange}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {/* <ListBooks
            books={this.state.booksQueried}
            moveBookToShelf={this.props.moveBookToShelf}
          /> */}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
