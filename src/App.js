import React from "react";
import "./scss/style.scss";
import LoginPage from "./components/Login";

const Page1 = () => {
  return <h2>Home Page</h2>;
};

const Page2 = () => {
  return <h2>Create Playlist Page</h2>;
};

const Page3 = () => {
  return <h2>Profile Page</h2>;
};

const Chart = () => {
  return <h2>Chart Page</h2>;
};

const pages = [
  {
    path: "#/page1",
    template: <Page1 />,
  },
  {
    path: "#/page2",
    template: <Page2 />,
  },
  {
    path: "#/page3",
    template: <Page3 />,
  },
];

const App = () => {
  const [currentPage, setCurrentPage] = React.useState(pages[0].template);

  React.useEffect(() => {
    const handleHashChange = () => {
      const page = pages.find((page) => page.path === window.location.hash);
      setCurrentPage(page ? page.template : <Chart />);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <LoginPage />
      <div id="mainPage">
        <main>
          <header>
            <a href="#/" className="btnLeft">
              Help
            </a>
            <aside>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </aside>
            <article className="btnRight">
              <a href="#/page1" className="home">
                Home
              </a>
              <a href="#/page3" className="profile">
                Profile
              </a>
            </article>
          </header>
          <div id="app">{currentPage}</div>
          <footer>
            <a href="#/page2" className="btnBottom">
              Create Playlist
            </a>
          </footer>
        </main>
      </div>
    </>
  );
};

export default App;
