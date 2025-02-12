import PropTypes from "prop-types";
import { MainPage, ComicsPage } from "../../pages/index";
import { Route, Routes } from "react-router";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/comics" element={<ComicsPage />} />
        </Routes>
      </main>
    </div>
  );
};

App.propTypes = {
  charId: PropTypes.func,
};

export default App;
