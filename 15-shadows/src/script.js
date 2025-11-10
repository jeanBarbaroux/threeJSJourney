import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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


const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
bakedShadow.colorSpace = THREE.SRGBColorSpace
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

//Spotlight

const spotlight = new THREE.SpotLight("#ffffff", 5, 10, Math.PI * 0.3)
spotlight.castShadow = true
spotlight.position.set(0, 2, 2)
scene.add(spotlight)

spotlight.shadow.mapSize.width = 1024
spotlight.shadow.mapSize.height = 1024
spotlight.shadow.camera.fov = 30
spotlight.shadow.camera.near = 1
spotlight.shadow.camera.far = 6

const spotlightCameraHelper = new THREE.CameraHelper(spotlight.shadow.camera)
scene.add(spotlightCameraHelper)
spotlightCameraHelper.visible = false

const pointlight = new THREE.PointLight('#ffffff', 2.7)
pointlight.castShadow = true
pointlight.position.set(-1, 1, 0)
pointlight.shadow.mapSize.width = 1024
pointlight.shadow.mapSize.height = 1024
pointlight.shadow.camera.near = 0.1
pointlight.shadow.camera.far = 5
scene.add(pointlight)

const pointlightHelper = new THREE.CameraHelper(pointlight.shadow.camera)
scene.add(pointlightHelper)
pointlightHelper.visible = false


/**
 * Materials
*/
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
*/
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: "#000000",
        alphaMap: simpleShadow,
        transparent: true
    })
)
sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.001
scene.add(sphereShadow)

scene.add(sphere, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

sphere.castShadow = true
plane.receiveShadow = true
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
renderer.shadowMap.enabled = false

// directionalLight.shadow.radius = 10


const direcationalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
direcationalLightCameraHelper.visible = false
scene.add(direcationalLightCameraHelper)


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.cos(elapsedTime * 3))
    sphere.position.z = Math.sin(elapsedTime) * 1.5

    sphereShadow.position.x = Math.cos(elapsedTime) * 1.5
    sphereShadow.material.opacity = 1 - sphere.position.y * 0.3
    sphereShadow.position.z = Math.sin(elapsedTime) * 1.5


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()