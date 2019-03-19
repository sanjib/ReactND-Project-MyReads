import { isArray } from "util";

class Book {
  id;
  title;
  subtitle;
  getFullTitle() {
    let fullTitle = this.title;
    if (this.subtitle) fullTitle += ": " + this.subtitle;
    return fullTitle;
  }
  authors;
  getAuthors() {
    if (this.authors && isArray(this.authors)) {
      return this.authors.join(", ");
    }
  }
  averageRating;
  ratingsCount;
  categories;
  description;
  imageLinks = { smallThumbnail: "", thumbnail: "" };
  publishedDate;
  publisher;
  shelf;
  constructor(book) {
    this.title = book.title;
    this.subtitle = book.subtitle;
    this.authors = book.authors;
    this.averageRating = book.averageRating;
    this.ratingsCount = book.ratingsCount;
    this.categories = book.categories;
    this.description = book.description;
    this.id = book.id;
    this.imageLinks = book.imageLinks;
    this.publishedDate = book.publishedDate;
    this.publisher = book.publisher;
    this.shelf = book.shelf;
  }
}

export default Book;
