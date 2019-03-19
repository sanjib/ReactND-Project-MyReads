import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBookShelves from "./components/ListBookShelves";
import SearchBooks from "./components/SearchBooks";
import Shelf from "./models/Shelf";
import "./App.css";

class BooksApp extends React.Component {
  state = { books: [] };
  moveBookToShelf = (targetBook, targetShelfName) => {
    const existingBook = this.state.books.find(
      book => book.id === targetBook.id
    );
    if (existingBook) {
      this.setState(({ books }) => ({
        books: books.map(book => {
          if (book.id === targetBook.id) {
            this.updateBook(book, targetShelfName);
            book.shelf = targetShelfName;
          }
          return book;
        })
      }));
    } else {
      this.setState(({ books }) => {
        this.updateBook(targetBook, targetShelfName);
        targetBook.shelf = targetShelfName;
        books.push(targetBook);
        return { books: books };
      });
    }
  };
  updateBook = (book, shelfName) => {
    BooksAPI.update(book, shelfName).then(result => {
      let updateMessage;
      if (
        result[shelfName] &&
        result[shelfName].find(bookResultId => bookResultId === book.id)
      ) {
        updateMessage = `Moved ${book.title} to ${Shelf.getLabelFromKey(
          shelfName
        )}`;
        console.log(updateMessage);
      } else {
        updateMessage = `Removed ${book.title} from shelf.`;
        console.log(updateMessage);
      }
    });
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBookShelves
              books={this.state.books}
              moveBookToShelf={this.moveBookToShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => <SearchBooks moveBookToShelf={this.moveBookToShelf} />}
        />
        {/* <Route path="/search" component={SearchBooks} /> */}
      </div>
    );
  }
}

export default BooksApp;
