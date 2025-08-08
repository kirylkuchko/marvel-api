import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';

class CharList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            characters: []
        }
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharacters();
    }

    getCharacters = () => {
        this.marvelService.getCharacters()
            .then(this.onCharactersLoaded)
    }

    onCharactersLoaded = (characters) => {
        this.setState({characters});
    }

    getCharactersItemsElements = () => {
        return this.state.characters.map((character) => {
            return <CharItem key={character.id} name={character.name} img={character.img}/>
        });
    }

    render () {
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.getCharactersItemsElements()}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;

const CharItem = (props) => {
    const { name, img } = props;

    return (
        <li className="char__item">
            <img src={img} alt={name}/>
            <div className="char__name">{name}</div>
        </li> 
    )
}