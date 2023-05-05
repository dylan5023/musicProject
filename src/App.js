import React from "react";
// import "./scss/style.scss";
import LoginPage from "./components/Login";
import MainPage from "./components/Main";
import { Page1 } from "./components/Page1";
import { Page2 } from "./components/Page2";
import { Page3 } from "./components/Page3";

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
      setCurrentPage(page ? page.template : <Page1 />);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <LoginPage />
      <MainPage currentPage={currentPage}/>
    </>
  );
};

export default App;
