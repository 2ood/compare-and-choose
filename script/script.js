class Item {
  static types() {
    return  {
      text : "text",
      image : "image",
      date : "date",
      star : "star",
      percent : "percent",
      integer : "integer",
      price : "price",
    };
  }
  constructor(type) {
    this.datatype = type;
  }

  static fromJson(json) {
    return new Item(json.data);
  }

  toJson() {
    return this.data;
  }

  static clone(datatype) {
    switch(datatype) {
      case Item.types.text: return new TextItem("");
      case Item.types.image: return new ImageItem("");
      case Item.types.date: return new DateItem("");
      case Item.types.star: return new StarItem("");
      case Item.types.percent: return new PercentItem("");
      case Item.types.integer: return new IntegerItem("");
      case Item.types.price: return new PriceItem("");
    }
  }
}

class TextItem extends Item {
  constructor(text){
    super(Item.types.text);
    this.value = text;
    }

  toHTML() {
    return this.value;
  }
}

class ImageItem extends Item {
  constructor(value){
    super(Item.types.image);
    this.value = value;
  }
  toHTML() {
    return `<img src=${this.value}>`;
  }
}

class DateItem extends Item {
  constructor(value){
    super(Item.types.date);
    this.value = value;
  }
  toHTML() {
    return this.value;
  }
}

class StarItem extends Item {
  constructor(value){
    super(Item.types.star);
    this.value = value;
  }
  toHTML() {
    return this.value;
  }
}

class IntegerItem extends Item {
  constructor(value){
    super(Item.types.integer);
    this.value = value;
  }
  toHTML() {
    return this.value;
  }
}

class PercentItem extends Item {
  constructor(value){
    super(Item.types.percent);
    this.value = value;
  }
  toHTML() {
    return `${this.value}%`;
  }
}

class PriceItem extends Item {
  constructor(value,currency="won"){
    super(Item.types.price);
    this.currency = currency;
    this.value = value;
  }
  toHTML() {
    return `${this.value} ${this.currency}`;
  }
}

