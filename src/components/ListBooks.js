import React, { Component } from "react";
import AddBook from "./AddBook";
import BookDetails from "./BookDetails";
import Shelf from "../models/Shelf";

class ListBooks extends Component {
  render() {
    const { books } = this.props;
    const shelfNames = Object.keys(Shelf.keys);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfNames.map(shelfName => (
              <div className="bookshelf" key={shelfName}>
                <h2 className="bookshelf-title">
                  {Shelf.getLabelFromKey(shelfName)}
                </h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter(book => book.shelf === shelfName)
                      .map(book => (
                        <li key={book.id}>
                          <BookDetails
                            book={book}
                            moveBookToShelf={this.props.moveBookToShelf}
                          />
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AddBook />
      </div>
    );
  }
}

export default ListBooks;
