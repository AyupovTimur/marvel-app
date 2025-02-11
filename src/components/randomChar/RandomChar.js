import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import useMarvelServices from "../../services/useMarvelServices";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { loading, error, getOneCharacter, clearError } = useMarvelServices();

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getOneCharacter(id).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  useEffect(() => {
    updateChar();
  }, []);

  const errorContent = error ? <Error /> : null;
  const loadingSpinner = loading ? <Spinner /> : null;
  const content = !(errorContent || loadingSpinner) ? (
    <View char={char} />
  ) : null;

  return (
    <div className="randomchar">
      {errorContent}
      {loadingSpinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={() => updateChar()} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, img, homepage, wiki } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    img ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  )
    imgStyle = { objectFit: "unset" };

  return (
    <div className="randomchar__block">
      <img
        src={img}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description === undefined || description.length === 0
            ? "Description not found"
            : description}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">Homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
