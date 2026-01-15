import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import portalVertexShader from './shaders/vertex.glsl'
import portalFragmentShader from './shaders/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const bakedTexture = textureLoader.load('bakedPortal.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

// Portal light material
const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

/**
 * Model
 */

const debug = {}
debug.poleLightMaterial = new THREE.MeshBasicMaterial({color: "#ffffe5"})
debug.portalMaterial = new THREE.ShaderMaterial({
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader,
    uniforms: {
        uTime: new THREE.Uniform(0),
        uBaseColor: new THREE.Uniform(new THREE.Color('#e2cbfb')),
        uSpeed: new THREE.Uniform(1),
        uStrength: new THREE.Uniform(5),
        uDistance: new THREE.Uniform(1.4)
    },
    side: THREE.DoubleSide,
    transparent: true
})

gui.add(debug.portalMaterial.uniforms.uSpeed, 'value').min(0).max(10).step(0.01)
gui.add(debug.portalMaterial.uniforms.uStrength, 'value').min(0).max(50).step(0.01)
gui.add(debug.portalMaterial.uniforms.uDistance, 'value').min(0).max(10).step(0.01)

gltfLoader.load(
    'PortalScene2.glb',
    (gltf) =>
    {
        gltf.scene.traverse((child) => {
            if (child.name === 'Cube012' || child.name === 'Cube017') {
                child.material = debug.poleLightMaterial
            } else if (child.name === 'Circle') {
                child.material = debug.portalMaterial
            } else {
                child.material = bakedMaterial
            }
        })
        scene.add(gltf.scene)
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

debug.clearColor = '#343833'
renderer.setClearColor(debug.clearColor)
gui
    .addColor(debug, 'clearColor')
    .onChange(() =>
    {
        renderer.setClearColor(debug.clearColor)
    })
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    debug.portalMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()