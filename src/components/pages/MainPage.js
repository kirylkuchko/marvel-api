import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import decoration from '../../resources/img/vision.png';
import { useState } from "react";


const MainPage = (props) => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelect = (selectedCharacter) => {
        setSelectedCharacter(selectedCharacter);
    }

    return (
        <>
            <ErrorBoundary errorMessage={'Failed to load the character'}>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary errorMessage={'Failed to load the characters'}>
                    <CharList onCharacterSelect={onCharacterSelect}/>
                </ErrorBoundary>
                <CharInfo character={selectedCharacter}/>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;