import { node } from "prop-types";
import "../scss/style.scss";
import User from "./user.js";
import Profile from "./componets/Profile";
import CreateParty from "./componets/CreateParty";
import Chart from "./componets/Chart";
// Single Page Aplication

const pages = [
  { path: "#/page1", template: Chart },
  { path: "#/page2", template: CreateParty },
  { path: "#/page3", template: Profile },
];
const appEl = document.querySelector("#app");

const render = () => {
  const page = pages.find((page) => page.path === location.hash);
  appEl.innerHTML = page ? page.template : Chart;
};

window.addEventListener("popstate", render);

render();

// Login Code
const loginForm = $("#loginForm");
const createAccount = $("#createAccountForm");
let users = new Map();

// Loading data from JSON file
$.getJSON("http://localhost:8070/data/user.json", (data) => {
      users = data;
      console.log(users);
    });
// Checking user's credentials
loginForm.submit((e) => {
    e.preventDefault();
    users.forEach((user) => {
    if (
      user.email == $(".input").eq(0).val() &&
      user.password == $(".input").eq(1).val()
    ) {
      $("#loginPage").hide();
      $("#mainPage").show();
    }
  });
});

createAccount.submit((e) => {
    e.preventDefault();
    let name = $(".input").eq(0).val();
    let password = $(".input").eq(1).val();
    let password2 = $(".input").eq(2).val();

    let newUser = new User(name,password,password2)
    users.set(newUser);
    $("#mainPage").show();
})

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

