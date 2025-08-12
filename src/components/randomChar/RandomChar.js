import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import ComponentAsynState from '../ComponentAsynState';

const RandomChar = (props) => {
    const [character, setCharacter] = useState({});
    const [loadCharacterState, setLoadCharacterState] = useState(ComponentAsynState.IS_LOADING);

    const marvelService = new MarvelService();

    useEffect(() => {
        getRandomCharacter();
    }, []);

    const onCharLoaded = (character) => {
        setCharacter(character);
        setLoadCharacterState(ComponentAsynState.IS_LOADED);
    }
    
    const onCharLoadingError = (error) => {
        console.error(error);
        setLoadCharacterState(ComponentAsynState.IS_ERROR);
    }

    const getRandomCharacter = () => {
        setLoadCharacterState(ComponentAsynState.IS_LOADING);
        const randomCharacterId = Math.floor(Math.random() * (20 - 1) + 1);
        marvelService.getCharacter(randomCharacterId)
            .then(onCharLoaded)
            .catch((e) => onCharLoadingError(e));
    }

    const getCharacterView = () => {
        let characterView;
        switch(loadCharacterState) {
            case ComponentAsynState.IS_LOADING:
                characterView = <Spinner/>
                break;
            case ComponentAsynState.IS_LOADED:
                characterView =<CharacterView {...character}></CharacterView>
                break;
            case ComponentAsynState.IS_ERROR:
                characterView = <ErrorMessage/>
                break;
            default:
                characterView = <Spinner/>
                break;
        }

        return characterView;
    }


    return (
        <div className="randomchar">
            {getCharacterView()}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={getRandomCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;

const CharacterView = (props) => {
    const { name, img, description, marvelUrl, wikiUrl} = props;

    return (
        <div className="randomchar__block">
            <img src={img} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={marvelUrl} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wikiUrl} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}