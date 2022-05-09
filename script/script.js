const json  = {
  "title" : "sample title",
  "id" : "1234",
  "row" : ["price","star"],
  "items" : [
    {
      "img" : "www.github.com/2ood.jpg",
      "href" : "www.github.com/2ood",
      "data" : {
        "star" : "4",
        "price" : "10000"
      }
    },
    {
      "img" : "www.github.com/2ood.jpg",
      "href" : "www.github.com/2ood",
      "data" : {
        "star" : "4",
        "price" : "10000"
      }
    },
    {
      "img" : "www.github.com/2ood.jpg",
      "href" : "www.github.com/2ood",
      "data" : {
        "star" : "4",
        "price" : "10000"
      }
    },
    {
      "img" : "www.github.com/2ood.jpg",
      "href" : "www.github.com/2ood",
      "data" : {
        "star" : "4",
        "price" : "10000"
      }
    }
  ]
};

class Item {
  constructor(i,h, ...d) {
    this.img = i;
    this.href = h;
    this.data = d;
  }

  static fromJson(json) {
    return new Item(json.img,json.href,json.data);
  }

  toJson() {
    return {
      "img" : this.img,
      "href" : this.href,
      "data" : this.data
    };
  }
}

class Table {
  constructor(target, title, id, row, items) {
    this.target = target;
    this.title = title;
    this.id = id;
    this.row = row;
    this.items = items;
  }

  toJson() {
    return {
      "title" : this.title,
      "id" : this.id,
      "row" : this.row,
      "items" : this.items
    };
  }

  addItem(json) {
    this.items.push(json);
  }

  render() {
  }
}

const table_dom = document.getElementById("main-table");
const table = new Table(table_dom, json.title,json.id,json.row,json.items);

const items = json.items;
items.forEach(function(item) {
    table.addItem(item);
});

table.render();
