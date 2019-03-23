import React, { Component } from "react";
import PropTypes from "prop-types";
import AddBook from "./AddBook";
import Shelf from "../models/Shelf";
import ListBooks from "./ListBooks";
import Message from "./Message";

class ListBookShelves extends Component {
  componentDidMount() {
    this.props.emptyMessage();
  }

  render() {
    const { books } = this.props;
    const shelfNames = Object.keys(Shelf.keys).filter(
      key => key !== Shelf.keys.none
    );
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>
            <img
              style={{
                position: "relative",
                filter: "invert(100%)",
                margin: "-2px 8px -14px 0"
              }}
              src="/book-icon.png"
              alt="Book Icon"
              width="50px"
            />
            MyReads
          </h1>
        </div>
        <div className="list-books-content ui container">
          <Message
            message={this.props.message}
            updateMessage={this.props.updateMessage}
          />
          <div style={{ marginTop: "30px" }}>
            {shelfNames.map(shelfName => {
              const filteredBooksForThisShelf = books.filter(
                book => book.shelf === shelfName
              );
              return (
                <div className="bookshelf" key={shelfName}>
                  <h2 className="bookshelf-title">
                    {Shelf.getLabelFromKey(shelfName)}
                    <span
                      className="ui circular label"
                      style={{ position: "absolute", margin: "2px 0 0 10px" }}
                    >
                      {filteredBooksForThisShelf.length}
                    </span>
                  </h2>
                  <div className="bookshelf-books">
                    <ListBooks
                      books={filteredBooksForThisShelf}
                      moveBookToShelf={this.props.moveBookToShelf}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <AddBook />
      </div>
    );
  }
}

ListBookShelves.propTypes = {
  message: PropTypes.object.isRequired,
  updateMessage: PropTypes.func.isRequired,
  emptyMessage: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default ListBookShelves;
