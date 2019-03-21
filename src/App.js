import React from "react";
import { Switch, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBookShelves from "./components/ListBookShelves";
import SearchBooks from "./components/SearchBooks";
import Message from "./components/Message";
import Shelf from "./models/Shelf";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    booksQueried: [],
    message: Message.empty
  };

  emptyMessage = () => {
    this.updateMessage("", "");
  };

  updateMessage = (content, type) => {
    this.setState({ message: { content: content, type: type } });
  };

  emptyBooksQueried = () => {
    this.setState({ booksQueried: [] });
  };

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
      if (
        result[shelfName] &&
        result[shelfName].find(bookResultId => bookResultId === book.id)
      ) {
        this.setState({
          message: {
            content: `Moved ${book.title} to ${Shelf.getLabelFromKey(
              shelfName
            )}`,
            type: Message.type.positive
          }
        });
      } else {
        this.setState({
          message: {
            content: `Removed ${book.title} from shelf.`,
            type: Message.type.positive
          }
        });
      }
      this.updateBooksQueriedWithShelfStatus();
    });
  };

  updateBooksQueriedWithShelfStatus = (
    booksQueried = this.state.booksQueried
  ) => {
    const booksQueriedWithShelfStatus = booksQueried.map(bookQueried => {
      const bookInShelf = this.state.books.find(
        book => book.id === bookQueried.id
      );
      bookQueried.shelf = bookInShelf ? bookInShelf.shelf : Shelf.keys.none;
      return bookQueried;
    });
    this.setState({
      booksQueried: booksQueriedWithShelfStatus
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
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <ListBookShelves
                  books={this.state.books}
                  moveBookToShelf={this.moveBookToShelf}
                  message={this.state.message}
                  updateMessage={this.updateMessage}
                  emptyMessage={this.emptyMessage}
                />
              );
            }}
          />
          <Route
            path="/search"
            render={() => {
              return (
                <SearchBooks
                  booksQueried={this.state.booksQueried}
                  moveBookToShelf={this.moveBookToShelf}
                  message={this.state.message}
                  updateMessage={this.updateMessage}
                  emptyMessage={this.emptyMessage}
                  emptyBooksQueried={this.emptyBooksQueried}
                  updateBooksQueriedWithShelfStatus={
                    this.updateBooksQueriedWithShelfStatus
                  }
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
