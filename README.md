# MyReads Project

This is the completed version of the MyReads project for Udacity's React Fundamentals course. The project provides a React app that allows the user to query a book database and add books to preferred shelves. There are three shelves available: Currently Reading, Want to Read and Read. Books may also be moved from one shelf to another. The app provides two screens: all the shelves with the list of books and a book search screen that queries the remote database. Books are displayed with their covers and have controls that allow the user to move the book to their shelf of choice.

## Installation

To get started please follow the steps below:

- install all project dependencies with `yarn install`
- start the development server with `yarn start`
- once the server starts, point your browser to http://localhost:3000/ to launch the app

## Project Structure

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms
├── package.json # npm package manager file
├── public
│   ├── book-icon.png # Used as favicon and also in the app page header
│   ├── favicon.ico # React Icon
│   └── index.html # public index.html
└── src
    ├── components
    │   ├── AddBook.js # This is the '+' button on the main page that links to the search page
    │   ├── BookDetails.js # Book details page showing cover, title, move to shelf control and more
    │   ├── ListBooks.js # Lists the books in a particular shelf or on the Search page
    │   ├── ListBookShelves.js # Lists the 3 book shelves Currently Reading, Wish to Read or Read
    │   ├── Message.js # A friendly message that shows the result of an action like move or search
    │   └── SearchBooks.js # The search input to query the database
    ├── models
    │   ├── Book.js # Book model used in Book Details particularly useful for title, author and image
    │   └── Shelf.js # Contants some static methods and enums for the various shelves
    ├── App.css # Styles
    ├── App.js # This is the root of the app and contains most of the states and methods
    ├── App.test.js # Used for testing
    ├── BooksAPI.js # A JavaScript API to query the book database backend
    ├── icons # Helpful images for the app
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles
    └── index.js # Used for DOM rendering
```

## Main Page

- The main page shows 3 shelves for books. Each shelf contains books that belong to that shelf.
- The number of books available in particular shelf are displayed.
- Each books shows it cover, title and all of its authors.
- Each book also have a control that allows it to be moved to any of the 3 shelves or be removed from a shelf.
- Color codes on the controls overlaying each book are used to easily distinguish the shelf a book belongs to:
  -- Dark read: Currently Reading
  -- Gold: Want to Read
  -- Slate Gray: Read
  -- Sea Green: Doesn't belong to a shelf (visible in the search page)

## Search Page

- The search page has an input field to query the backend database via the Book API.
- As the user types into the search field, books that match the query are displayed on the page, along with their titles and authors.
- The components creates a 1 second delay to allow the user to finish typing before sending the query term to the backend server.
- Search results are cleared when there is no input
- Search in progress, emtpy results or invalid queries are handled with an apporopriate message
- Like the shelves on the main page, the search page re-uses the ListBooks component
- Like the shelves on the main page, each book can be assigned to particular shelf or removed from a shelf
- The colors on the book controls are really useful here to easily identify if a book belongs to a shelf (and which shelf) or not

## Backend Server

The file [`BooksAPI.js`](src/BooksAPI.js) contains methods to query the book database backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
