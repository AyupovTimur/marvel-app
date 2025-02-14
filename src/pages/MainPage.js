import { useState } from "react";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import decoration from "../resources/img/vision.png";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";

const MainPage = () => {
  const [charId, setCharId] = useState(null);

  const getCharId = (id) => {
    setCharId(id);
  };

  return (
    <>
      <Helmet>
        <title>Marvel's character page</title>
        <meta
          name="description"
          content="The page contains information about Marvel's characters"
        />
      </Helmet>
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
