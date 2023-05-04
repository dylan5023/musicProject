import "../scss/style.scss";
import User from "./user.js";

// Single Page Aplication

const page1 = /* html */ `
    <article class = "page1">
        <h1> Home</h1>
    </article>`;
const page2 = /* html */ `
    <article class = "page2">
        <h1> Create a Party</h1>
    </article>`;
const page3 = /* html */ `
    <article class = "page3">
        <h1> Profile</h1>
    </article>`;

const pages = [
  { path: "#/page1", template: page1 },
  { path: "#/page2", template: page2 },
  { path: "#/page3", template: page3 },
];
const appEl = document.querySelector("#app");

const render = () => {
  const page = pages.find((page) => page.path === location.hash);
  appEl.innerHTML = page ? page.template : page1;
};

window.addEventListener("popstate", render);

render();

// Login Code
const loginForm = $("#loginForm");
const createAccount = $("#createAccountForm");
let users = null;

// Loading data from JSON file
$.getJSON("http://localhost:8081/data/user.json",(data)=>{
    users = data;
    console.log(users);
});
// Checking user's credentials
loginForm.submit((e) => {
    e.preventDefault();
    users.forEach((user) => {
        if(user.email == $(".input").eq(0).val() && user.password == $(".input").eq(1).val()){
            $("#loginPage").hide();
            $("#mainPage").show();
        }
    })
});
// Hide login and display create account form
$(".noaccount").click((e) => {
    e.preventDefault();
    loginForm.hide();
    createAccount.show();
});
// Hide create account and display login form
$(".account").click((e) => {
    e.preventDefault();
    createAccount.hide();
    loginForm.show();
});

function setFormMessage(formSelector, type, message) {
    const messageElement = document.querySelector(`${formSelector} .form-message`);

    messageElement.textContent = message;
    messageElement.classList.add(`form-message-${type}`);
    messageElement.classList.remove("form-message-success", "form-message-error");
}

loginForm.submit((e) => {
    e.preventDefault();
    setFormMessage("#loginForm","error","Invalid email/password combination");
})
    