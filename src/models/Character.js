export default class Character {
    constructor(id, name, description, imgPath, imgExtension, comics, marvelUrl, wikiUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.img = imgPath + '.' + imgExtension;
        this.comics = comics;
        this.marvelUrl = marvelUrl;
        this.wikiUrl = wikiUrl;
    }
}