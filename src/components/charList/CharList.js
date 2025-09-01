import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';

const CharList = (props) => {
    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isAllCharactersLoaded, setIsAllCharactersLoaded] = useState(false);
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);
    const { getCharacters, loading, error, clearError } = useMarvelService();

    useEffect(() => {
        getNewCharacters();
    }, [])

    const getNewCharacters = () => {
        clearError();
        getCharacters(offset)
            .then(onCharactersLoaded);
    }

    const onCharactersLoaded = (newCharacters) => {
        const newIsAllCharactersLoadedValue = newCharacters.length !== 9;
        setCharacters((characters) => [...characters, ...newCharacters]);
        setOffset(offset => offset + 9);
        setIsAllCharactersLoaded(newIsAllCharactersLoadedValue);
    }

    const isNewCharactersLoadingUnavailable = () => {
        return loading || error
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

    const onCharacterSelect = (character) => {
        setSelectedCharacterId(character.id);
        props.onCharacterSelect(character);
    }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {getCharactersItemsElements()}
            </ul>
            <button className="button button__main button__long"
                onClick={getNewCharacters}
                disabled={isNewCharactersLoadingUnavailable()}
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