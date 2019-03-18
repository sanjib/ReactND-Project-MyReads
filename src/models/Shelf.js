class Shelf {
  static keys = {
    currentlyReading: "currentlyReading",
    wantToRead: "wantToRead",
    read: "read"
    // none: "none"
  };
  static getLabelFromKey(key) {
    const label = {};
    label[this.keys.currentlyReading] = "Currently Reading";
    label[this.keys.wantToRead] = "Want to Read";
    label[this.keys.read] = "Read";
    // label[this.keys.none] = "None";
    if (label[this.keys[key]]) {
      return label[key];
    }
  }
}

export default Shelf;
