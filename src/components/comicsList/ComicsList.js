import "./comicsList.scss";
import useMarvelServices from "../../services/useMarvelServices";
import { useEffect, useState } from "react";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(1);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelServices();

  const getComics = (offset, initial) => {
    initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
    getAllComics(offset).then(setAllComics);
  };

  useEffect(() => {
    getComics(offset, true);
  }, []);

  const setAllComics = (allComics) => {
    let ended = false;
    if (allComics.length < 8) {
      ended = true;
    }
    setComics((comics) => [...comics, ...allComics]);
    setNewComicsLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  };

  const comicsError = error ? <Error /> : null;
  const comicsLoading = loading && !newComicsLoading ? <Spinner /> : null;
  const comicsBooks = view(comics);

  return (
    <div className="comics__list">
      <div className="user__notification">
        {comicsError}
        {comicsLoading}
      </div>
      {comicsBooks}
      <button
        disabled={newComicsLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        onClick={() => getComics(offset)}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const view = (comics) => {
  return (
    <ul className="comics__grid">
      {comics.map((comicBook) => {
        return (
          <li key={comicBook.id} className="comics__item">
            <Link to={`/comics/` + comicBook.id}>
              <img
                src={comicBook.img}
                alt="ultimate war"
                className="comics__item-img"
              />
              <div className="comics__item-name">{comicBook.title}</div>
              <div className="comics__item-price">
                {comicBook.price === 0
                  ? "Price not specified"
                  : comicBook.price + "$"}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ComicsList;
