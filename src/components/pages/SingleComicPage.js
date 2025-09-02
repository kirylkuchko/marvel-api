import { useParams } from "react-router-dom";
import SingleComic from "../singleComic/SingleComic";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const SingleComicPage = (props) => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const getComicView = () => {
        if (loading || !comic) {
            return <Spinner/>;
        }

        if (error) {
            return <ErrorMessage/>
        }

        return <SingleComic comic={comic}/>
    }

    return (
        <>
            {getComicView()}
        </>
    )
}

export default SingleComicPage;