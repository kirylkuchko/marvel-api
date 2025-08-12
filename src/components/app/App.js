import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import Skeleton from "../skeleton/Skeleton";
import { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCharacter: null
        }
    }

    onCharacterSelect = (selectedCharacter) => {
        this.setState({selectedCharacter});
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary errorMessage={'Failed to load the character'}>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary errorMessage={'Failed to load the characters'}>
                            <CharList onCharacterSelect={this.onCharacterSelect}/>
                        </ErrorBoundary>
                        {this.state.selectedCharacter ? 
                            <CharInfo character={this.state.selectedCharacter}/> :
                            <Skeleton></Skeleton>}
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}