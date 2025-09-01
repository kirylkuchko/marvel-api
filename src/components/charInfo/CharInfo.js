import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const CharInfo = (props) => {
    const getCharInfoView = () => {
        if (!props.character) {
            return <Skeleton/>
        }

        const {name, img, description, marvelUrl, wikiUrl, comics} = props.character;
        return (
            <>
                <div className="char__basics">
                <img src={img} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={marvelUrl} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wikiUrl} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                {getComicsList(comics)}
            </>
        );
    }

    const getComicsList = (comics) => {
        if (!comics) {
            return;
        }

        return (
            <ul className="char__comics-list">
                {comics.map((comics) => (
                    <li key={comics} className="char__comics-item">
                        {comics}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="char__info">
            {getCharInfoView()}
        </div>
    )
}

export default CharInfo;