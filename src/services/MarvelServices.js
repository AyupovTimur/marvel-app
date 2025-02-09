class MarvelServices {
  _apikey = "apikey=cd9fd6e16e4885ddf1c503121a14d782";

  getResource = async (url) => {
    const resource = await fetch(url);

    if (!resource.ok) {
      throw new Error(`Ошибка по запросу: ${url}, статус: ${resource.status}`);
    }

    return await resource.json();
  };

  getAllCharacters = async (offset = "1") => {
    const chars = await this.getResource(
      `https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&` +
        this._apikey
    );
    return chars.data.results.map(this._transformData);
  };

  getOneCharacter = async (id = "1009169") => {
    const item = await this.getResource(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?` +
        this._apikey
    );
    return this._transformData(item.data.results[0]);
  };

  _transformData = (item) => {
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
}

export default MarvelServices;
