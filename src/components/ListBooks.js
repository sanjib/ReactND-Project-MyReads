import React, { Component } from "react";
import BookDetails from "./BookDetails";

class ListBooks extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <li key={book.id}>
            <BookDetails
              book={book}
              moveBookToShelf={this.props.moveBookToShelf}
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default ListBooks;
