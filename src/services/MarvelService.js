import Character from "../models/Character";
import { useHttp } from "../hooks/http.hook";
import Comic from "../models/Comic";

const useMarvelService = () => {
    const _apiUrl = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const { request, loading, error, clearError } = useHttp();

    const getCharacters = async (offset = 0, limit = 9) => {
        const response = await request(`${_apiUrl}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return getCharactersFromData(response.data.results);
    }

    const getCharacter = async (id) => {
        const response = await request(`${_apiUrl}characters/${id}?${_apiKey}`);
        return getCharacterFromData(response.data.results[0]);
    }

    const getCharactersFromData = (charctersData) => {
        const characters = [];

        for (let charcterData of charctersData) {
            characters.push(getCharacterFromData(charcterData));
        }

        return characters;
    }

    const getCharacterFromData = (charcterData) => {
        if (!charcterData) {
            return undefined;
        }

        return new Character(charcterData.id, charcterData.name, charcterData.description, charcterData.thumbnail.path,
                charcterData.thumbnail.extension, charcterData.comics.items, charcterData.urls[0].url, charcterData.urls[1].url);
    }

    const getComics = async (offset = 0, limit = 8) => {
		const response = await request(`${_apiUrl}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_apiKey}`);
		return getComicsFromData(response.data.results);
	};

	const getComic = async (id) => {
		const response = await request(`${_apiUrl}comics/${id}?${_apiKey}`);
		return getComicFromData(response.data.results[0]);
	};

    const getComicsFromData = (comicsData) => {
        const comics = [];

        for (let comicData of comicsData) {
            comics.push(getComicFromData(comicData));
        }

        return comics;
    }

    const getComicFromData = (comicData) => {
        if (!comicData) {
            return undefined;
        }

        return new Comic(comicData.id, comicData.title, comicData.description, comicData.pageCount, comicData.thumbnail.path,
                comicData.thumbnail.extension, comicData.textObjects[0]?.language, comicData.prices[0].price);
    }

    return { getCharacters, getCharacter, getComics, getComic, loading, error, clearError };
}

export default useMarvelService;