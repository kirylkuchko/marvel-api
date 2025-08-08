import Character from "../models/Character";

export default class MarvelService {
    _apiUrl = 'https://marvel-server-zeta.vercel.app/';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getCharacters = async () => {
        return this.#getCharactersDataFromResponse(await this.getResource(`${this._apiUrl}characters?limit=9&${this._apiKey}`));
    }

    getCharacter = async (id) => {
        const response = await this.getResource(`${this._apiUrl}characters/${id}?${this._apiKey}`);
        return this.#getCharacterDataFromResponse(response.data.results[0]);
    }

    #getCharactersDataFromResponse = (response) => {
        if (!response) {
            throw new Error(`Incorrect data from server on fetching characters data`);
        }

        const charactersData = [];

        for (let charcterData of response.data.results) {
            charactersData.push(this.#getCharacterDataFromResponse(charcterData));
        }

        return charactersData;
    }

    #getCharacterDataFromResponse = (charcterData) => {
        if (!charcterData) {
            return undefined;
        }

        return new Character(charcterData.id, charcterData.name, charcterData.description, charcterData.thumbnail.path,
                charcterData.thumbnail.extension, charcterData.comics.items, charcterData.urls[0].url, charcterData.urls[1].url);
    }
}