import React from "react";
import PropTypes from "prop-types";
import BookDetails from "./BookDetails";

const ListBooks = props => {
  return (
    <ol className="books-grid">
      {props.books.map(book => (
        <li key={book.id}>
          <BookDetails book={book} moveBookToShelf={props.moveBookToShelf} />
        </li>
      ))}
    </ol>
  );
};

ListBooks.proptTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default ListBooks;
