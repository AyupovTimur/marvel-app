import "./charInfo.scss";
import { Component } from "react";
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char: null,
      loading: false,
      error: false,
    };
  }

  getCharById = new MarvelServices();

  getChar = () => {
    const { id } = this.props;
    if (!id) return;
    this.onCharLoading();
    this.getCharById.getOneCharacter(id).then(this.setChar).catch(this.onError);
  };

  componentDidMount() {
    this.getChar();
  }

  setChar = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getChar();
    }
  }

  render() {
    const { char, loading, error } = this.state;

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
  }
}

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
