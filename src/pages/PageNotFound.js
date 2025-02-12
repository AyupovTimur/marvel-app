import pageNotFoundGif from "../resources/img/404.gif";

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
