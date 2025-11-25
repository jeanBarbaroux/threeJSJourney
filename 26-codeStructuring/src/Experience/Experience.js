import Camera from "./Camera"
import Renderer from "./Renderer"
import Sizes from "./utils/Size"
import Time from "./utils/Time"
import * as THREE from 'three'
import World from "./World/World"
import Resources from "./utils/Resources"
import Debug from './utils/Debug'

import sources from './sources'

let instance = null

export default class Experience {
    constructor(canvas) {
        if (instance)
            return instance

        instance = this

        //permet d’acceder à la classe depuis la console, pas hyper utile a priori ?
        window.experience = this

        this.canvas = canvas
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)
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
        this.world.update()

        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {
                    const value = child.material[key]

                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active) {
            this.debug.ui.destroy()
        }
    }

}