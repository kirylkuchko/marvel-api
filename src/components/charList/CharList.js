import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';

const CharList = (props) => {
    const [characters, setCharacters] = useState([]);
    const [isCharactersLoading, setIsCharactersLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isAllCharactersLoaded, setIsAllCharactersLoaded] = useState(false);
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);

    const marvelService = new MarvelService();

    useEffect(() => {
        getCharacters();
    }, [])


    const getCharacters = () => {
        marvelService.getCharacters(offset)
            .then(onCharactersLoaded)
    }

    const onCharactersLoaded = (newCharacters) => {
        const newIsAllCharactersLoadedValue = newCharacters.length !== 9;
        setCharacters((characters) => [...characters, ...newCharacters]);
        setIsCharactersLoading(false);
        setOffset(offset => offset + 9);
        setIsAllCharactersLoaded(newIsAllCharactersLoadedValue);
    }

    const onCharacterSelect = (character) => {
        setSelectedCharacterId(character.id);
        props.onCharacterSelect(character);
    }

    const getCharactersItemsElements = () => {
        return characters.map((character) => {
            return <CharItem 
                key={character.id} 
                name={character.name} 
                img={character.img} 
                onCharacterSelect={() => {onCharacterSelect(character)}}
                isSelected={selectedCharacterId === character.id}/>
        });
    }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {getCharactersItemsElements()}
            </ul>
            <button className="button button__main button__long"
                onClick={getCharacters}
                disabled={isCharactersLoading}
                style={{display: isAllCharactersLoaded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;

const CharItem = (props) => {
    const { name, img, onCharacterSelect, isSelected } = props;
    const className = 'char__item' + (isSelected ? ' selected' : '');

    return (
        <li className={className} onClick={onCharacterSelect}>
            <img src={img} alt={name}/>
            <div className="char__name">{name}</div>
        </li> 
    )
}