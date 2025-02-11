import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import PropTypes from "prop-types";

const App = () => {
  const [charId, setCharId] = useState(null);

  const getCharId = (id) => {
    setCharId(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList getCharId={getCharId} />
          <ErrorBoundary>
            <CharInfo id={charId} />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

App.propTypes = {
  charId: PropTypes.func,
};

export default App;
