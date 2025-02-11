import "./charList.scss";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newCharsLoading, setNewCharsLoading] = useState(false);
  const [offset, setOffset] = useState(10);
  const [charEnded, setCharEnded] = useState(false);

  const charCollection = useMemo(() => new MarvelServices(), []);

  const getChars = useCallback(
    (offset) => {
      charsLoading();
      charCollection
        .getAllCharacters(offset)
        .then(setCharsLoaded)
        .catch(onError);
    },
    [charCollection]
  );

  const charsLoading = () => {
    setNewCharsLoading(true);
  };

  const setCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }
    setChars((chars) => [...chars, ...newChars]);
    setLoading(false);
    setNewCharsLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  useEffect(() => {
    getChars();
  }, [getChars]);

  function returnCharsList(chars) {
    let imgStyle = { objectFit: "cover" };
    const items = chars.map((item) => {
      if (
        item.img ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      )
        imgStyle = { objectFit: "unset" };
      return (
        <li
          onClick={() => {
            props.getCharId(item.id);
            focusOnItem(item.id);
          }}
          key={item.id}
          className="char__item"
          ref={(el) => (itemRefs.current[item.id] = el)}
        >
          <img src={item.img} alt="abyss" style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  const items = returnCharsList(chars);

  const loadingSpinner = loading ? <Spinner /> : null;
  const errorComponent = error ? <Error /> : null;
  const content = !(loadingSpinner || errorComponent) ? items : null;

  return (
    <div className="char__list">
      <div className="user__notification">
        {loadingSpinner}
        {errorComponent}
        {content}
      </div>
      <button
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => getChars(offset)}
        disabled={newCharsLoading}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
