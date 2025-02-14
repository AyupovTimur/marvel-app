import ComicsList from "../components/comicsList/ComicsList";
import AppBanner from "../components/appBanner/AppBanner";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <title>Comics page</title>
        <meta name="description" content="Marvel comics page" />
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
