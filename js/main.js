import "../scss/style.scss";

// Single Page Aplication

const page1 = /* html */ `
    <article class = "page1">
        <h1> Page 1</h1>
    </article>`;
const page2 = /* html */ `
    <article class = "page2">
        <h1> Page 2</h1>
    </article>`;
const page3 = /* html */ `
    <article class = "page3">
        <h1> Page 3</h1>
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
// const loginPage = $("#loginPage");
// const createAccount = $("#createAccountForm");
// const forgotBtn = $(".link forgot");
// const noAccBtn = $(".link noaccount");
// console.log(createAccount);

