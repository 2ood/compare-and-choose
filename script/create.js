const firebaseConfig = {
  apiKey: "AIzaSyBCifis8BI-erbAj0dJdcwZnTwcQMk2s7o",
  authDomain: "ood-choose.firebaseapp.com",
  projectId: "ood-choose",
  storageBucket: "ood-choose.appspot.com",
  messagingSenderId: "46599200730",
  appId: "1:46599200730:web:97d6f5d738cfff0349aae3"
};

function changeValidatorStatus(target, statusName, message){
  target.innerHTML = message;
  target.classList.remove("error");
  target.classList.remove("searching");
  target.classList.remove("passing");

  switch(statusName){
    case "error" : {target.classList.add("error"); break;}
    case "searching" : {target.classList.add("searching"); break;}
    case "passing" : {target.classList.add("passing"); break;}
  }
}

function changeFormStatus(target,statusName) {
  target.classList.remove("stopped");
  target.classList.remove("passing");

  let buttons=target.querySelectorAll("button.validating");;

  switch(statusName){
    case "stopped" : {
      target.classList.add("stopped");
      buttons.forEach((button)=>{
        button.setAttribute("disabled","true");
      });
      break;
    }
    case "passing" : {
      target.classList.add("passing");
      buttons.forEach((button)=>{
        button.removeAttribute("disabled");
      });
      break;
    }
  }
}

document.addEventListener("DOMContentLoaded",function(){
  const body = document.querySelector("body");
  const app = firebase.initializeApp(firebaseConfig);
  const firestore  = app.firestore();

  const steps = document.querySelectorAll("step");
  const forms = document.getElementsByTagName("form");

  const to_second_button =document.getElementById("to-second");
  const to_first_button =document.getElementById("to-first");
  const submit_button =document.getElementById("submit");

  const name_input = document.getElementById("name");
  const privacy_select = document.getElementById("privacy-setting");

  const name_validator = document.getElementById("name-validator");
  const curtain = body.removeChild(document.getElementById("curtain"));
  const messagebox = curtain.querySelector("messagebox");


  to_first_button.addEventListener("click",()=>{
    forms[0].classList.remove("passed");
    forms[0].classList.add("active");
    forms[1].classList.remove("active");

    steps[0].classList.add("active");
    steps[1].classList.remove("active");
  });

  to_second_button.addEventListener("click",()=>{
    if(forms[0].classList.contains("passing"))forms[0].classList.add("passed");
    forms[1].classList.remove("passed");
    forms[0].classList.remove("active");
    forms[1].classList.add("active");

    steps[0].classList.remove("active");
    steps[1].classList.add("active");
  });

  submit.addEventListener("click",()=>{
    forms[1].classList.add("passed");
    forms[1].classList.remove("active");

    messagebox.innerHTML="Building a document in database...";
    body.appendChild(curtain);
    let newId = Math.random().toString(36).substr(2, 9);

    let json ={
      "id" : newId,
      "title" : name_input.value,
      "privacy" : privacy_select.value,
      "row" : ["row1","row2"],
      "datatype" : {
        "row1" : "text",
        "row2" : "text",
      },
      "items" : [
        {
          "row1" :"",
          "row2" :""
        },
        {
          "row1" : "",
          "row2" :""
        }
      ]
    };

    firestore.collection('doc').doc(newId).set(json).then((){
        messagebox.innerHTML = "Ready!";
        setTimeout(()=>{window.location.href=`https://2ood.github.io/compare-and-choose/index.html?id=${newId}`},1000);
    });
  });

  steps[0].addEventListener("click",()=>{
    to_first_button.click();
  });

  steps[1].addEventListener("click",()=>{to_second_button.click();});

  name_input.addEventListener("input",(evt)=>{
    const src = evt.srcElement;
    if(src.value=="") {
      changeValidatorStatus(name_validator,"error","Title can't be empty.");
      changeFormStatus(src.parentNode,"stopped");
      return ;
    }
    changeValidatorStatus(name_validator,"searching","searching...");

    firestore.collection('doc').where("title","==",src.value).get().then(function(querySnapshot){
      if(querySnapshot.size == 0) {
        changeValidatorStatus(name_validator,"passing","what a good title!");
        changeFormStatus(src.parentNode,"passing");
        return;
      }
      else querySnapshot.forEach((docRef)=>{
        if(docRef.exists) {
          changeValidatorStatus(name_validator,"error","There exists a document with the same title.");
          changeFormStatus(src.parentNode,"stopped");
          return ;
        }
      });
    });
  });

  privacy_select.addEventListener("change",(evt)=>{
    const src = evt.srcElement;
  changeFormStatus(src.parentNode,"passing");
  });
});
