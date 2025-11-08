import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

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

const alphaDoor = textureLoader.load('./door/alpha.jpg')
const AODoor = textureLoader.load('./door/ambientOcclusion.jpg')
const colorDoor = textureLoader.load('./door/color.jpg')
const heightDoor = textureLoader.load('./door/height.jpg')
const metalnessDoor = textureLoader.load('./door/metalness.jpg')
const normalDoor = textureLoader.load('./door/normal.jpg')
const roughnessDoor = textureLoader.load('./door/roughness.jpg')

colorDoor.colorSpace = THREE.SRGBColorSpace

const colorFloor = textureLoader.load('./floor/textures/forrest_ground_01_diff_1k.jpg')
const ARMFloor = textureLoader.load('./floor/textures/forrest_ground_01_arm_1k.jpg')
const NormalFloor = textureLoader.load('./floor/textures/forrest_ground_01_nor_gl_1k.jpg')
const DisplacmentFloor = textureLoader.load('./floor/textures/forrest_ground_01_disp_1k.jpg')
const alphaFloor = textureLoader.load('./floor/alpha.jpg')

colorFloor.repeat.set(8, 8)
colorFloor.wrapS = THREE.RepeatWrapping
colorFloor.wrapT = THREE.RepeatWrapping
colorFloor.colorSpace = THREE.SRGBColorSpace

ARMFloor.repeat.set(8, 8)
ARMFloor.wrapS = THREE.RepeatWrapping
ARMFloor.wrapT = THREE.RepeatWrapping

DisplacmentFloor.repeat.set(8, 8)
DisplacmentFloor.wrapS = THREE.RepeatWrapping
DisplacmentFloor.wrapT = THREE.RepeatWrapping

const colorRoof = textureLoader.load('./roof/textures/roof_09_diff_1k.jpg')
const ARMRoof = textureLoader.load('./roof/textures/roof_09_arm_1k.jpg')
const NormalRoof = textureLoader.load('./roof/textures/roof_09_nor_gl_1k.jpg')
const displacementRoof = textureLoader.load('./roof/textures/roof_09_disp_1k.jpg')
colorRoof.colorSpace = THREE.SRGBColorSpace

colorRoof.repeat.set(4, 1)
colorRoof.wrapS = THREE.RepeatWrapping
colorRoof.wrapT = THREE.RepeatWrapping

ARMRoof.repeat.set(4, 1)
ARMRoof.wrapS = THREE.RepeatWrapping
ARMRoof.wrapT = THREE.RepeatWrapping

NormalRoof.repeat.set(4, 1)
NormalRoof.wrapS = THREE.RepeatWrapping

displacementRoof.repeat.set(4, 1)
displacementRoof.wrapS = THREE.RepeatWrapping

const colorWalls = textureLoader.load('./walls/textures/medieval_red_brick_diff_1k.jpg')
const ARMWalls = textureLoader.load('./walls/textures/medieval_red_brick_arm_1k.jpg')
const NormalWalls = textureLoader.load('./walls/textures/medieval_red_brick_nor_gl_1k.jpg')
const dispWalls = textureLoader.load('./walls/textures/medieval_red_brick_disp_1k.jpg')
colorWalls.colorSpace = THREE.SRGBColorSpace

const colorBushes = textureLoader.load('./bush/textures/leaves_forest_ground_diff_1k.jpg')
const ARMBushes = textureLoader.load('./bush/textures/leaves_forest_ground_arm_1k.jpg')
const NormalBushes = textureLoader.load('./bush/textures/leaves_forest_ground_nor_gl_1k.jpg')
colorBushes.colorSpace = THREE.SRGBColorSpace

colorBushes.repeat.set(2, 1)
ARMBushes.repeat.set(2, 1)
NormalBushes.repeat.set(2, 1)

colorBushes.wrapS = THREE.RepeatWrapping
ARMBushes.wrapS = THREE.RepeatWrapping
NormalBushes.wrapS = THREE.RepeatWrapping

