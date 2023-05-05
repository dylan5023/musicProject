import React from "react";
// import "./scss/style.scss";
import LoginPage from "./components/Login";
import MainPage from "./components/Main";
import { Charts } from "./components/Charts";
import { CreateParty } from "./components/CreateParty";
import { Profile } from "./components/Profile";

const pages = [
  {
    path: "#/page1",
    template: <Charts />,
  },
  {
    path: "#/page2",
    template: <CreateParty />,
  },
  {
    path: "#/page3",
    template: <Profile />,
  },
];

const App = () => {
  const [currentPage, setCurrentPage] = React.useState(pages[0].template);

  React.useEffect(() => {
    const handleHashChange = () => {
      const page = pages.find((page) => page.path === window.location.hash);
      setCurrentPage(page ? page.template : <Charts />);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <LoginPage />
      <MainPage currentPage={currentPage} />
    </>
  );
};

export default App;
