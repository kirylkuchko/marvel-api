import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';

class CharList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            characters: [],
            isCharactersLoading: true,
            offset: 0,
            isAllCharactersLoaded: false
        }
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharacters();
    }

    getCharacters = () => {
        this.marvelService.getCharacters(this.state.offset)
            .then(this.onCharactersLoaded)
    }

    onCharactersLoaded = (newCharacters) => {
        const newIsAllCharactersLoadedValue = newCharacters.length !== 9;
        this.setState(({characters, offset}) => ({
            characters: [...characters, ...newCharacters],
            isCharactersLoading: false,
            offset: offset + 9,
            isAllCharactersLoaded: newIsAllCharactersLoadedValue
        }));
    }

    getCharactersItemsElements = () => {
        return this.state.characters.map((character) => {
            return <CharItem 
                key={character.id} 
                name={character.name} 
                img={character.img} 
                onCharacterSelect={() => {this.props.onCharacterSelect(character)}}/>
        });
    }

    render () {
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.getCharactersItemsElements()}
                </ul>
                <button className="button button__main button__long"
                    onClick={this.getCharacters}
                    disabled={this.state.isCharactersLoading}
                    style={{display: this.state.isAllCharactersLoaded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;

const CharItem = (props) => {
    const { name, img, onCharacterSelect } = props;

    return (
        <li className="char__item" onClick={onCharacterSelect}>
            <img src={img} alt={name}/>
            <div className="char__name">{name}</div>
        </li> 
    )
}