const colorGraves = textureLoader.load('./grave/textures/granite_tile_03_diff_1k.jpg')
const ARMGraves = textureLoader.load('./grave/textures/granite_tile_03_arm_1k.jpg')
const NormalGraves = textureLoader.load('./grave/textures/granite_tile_03_nor_gl_1k.jpg')
colorGraves.colorSpace = THREE.SRGBColorSpace

colorGraves.repeat.set(0.3, 0.2)
ARMGraves.repeat.set(0.3, 0.2)
NormalGraves.repeat.set(0.3, 0.2)


const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: alphaFloor,
        transparent: true,
        map: colorFloor,
        aoMap: ARMFloor,
        roughnessMap: ARMFloor,
        metalnessMap: ARMFloor,
        normalMap: NormalFloor,
        displacementMap: DisplacmentFloor,
        displacementScale: 0.3,
        displacementBias: -0.08
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)


const house = new THREE.Group()
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 3, 4, 100, 100),
    new THREE.MeshStandardMaterial({
        map: colorWalls,
        aoMap: ARMWalls,
        roughnessMap: ARMWalls,
        metalnessMap: ARMWalls,
        normalMap: NormalWalls,
        displacementMap: dispWalls,
        displacementScale: 0.066,
        displacementBias: - 0.05699
    })
)
house.position.y = 1.5
gui.add(walls.material, 'displacementScale').min(0).max(1).step(0.001).name('displacementScales')
gui.add(walls.material, 'displacementBias').min(-1).max(1).step(0.001).name('displacementScales')

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.1, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: colorRoof,
        aoMap: ARMRoof,
        roughnessMap: ARMRoof,
        metalnessMap: ARMRoof,
        normalMap: NormalRoof,
    })
)
roof.position.y = 2.6
roof.rotation.y = Math.PI * 0.25

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: colorDoor,
        transparent: true,
        alphaMap: alphaDoor,
        aoMap: AODoor,
        metalnessMap: metalnessDoor,
        normalMap: normalDoor,
        roughnessMap: roughnessDoor,
        displacementMap: heightDoor,
        displacementScale: 0.15,
        displacementBias: -0.04

    })
)
door.position.z = 2.01
door.position.y += 0.93
scene.add(door)

house.add(walls)
house.add(roof)
scene.add(house)

const graveGeometry = new THREE.BoxGeometry(0.75, 1, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: colorGraves,
    normalMap: NormalGraves,
    aoMap: ARMGraves,
    roughness: ARMGraves,
})

const graves = new THREE.Group()

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
    graves.add(grave)
}

scene.add(graves)

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    map: colorBushes,
    normalMap: NormalBushes,
    aoMap: ARMBushes,
    metalnessMap: ARMBushes,
    roughnessMap: ARMBushes,
})

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

bush1.rotation.x = -0.75
bush2.rotation.x = -0.75
bush3.rotation.x = -0.75
bush4.rotation.x = -0.75

scene.add(bush1, bush2, bush3, bush4)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.3)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 0.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const doorPointLight = new THREE.PointLight('#ff7d46', 5)
house.add(doorPointLight)
doorPointLight.position.set(0, 1, 2.2)

const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)

scene.add(ghost1, ghost2, ghost3)


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

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true

roof.castShadow = true
roof.receiveShadow = true

floor.receiveShadow = true

for (const grave of graves.children) {
    grave.castShadow = true
    grave.receiveShadow = true
}

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

scene.fog = new THREE.FogExp2("#03343f", 0.1)

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    ghost1.position.x = Math.cos(elapsedTime / 4) * 5
    ghost1.position.y = Math.abs(Math.cos(elapsedTime) * Math.cos(elapsedTime * 1.34))
    ghost1.position.z = Math.sin(elapsedTime / 4) * 5

    ghost2.position.x = Math.sin(elapsedTime / 8) * 8
    ghost2.position.y = Math.abs(Math.sin(elapsedTime / 4) * Math.sin(elapsedTime * 2.34))
    ghost2.position.z = Math.cos(elapsedTime / 8) * 8

    ghost3.position.x = Math.cos(elapsedTime / 3) * 5
    ghost3.position.y = Math.abs(Math.cos(elapsedTime / 3) * Math.cos(elapsedTime * 3.22)) / 10
    ghost3.position.z = Math.sin(elapsedTime / 3) * 10

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()