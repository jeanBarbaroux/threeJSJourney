import Sizes from "./utils/Size"
import Time from "./utils/Time"
import * as THREE from 'three'

export default class Experience {
    constructor(canvas) {
        //permet d’acceder à la classe depuis la console, pas hyper utile a priori ?
        window.experience = this

        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()

        //sizes resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        //time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {}

    update() {}
}