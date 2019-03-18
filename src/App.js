import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";
import Shelf from "./models/Shelf";
import "./App.css";

class BooksApp extends React.Component {
  state = { books: [] };
  moveBookToShelf = (bookId, shelfName) => {
    this.setState(({ books }) => ({
      books: books.map(book => {
        if (book.id === bookId) {
          this.updateBook(book, shelfName);
          book.shelf = shelfName;
        }
        return book;
      })
    }));
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
            <ListBooks
              books={this.state.books}
              moveBookToShelf={this.moveBookToShelf}
            />
          )}
        />
        <Route path="/search" render={() => <SearchBooks />} />
        {/* <Route path="/search" component={SearchBooks} /> */}
      </div>
    );
  }
}

export default BooksApp;
