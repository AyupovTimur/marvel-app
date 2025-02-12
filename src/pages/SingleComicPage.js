import "./singleComicPage.scss";
import useMarvelServices from "../services/useMarvelServices";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Error from "../components/error/Error";
import Spinner from "../components/spinner/Spinner";

const SingleComicPage = () => {
  const [comicBook, setComicBook] = useState({});

  const { error, loading, getOneComicBook, clearError } = useMarvelServices();
  const { comicId } = useParams();

  const getComicBook = (comicId) => {
    getOneComicBook(comicId).then(setStateComicBook);
  };

  useEffect(() => {
    clearError();
    getComicBook(comicId);
  }, [comicId]);

  const setStateComicBook = (comicBook) => {
    setComicBook(comicBook);
  };

  const comicError = error ? <Error /> : null;
  const comicLanguage = loading ? <Spinner /> : null;
  const content = !(error || loading) ? <View comicBook={comicBook} /> : null;

  return (
    <>
      <div className="single-comic">{content}</div>
      <div className="user__notification">
        {comicError}
        {comicLanguage}
      </div>
    </>
  );
};

const View = ({ comicBook }) => {
  const { title, description, pageCount, language, price, img, textObjects } =
    comicBook;
  return (
    <>
      <img src={img} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">
          {description ? description : textObjects}
        </p>
        <p className="single-comic__descr">
          {pageCount === 0
            ? "Information on the number of pages needs to be confirmed"
            : pageCount}{" "}
          pages
        </p>
        <p className="single-comic__descr">
          Language: {language ? language : "en-us"}
        </p>
        <div className="single-comic__price">
          {price ? price + "$" : "Price not specified"}
        </div>
      </div>
      <Link to="/comics/" className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};

export default SingleComicPage;
