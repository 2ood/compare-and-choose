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
        "price" : "11000"
      }
    },
    {
      "img" : "www.github.com/2ood.jpg",
      "href" : "www.github.com/2ood",
      "data" : {
        "star" : "4",
        "price" : "12000"
      }
    },
    {
      "img" : "www.github.com/2ood.jpg",
      "href" : "www.github.com/2ood",
      "data" : {
        "star" : "4",
        "price" : "13000"
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
  constructor(target=document.querySelector("table tbody:first-of-type"), title="untitled", id, row=[], items=[]) {
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
    let func = function(t,row){
      let newString= `<tr>`;
      newString+=`<th>${row}</th>`;
      t.items.forEach(function(item){
        newString+=`<td>${item.data[row]}</td>`;
      });
      newString +=`</tr>`;

      t.target.innerHTML+=newString;
    }
    func(this, this.row[0]);
    func(this,this.row[1]);
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyBCifis8BI-erbAj0dJdcwZnTwcQMk2s7o",
  authDomain: "ood-choose.firebaseapp.com",
  projectId: "ood-choose",
  storageBucket: "ood-choose.appspot.com",
  messagingSenderId: "46599200730",
  appId: "1:46599200730:web:97d6f5d738cfff0349aae3"
};

const app = firebase.initializeApp(firebaseConfig);
const fs = app.firestore();


fs.collection('doc').doc('testdoc').get().then((querySnapshot)=>{
  console.log(querySnapshot.data());
});

const table_dom = document.querySelector("#main-table tbody");
const table = new Table(table_dom, json.title,json.id,json.row);

const items = json.items;
items.forEach(function(item) {
    table.addItem(item);
});

console.log(table.toJson());



table.render();
