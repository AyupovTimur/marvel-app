import { useHttp } from "../hooks/useHttp/useHttp";

const useMarvelServices = () => {
  const { loading, error, request, clearError } = useHttp();

  const _apikey = "apikey=cd9fd6e16e4885ddf1c503121a14d782";

  const getAllCharacters = async (offset = "1") => {
    const chars = await request(
      `https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&` +
        _apikey
    );
    return chars.data.results.map(_transformData);
  };

  const getOneCharacter = async (id = "1009169") => {
    const item = await request(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?` + _apikey
    );
    return _transformData(item.data.results[0]);
  };

  const _transformData = (item) => {
    return {
      id: item.id,
      name: item.name,
      description:
        item.description.length > 200
          ? item.description.slice(0, 200) + "..."
          : item.description,
      img: item.thumbnail.path + "." + item.thumbnail.extension,
      homepage: item.urls[0].url,
      wiki: item.urls[1].url,
      comics: item.comics.items,
    };
  };

  return { loading, error, getAllCharacters, getOneCharacter, clearError };
};

export default useMarvelServices;
