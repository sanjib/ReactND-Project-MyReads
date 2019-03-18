class Shelf {
  static keys = {
    currentlyReading: "currentlyReading",
    wantToRead: "wantToRead",
    read: "read"
  };
  static getLabelFromKey(key) {
    const label = {};
    label[this.keys.currentlyReading] = "Currently Reading xxx";
    label[this.keys.wantToRead] = "Want to Read xxx";
    label[this.keys.read] = "Read xxx";
    if (label[this.keys[key]]) {
      return label[key];
    }
  }
}

export default Shelf;
