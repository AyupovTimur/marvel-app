import PropTypes from "prop-types";
import { MainPage, ComicsPage, SingleComicPage } from "../../pages/index";
import { Route, Routes } from "react-router";
import AppHeader from "../appHeader/AppHeader";
import PageNotFound from "../../pages/PageNotFound";

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="comics/" element={<ComicsPage />} />
          <Route path="comics/:comicId" element={<SingleComicPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
};

App.propTypes = {
  charId: PropTypes.func,
};

export default App;
