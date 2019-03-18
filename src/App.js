import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";
import "./App.css";

class BooksApp extends React.Component {
  state = { books: [] };

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
          render={() => <ListBooks books={this.state.books} />}
        />
        <Route path="/search" render={() => <SearchBooks />} />
        {/* <Route path="/search" component={SearchBooks} /> */}
      </div>
    );
  }
}

export default BooksApp;
