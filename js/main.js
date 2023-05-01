import "../scss/style.scss";

// Single Page Aplication

const page1 = /* html */ `
    <section class = "page1">
        <h1> Home</h1>
    </section>`;
const page2 = /* html */ `
    <section class = "page2">
        <h1> Create a Party</h1>
    </section>`;
const page3 = /* html */ `
    <section class = "page3">
        <h1> Profile</h1>
    </section>`;

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
