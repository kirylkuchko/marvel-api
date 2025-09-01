import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const RandomChar = (props) => {
    const [character, setCharacter] = useState({});
    const { getCharacter, loading, error, clearError } = useMarvelService();

    useEffect(() => {
        getRandomCharacter();
    }, []);

    const getRandomCharacter = () => {
        clearError(); // If previous  request was also with error
        const randomCharacterId = Math.floor(Math.random() * (20 - 1) + 1);
        getCharacter(randomCharacterId).then(setCharacter);
    }

    const getCharacterView = () => {
        if (!loading && !error) {
            return <CharacterView {...character}></CharacterView>;
        }

        if (error) {
            return <ErrorMessage/>;
        }

        return <Spinner/>;
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