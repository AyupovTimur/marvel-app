import "./charList.scss";
import { useState, useEffect, useRef } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import useMarvelServices from "../../services/useMarvelServices";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newCharsLoading, setNewCharsLoading] = useState(false);
  const [offset, setOffset] = useState(10);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelServices();

  const getChars = (offset, initial) => {
    initial ? setNewCharsLoading(false) : setNewCharsLoading(true);
    getAllCharacters(offset).then(setCharsLoaded);
  };

  const setCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }
    setChars((chars) => [...chars, ...newChars]);
    setNewCharsLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
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
    getChars(offset, true);
  }, []);

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

  const loadingSpinner = loading && !newCharsLoading ? <Spinner /> : null;
  const errorComponent = error ? <Error /> : null;

  return (
    <div className="char__list">
      {items}
      <div className="user__notification">
        {loadingSpinner}
        {errorComponent}
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
