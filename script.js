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
