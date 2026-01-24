import {useFrame, useThree} from '@react-three/fiber'
import {ContactShadows, Environment, OrbitControls} from '@react-three/drei'
import {useEffect, useRef} from 'react'
import {Perf} from 'r3f-perf'
import {useControls} from "leva";

export default function Experience() {
    const cube = useRef()
    const directionalLight = useRef()

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
        // const time = state.clock.elapsedTime
        // cube.current.position.x = 2 + Math.sin(time)
    })

    const {color, opacity, blur} = useControls('contact shadows', {
        color: '#1d8f75',
        opacity: {value: 0.4, min: 0, max: 1},
        blur: {value: 2.8, min: 0, max: 10}
    })

    const {sunPosition} = useControls('sky', {
        sunPosition: {value: [1, 2, 3]}
    })

    const {envMapIntensity} = useControls('environment map', {
        envMapIntensity: {value: 3.5, min: 0, max: 12}
    })

    const scene = useThree(state => state.scene)
    useEffect(() => {
        scene.environmentIntensity = envMapIntensity
    }, [envMapIntensity]);

    return <>
        <Environment
            preset="city"
            ground={{
                height: 7,
                radius: 28,
                scale: 100
            }}
        >
            {/*<color args={['black']} attach="background"/>*/}
            {/*<Lightformer*/}
            {/*    position-z={-5}*/}
            {/*    scale={10}*/}
            {/*    color="red"*/}
            {/*    intensity={10}*/}
            {/*    form="ring"*/}
            {/*/>*/}
            {/*<mesh position-z={-5} scale={10}>*/}
            {/*    <planeGeometry/>*/}
            {/*    <meshBasicMaterial color={[1.5, 0, 0]}/>*/}
            {/*</mesh>*/}
        </Environment>

        {/*<BakeShadows/>*/}
        {/*<SoftShadows size={25} samples={10} focus={0} furstrum={3.75} near={9.5} rings={11}/>*/}

        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        {/*<directionalLight*/}
        {/*    ref={directionalLight}*/}
        {/*    position={sunPosition}*/}
        {/*    intensity={4.5}*/}
        {/*    castShadow*/}
        {/*    shadow-mapSize={[1024, 1024]}*/}
        {/*    shadow-camera-near={1}*/}
        {/*    shadow-camera-far={10}*/}
        {/*    shadom-camera-top={4}*/}
        {/*    shadow-camera-right={4}*/}
        {/*    shadow-camera-bottom={-4}*/}
        {/*    shadow-camera-left={-4}*/}
        {/*>*/}
        {/*    <Fragment></Fragment>*/}
        {/*</directionalLight>*/}
        {/*<AccumulativeShadows*/}
        {/*    position={[0, -0.99, 0]}*/}
        {/*    color="#316d39"*/}
        {/*    opacity={0.8}*/}
        {/*    frames={Infinity}*/}
        {/*    blend={100}*/}
        {/*    temporal*/}
        {/*>*/}
        {/*    <RandomizedLight*/}
        {/*        position={[1, 2, 3]}*/}
        {/*        amount={8}*/}
        {/*        radius={1}*/}
        {/*        ambient={0.5}*/}
        {/*        intensity={3}*/}
        {/*        bias={0.001}*/}
        {/*    />*/}
        {/*</AccumulativeShadows>*/}

        <ContactShadows
            position={[0, 0, 0]}
            scale={10}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
            frames={1}
        />

        {/*<ambientLight intensity={1.5}/>*/}

        {/*<Sky*/}
        {/*    sunPosition={sunPosition}*/}
        {/*/>*/}

        <mesh position-x={-2} position-y={1} castShadow>
            <sphereGeometry/>
            <meshStandardMaterial color="orange"/>
        </mesh>

        <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
            <boxGeometry/>
            <meshStandardMaterial color="mediumpurple"/>
        </mesh>

        {/*<mesh rotation-x={-Math.PI * 0.5} scale={10}>*/}
        {/*    <planeGeometry/>*/}
        {/*    <meshStandardMaterial color="greenyellow"/>*/}
        {/*</mesh>*/}

    </>
}