import Character from "../models/Character";
import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const _apiUrl = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const { request, loading, error, clearError } = useHttp();

    const getCharacters = async (offset = 0) => {
        return getCharactersFromResponse(await request(`${_apiUrl}characters?limit=9&offset=${offset}&${_apiKey}`));
    }

    const getCharacter = async (id) => {
        const response = await request(`${_apiUrl}characters/${id}?${_apiKey}`);
        return getCharacterFromResponse(response.data.results[0]);
    }

    const getCharactersFromResponse = (response) => {
        if (!response) {
            throw new Error(`Incorrect data from server on fetching characters data`);
        }

        const charactersData = [];

        for (let charcterData of response.data.results) {
            charactersData.push(getCharacterFromResponse(charcterData));
        }

        return charactersData;
    }

    const getCharacterFromResponse = (charcterData) => {
        if (!charcterData) {
            return undefined;
        }

        return new Character(charcterData.id, charcterData.name, charcterData.description, charcterData.thumbnail.path,
                charcterData.thumbnail.extension, charcterData.comics.items, charcterData.urls[0].url, charcterData.urls[1].url);
    }

    return {getCharacter, getCharacters, loading, error, clearError};
}

export default useMarvelService;