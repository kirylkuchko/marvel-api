export default class Comic {
    constructor(id, title, description, pageCount, imgPath, imgExtension, language, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.pageCount = pageCount;
        this.img = imgPath + '.' + imgExtension;
        this.language = language ?? 'en-us';
        this.price = price ?? 'not available';
    }
}