import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
*/
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

const raycaster = new THREE.Raycaster()
// const rayOrigin = new THREE.Vector3(-3, 0, 0)
// const rayDirection = new THREE.Vector3(10, 0, 0)
// rayDirection.normalize()

// raycaster.set(rayOrigin, rayDirection)
// const intersect = raycaster.intersectObject(object2)
// const intersects = raycaster.intersectObjects([object1, object2, object3])

// console.log(intersect)
// console.log(intersects)


/**
 * Sizes
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
*/
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const mouse = new THREE.Vector2()
let currentIntersect = null

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = -event.clientY / sizes.height * 2 + 1
})

window.addEventListener('click', (event) => {
    if (currentIntersect) {
        console.log('clicked')
    }
})

/**
 * Animate
*/

const ambientLight = new THREE.AmbientLight('#ffffff', 1)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight('#ffffff', 2.1)
directionalLight.position.set(3, 3, 3)
scene.add(directionalLight)

let duckIntersect = null
let duck = null
const gltfLoader = new GLTFLoader()
gltfLoader.load('./models/Duck/glTF/Duck.gltf', (gltf) => {
    gltf.scene.position.y = -1.2
    scene.add(gltf.scene)
    duck = gltf.scene
})


const clock = new THREE.Clock()


const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // const rayOrigin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(10, 0, 0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin, rayDirection)
    // const objectsToTest = [object1, object2, object3]
    // const interescts = raycaster.intersectObjects(objectsToTest)

    // for (const object of objectsToTest) {
    //     object.material.color.set('#ff0000')
    // }

    // for (const intersect of interescts) {
    //     intersect.object.material.color.set('#0000ff')
    // }


    raycaster.setFromCamera(mouse, camera)
    const objectsToTest = [object1, object2, object3]
    const interescts = raycaster.intersectObjects(objectsToTest)

    for (const object of objectsToTest) {
        object.material.color.set('#ff0000')
    }
    for (const interesct of interescts) {
        interesct.object.material.color.set('#0000ff')
    }

    if (interescts.length) {
        if (currentIntersect === null) {
            console.log('mouse enter')
        }

        currentIntersect = interescts[0]
    }
    else {
        if (currentIntersect) {
            console.log('mouse leave')
        }

        currentIntersect = null
    }

    if (duck) {
        const modelInstersect = raycaster.intersectObject(duck)
        if (!!modelInstersect && modelInstersect.length) {
            if (duckIntersect === null) {
                duck.scale.set(1.2, 1.2, 1.2)
            }
            duckIntersect = modelInstersect
        }
        else {
            if (modelInstersect) {
                duck.scale.set(1, 1, 1)
            }
            duckIntersect = null
        }
    }

    // console.log(currentIntersect)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()