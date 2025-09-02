import './comicsList.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const ComicsList = (props) => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isAllComicsLoaded, setIsAllComicsLoaded] = useState(false);
    const { getComics, loading, error, clearError } = useMarvelService();

    useEffect(() => {
        getNewComics();
    }, [])

    const getNewComics = () => {
        clearError();
        getComics(offset)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (newComics) => {
        const newIsAllCharactersLoadedValue = newComics.length !== 8;
        setComics((comics) => [...comics, ...newComics]);
        setOffset(offset => offset + 8);
        setIsAllComicsLoaded(newIsAllCharactersLoadedValue);
    }

    const isNewComicsLoadingUnavailable = () => {
        return loading || error;
    }

    const getComicsView = () => {
        if (loading && comics.length < 8) {
            return <Spinner/>;
        }

        if (error) {
            return <ErrorMessage/>;
        }

        return (
            <ul className="comics__grid">
                { comics.map((comic) => <ComicItem key={comic.id} id={comic.id} title={comic.title} img={comic.img} price={comic.price}/>) }
            </ul>
        );
    }

    return (
        <div className="comics__list">
            {getComicsView()}   
            <button className="button button__main button__long"
                onClick={getNewComics}
                disabled={isNewComicsLoadingUnavailable()}
                style={{display: isAllComicsLoaded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;

const ComicItem = (props) => {
    const { id, title, img, price } = props;

    return (
        <li className="comics__item">
            <Link to={`/comics/${id}`}>
                <img src={img} alt={title} className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}$</div>
            </Link>
        </li>
    )
}