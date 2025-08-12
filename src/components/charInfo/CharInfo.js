import './charInfo.scss';

const CharInfo = (props) => {
    const {name, img, description, marvelUrl, wikiUrl, comics} = props.character;

    const getComicsItems = () => {
        if (!comics) {
            return;
        }

        return comics.map(comics => {
            return <ComicsItem comicsName={comics}/>
        })
    }

    return (
        <div className="char__info">
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
            <ul className="char__comics-list">
                {getComicsItems()}
            </ul>
        </div>
    )
}

export default CharInfo;

const ComicsItem = (props) => {
    return (
        <li className="char__comics-item">
            {props.comicsName}
        </li>
    )
}