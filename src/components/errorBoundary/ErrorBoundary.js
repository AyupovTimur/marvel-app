import { Component } from "react";
import imgError from "../error/errorImg.gif";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true,
    });
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="char__info"
        >
          <h2 style={{ marginBottom: "20px" }}>Oops! Something went wrong</h2>
          <img
            style={{
              display: "block",
              objectFit: "contain",
              margin: "0 auto",
            }}
            src={imgError}
            alt="errorImg"
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
