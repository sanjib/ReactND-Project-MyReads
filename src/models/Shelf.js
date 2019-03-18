class Shelf {
  static keys = {
    currentlyReading: "currentlyReading",
    wantToRead: "wantToRead",
    read: "read"
  };
  static getLabelFromKey(key) {
    const label = {};
    label[this.keys.currentlyReading] = "Currently Reading";
    label[this.keys.wantToRead] = "Want to Read";
    label[this.keys.read] = "Read";
    if (label[this.keys[key]]) {
      return label[key];
    }
  }
}

export default Shelf;
