import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

class RandomChar extends Component {
    static IS_LOADING = 'loading';
    static IS_LOADED = 'loaded';
    static IS_ERROR = 'error';

    constructor (props) {
        super(props);
        this.state = {
            charData: {},
            loadCharacterState : RandomChar.IS_LOADING,
        }
        this.getRandomCharacter();
    }


    marvelService = new MarvelService();

    onCharLoaded = (charData) => {
        this.setState({charData, loadCharacterState: RandomChar.IS_LOADED});
    }
    
    onCharLoadingError = (error) => {
        console.error(error);
        this.setState({loadCharacterState: RandomChar.IS_ERROR});
    }

    getRandomCharacter = () => {
        const randomCharacterId = Math.floor(Math.random() * (20 - 1) + 1);
        this.marvelService.getCharacter(randomCharacterId)
            .then(this.onCharLoaded)
            .catch((e) => this.onCharLoadingError(e));
    }

    render() {
        const { loadCharacterState, charData } = this.state;
        let characterView;

        switch(loadCharacterState) {
            case RandomChar.IS_LOADING:
                characterView = <Spinner/>
                break;
            case RandomChar.IS_LOADED:
                characterView =<CharacterView {...charData}></CharacterView>
                break;
            case RandomChar.IS_ERROR:
                characterView = <ErrorMessage/>
                break;
            default:
                characterView = <Spinner/>
                break;
        }

        return (
            <div className="randomchar">
                {characterView}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }  
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