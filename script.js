const steps = document.querySelectorAll("step");
const forms = document.getElementsByTagName("form");

const to_second_button =document.getElementById("to-second");
const to_first_button =document.getElementById("to-first");
const submit_button =document.getElementById("submit");

to_first_button.addEventListener("click",()=>{
  forms[0].classList.remove("passed");
  forms[0].classList.add("active");
  forms[1].classList.remove("active");

  steps[0].classList.add("active");
  steps[1].classList.remove("active");
});
to_second_button.addEventListener("click",()=>{
  forms[0].classList.add("passed");
  forms[0].classList.remove("active");
  forms[1].classList.add("active");

  steps[0].classList.remove("active");
  steps[1].classList.add("active");
});

submit.addEventListener("click",()=>{
  forms[1].classList.add("passed");
});

steps[0].addEventListener("click",()=>{to_first_button.click();});
steps[1].addEventListener("click",()=>{to_second_button.click();});

const name_input = document.getElementById("name");
name_input.addEventListener("input",(evt)=>{
  const src = evt.srcElement;
  if(src.value=="") {
    src.parentNode.classList.remove("passing");
    return ;
  }

  if(true) { //check if there's dubplicate name in db.
    src.parentNode.classList.add("passing");
  }
});

const privacy_select = document.getElementById("privacy-setting");
privacy_select.addEventListener("change",(evt)=>{
  const src = evt.srcElement;
  if(true) { //check if all steps are passing.
    src.parentNode.classList.add("passing");
  }
},false);
