import Camera from "./Camera"
import Renderer from "./Renderer"
import Sizes from "./utils/Size"
import Time from "./utils/Time"
import * as THREE from 'three'
import World from "./World/World"

let instance = null

export default class Experience {
    constructor(canvas) {
        if (instance)
            return instance

        instance = this

        //permet d’acceder à la classe depuis la console, pas hyper utile a priori ?
        window.experience = this

        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        //sizes resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        //time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }
}