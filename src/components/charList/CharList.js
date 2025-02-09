import "./charList.scss";
import { Component } from "react";
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: [],
      loading: true,
      error: false,
      newCharsLoading: false,
      offset: 10,
      charEnded: false,
    };
  }

  charCollection = new MarvelServices();

  componentDidMount() {
    this.getChars();
  }

  getChars = (offset) => {
    this.charsLoading();
    this.charCollection
      .getAllCharacters(offset)
      .then(this.setChars)
      .catch(this.onError);
  };

  charsLoading = () => {
    this.setState({
      newCharsLoading: true,
    });
  };

  setChars = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }
    this.setState(({ offset }) => ({
      chars: [...newChars],
      loading: false,
      newCharsLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  returnCharsList = (chars) => {
    let imgStyle = { objectFit: "cover" };
    return chars.map((item) => {
      if (
        item.img ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      )
        imgStyle = { objectFit: "unset" };
      return (
        <li
          onClick={() => this.props.getCharId(item.id)}
          key={item.id}
          className="char__item"
        >
          <img src={item.img} alt="abyss" style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
  };

  render() {
    const { chars, loading, error, newCharsLoading, offset, charEnded } =
      this.state;

    const items = this.returnCharsList(chars);

    const loadingSpinner = loading ? <Spinner /> : null;
    const errorComponent = error ? <Error /> : null;
    const content = !(loadingSpinner || errorComponent) ? items : null;
    return (
      <div className="char__list">
        <ul className="char__grid">{content}</ul>
        <div className="user__notification">
          {loadingSpinner}
          {errorComponent}
        </div>
        <button
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.getChars(offset)}
          disabled={newCharsLoading}
          className="button button__main button__long"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