const json  = {
  "title" : "sample title",
  "id" : "1234",
  "row" : ["img","href","price","star"],
  "datatype" :{
    "img" : Item.types.image,
    "href" : Item.types.text,
    "price" : Item.types.price,
    "star" : Item.types.star
  },
  "items" : [
    {
      "img" : new ImageItem("../src/simpson.jpeg"),
      "href" : new TextItem("www.github.com/2ood"),
      "star" : new StarItem(1),
      "price" : new PriceItem(10000)
    },
    {
      "img" : new ImageItem("../src/simpson.jpeg"),
      "href" : new TextItem("www.github.com/2ood"),
      "star" : new StarItem(2),
      "price" : new PriceItem(20000)
    },{
      "img" : new ImageItem("../src/simpson.jpeg"),
      "href" : new TextItem("www.github.com/2ood"),
      "star" : new StarItem(3),
      "price" : new PriceItem(30000)
    },{
      "img" : new ImageItem("../src/simpson.jpeg"),
      "href" : new TextItem("www.github.com/2ood"),
      "star" : new StarItem(4),
      "price" : new PriceItem(40000)
    }
  ]
};





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

  renderColumnHeader() {
    let length = this.items.length;

    let columnHeaderDOM = document.createElement("tr");
    columnHeaderDOM.appendChild(this.createDOM("td"));

    for(let i=0;i<length;i++) {
      columnHeaderDOM.appendChild(this.createDOM("th",i+1,["column-header"]));
    }

    this.target.appendChild(columnHeaderDOM);

  }

  createDOM(tagName, html, classList = [],isEditable=false) {
    let dom =  document.createElement(tagName);
    dom.spellcheck = false;
    dom.innerHTML = html!=undefined?html:"";
    dom.classList = classList;

    let t = this;

    let handleMouseMove = function(evt){
      document.querySelectorAll(":hover").forEach(function(elem){
        elem.classList.add("focus");
      });
    };

    dom.addEventListener("mousedown",function(evt){
      if(dom.classList.contains("focus")) {
          dom.classList.add("editing");
          dom.contentEditable = isEditable;
          dom.focus();
      }
      else {
        [].slice.call(document.getElementsByClassName("focus")).forEach(function(f){
          f.classList.remove("focus");
        });
        dom.classList.add("focus");
      }
      document.addEventListener("mousemove",handleMouseMove);
    });


    document.addEventListener("mouseup",function(evt){
      document.removeEventListener("mousemove",handleMouseMove);
    });



    if(tagName=="th") {
      dom.addEventListener("keydown",function(evt){
      if(evt.key=="Backspace") {
        let selection =window.getSelection().toString();
        if(selection == evt.srcElement.textContent);
        else if (evt.srcElement.textContent.length<=1);
        else return;

        alert("too short for header!");
        evt.preventDefault();
      }
      });
    }



    document.addEventListener("click",function(evt){
      const srcTag = evt.srcElement.tagName;
      switch (srcTag) {
        default :
          [].slice.call(document.getElementsByClassName("focus")).forEach(function(f){
            f.classList.remove("focus");
          });
          [].slice.call(document.getElementsByClassName("editing")).forEach(function(f){
            f.classList.remove("editing");
            f.contentEditable = false;
          });
          break;
        case "TR":
        case "TH":
        case "TD":
        case "TBODY":
        case "TABLE":
      };
    });
    return dom;
  }

  renderRow(headerName) {
    let t = this;
    let rowDOM = document.createElement("tr");
    rowDOM.appendChild(t.createDOM("th",headerName,["row-header"],true));

    this.items.forEach(function(item){
      rowDOM.appendChild(t.createDOM("td",item[headerName].toHTML(),[],true));
    });

    this.target.appendChild(rowDOM);
  }

  addRow(rowHeader, datatype) {
    this.row.push(rowHeader);
    this.items.forEach(function(item){
      item[rowHeader] = Item.clone(datatype);
    });

    this.renderRow(rowHeader);
  }

  addColumn(){
    let t  = this;
    let newItem = {};
    t.row.forEach(function(rowHeader){
      newItem[rowHeader] = "";
    });
    t.items.push(newItem);

    const rows = [].slice.call(this.target.getElementsByTagName("TR"));
    const columnNum = [].slice.call(rows[0].children).length;

    rows[0].appendChild(t.createDOM("th",columnNum,["column-header"],true));
    for(let i=1;i<rows.length;i++) {
      rows[i].appendChild(t.createDOM("td","",[],true));
    };

  }

  //TODO : change these type-coherent
  saveTabletoObject(){
    const newJson  = {
      "title" : this.title,
      "id" : this.id,
    };
    const rows = [].slice.call(this.target.getElementsByTagName("TR"));
    const columnNum = [].slice.call(rows[0].children).length-1;
    const rowHeaders = [].slice.call(this.target.getElementsByClassName("row-header"));

    newJson.row = [];
    for(let i=0;i<rowHeaders.length;i++) {
      newJson.row[i] = rowHeaders[i].textContent;
    }

    newJson.items = [];
    for(let i=0;i<columnNum;i++) {
        let newItemJson ={};
        for(let j=0;j<rowHeaders.length;j++) {
          newItemJson[rowHeaders[j].textContent] = rows[j+1].children[i+1].textContent;
        }
        newJson.items[i]= newItemJson;
    }

    return newJson;
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
  //console.log(querySnapshot.data());
});

const table_dom = document.querySelector("#main-table tbody");
const table = new Table(table_dom, json.title,json.id,json.row,json.items);

table.renderColumnHeader();
table.row.forEach(function (headerName){
  table.renderRow(headerName);
});

const add_row_button = document.getElementById("add-row");
const add_column_button = document.getElementById("add-column");
const add_both_button = document.getElementById("add-row-and-column");

//TODO : ask type of new row data
add_row_button.addEventListener("click",function (evt) {
  let rowHeader = prompt("Enter new row header", "");
  if(rowHeader!=null && rowHeader!="") table.addRow(rowHeader,Item.types.text);
});
add_column_button.addEventListener("click",function (evt){
  table.addColumn();
});

add_both_button.addEventListener("click",function(evt){
  add_row_button.click();
  add_column_button.click();
});
