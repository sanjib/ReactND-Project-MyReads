class Shelf {
  static currentlyReading = "currentlyReading";
  static wantToRead = "wantToRead";
  static read = "read";
  static getLabelFromKey(key) {
    const label = {};
    label[this.currentlyReading] = "Currently Reading xxx";
    label[this.wantToRead] = "Want to Read xxx";
    label[this.read] = "Read xxx";
    if (this[key]) {
      return label[key];
    }
  }
}

export default Shelf;
