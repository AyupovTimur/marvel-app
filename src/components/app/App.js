import PropTypes from "prop-types";
import { Route, Routes } from "react-router";
import AppHeader from "../appHeader/AppHeader";
import { lazy } from "react";

const MainPage = lazy(() => import("../../pages/MainPage"));
const ComicsPage = lazy(() => import("../../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../../pages/SingleComicPage"));
const PageNotFound = lazy(() => import("../../pages/PageNotFound"));

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
