import React from "react";
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

export default ListBooks;
