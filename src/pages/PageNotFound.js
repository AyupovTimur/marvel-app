import pageNotFoundGif from "../resources/img/404.gif";
import { Helmet } from "react-helmet";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      className="comics__list"
    >
      <Helmet>
        <title>Page not found</title>
        <meta
          name="description"
          content="Page displaying a link path that does not exist"
        />
      </Helmet>
      <h2 style={{ fontSize: "30px", color: "#9F0013", marginBottom: "20px" }}>
        Oops! This page doesn't exist
      </h2>
      <img
        style={{ width: "600px" }}
        src={pageNotFoundGif}
        alt="page not found"
      />
    </div>
  );
};

export default PageNotFound;
