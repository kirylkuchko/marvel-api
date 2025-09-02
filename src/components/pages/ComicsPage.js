import { useState } from "react";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = (props) => {
    const [selectedComic, setSelectedComic] = useState(null);

    const onComicSelect = (selectedComic) => {
        setSelectedComic(selectedComic);
    }

    return (
        <>
            <ComicsList onComicSelect={onComicSelect}/>
        </>
    )
}

export default ComicsPage;