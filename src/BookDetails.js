import React, { Component } from "react";

class BookDetails extends Component {
  render() {
    const { book } = this.props;
    return (
      <div>
        {book.id} {book.title}
      </div>
    );
  }
}

export default BookDetails;
