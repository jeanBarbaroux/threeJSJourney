import Sizes from "./utils/Size"

export default class Experience {
    constructor(canvas) {
        //permet d’acceder à la classe depuis la console, pas hyper utile a priori ?
        window.experience = this

        this.__canvas = canvas
        this.sizes = new Sizes()
    }
}