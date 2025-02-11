import "./charInfo.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCharById = useMemo(() => new MarvelServices(), []);

  const getChar = useCallback(() => {
    const { id } = props;
    if (!id) return;
    onCharLoading();
    getCharById.getOneCharacter(id).then(setCharLoaded).catch(onError);
  }, [getCharById, props]);

  useEffect(() => {
    getChar();
  }, [getChar]);

  const setCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const charLoadind = loading ? <Spinner /> : null;
  const charError = error ? <Error /> : null;
  const skeleton = char || loading || error ? null : <Skeleton />;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {charLoadind}
      {charError}
      {skeleton}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, img, homepage, wiki, comics } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    img ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  )
    imgStyle = { objectFit: "unset" };

  return (
    <>
      <div className="char__basics">
        <img src={img} alt="abyss" style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description === undefined || description.length === 0
          ? "Description not found"
          : description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0
          ? "Comics not Found"
          : comics.map((item, i) => {
              if (i > 9) return;
              return (
                <li key={i} className="char__comics-item">
                  {item.name}
                </li>
              );
            })}
      </ul>
    </>
  );
};

export default CharInfo;
