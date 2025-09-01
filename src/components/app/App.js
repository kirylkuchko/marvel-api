import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const App = (props) => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelect = (selectedCharacter) => {
        setSelectedCharacter(selectedCharacter);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
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
            </main>
        </div>
    )
}

export default App;