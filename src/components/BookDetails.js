import React, { Component } from "react";
import Shelf from "../models/Shelf";
import Book from "../models/Book";

class BookDetails extends Component {
  handleChange = e => {
    this.props.moveBookToShelf(this.props.book, e.target.value);
  };
  // handleMouseDown = e => {
  //   // allows user to select the first option,
  //   // otherwise handleChange won't detect the first option
  //   // as it will seem already selected
  //   e.target.value = "";
  // };
  render() {
    const book = new Book(this.props.book);
    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && book.imageLinks.thumbnail && (
            <div
              className="book-cover"
              style={{
                width: 130,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }}
            />
          )}
          <div className={`book-shelf-changer ${book.shelf}`}>
            <select
              value={book.shelf}
              onMouseDown={this.handleMouseDown}
              onChange={this.handleChange}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value={Shelf.keys.currentlyReading}>
                Currently Reading
              </option>
              <option value={Shelf.keys.wantToRead}>Want to Read</option>
              <option value={Shelf.keys.read}>Read</option>
              <option value={Shelf.keys.none}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.getFullTitle()}</div>
        <div className="book-authors">{book.getAuthors()}</div>
      </div>
    );
  }
}

export default BookDetails;
