import { useState } from "react";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import decoration from "../resources/img/vision.png";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const MainPage = () => {
  const [charId, setCharId] = useState(null);

  const getCharId = (id) => {
    setCharId(id);
  };

  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList getCharId={getCharId} />
        <ErrorBoundary>
          <CharInfo id={charId} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
