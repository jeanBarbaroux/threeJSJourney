import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

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
 * House
 */
const textureLoader = new THREE.TextureLoader()

const alpha = textureLoader.load('./door/alpha.jpg')
const ambientOcclusion = textureLoader.load('./door/ambientOcclusion.jpg')
const color = textureLoader.load('./door/color.jpg')
const height = textureLoader.load('./door/height.jpg')
const metalness = textureLoader.load('./door/metalness.jpg')
const normal = textureLoader.load('./door/normal.jpg')
const roughness = textureLoader.load('./door/roughness.jpg')

const floorAlpha = textureLoader.load('./floor/alpha.jpg')

color.colorSpace = THREE.SRGBColorSpace

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlpha,
        transparent: true
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

const house = new THREE.Group()
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    new THREE.MeshStandardMaterial()
)
house.position.y = 1.5

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3, 2.5, 4),
    new THREE.MeshStandardMaterial()
)
roof.position.y = 3.2
roof.rotation.y = Math.PI * 0.25

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({
        map: color,
        transparent: true,
        alphaMap: alpha,
        aoMap: ambientOcclusion,
        metalnessMap: metalness,
        normalMap: normal,
        roughnessMap: roughness
    })
)
door.position.z = 2.01
door.position.y += 0.93
scene.add(door)

house.add(walls)
house.add(roof)
scene.add(house)

const graveGeometry = new THREE.BoxGeometry(0.75, 1, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial()

for (let i = 0; i < 30; i++) {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.y += Math.random() * 0.4
    const angle = Math.random() * Math.PI * 2
    const position = Math.random() * 7 + 3
    grave.position.x = Math.cos(angle) * position
    grave.position.z = Math.sin(angle) * position
    grave.rotation.x = (Math.random() - 0.5) * 0.6
    grave.rotation.y = (Math.random() - 0.5) * 0.6
    grave.rotation.z = (Math.random() - 0.5) * 0.6
    scene.add(grave)
}

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

scene.add(bush1, bush2, bush3, bush4)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, 8)
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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



/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()