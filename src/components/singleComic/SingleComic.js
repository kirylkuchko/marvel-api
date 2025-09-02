import { Link } from 'react-router-dom';
import './singleComic.scss';

const SingleComic = (props) => {
    const {title, description, pageCount, img, language, price} = props?.comic;

    return (
        <div className="single-comic">
            <img src={img} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to comics</Link> {/*TODO: Take comics list from history, not from scratch*/}
        </div>
    )
}

export default SingleComic;