import {extend, useFrame, useThree} from "@react-three/fiber";
import {useRef} from "react";
import {OrbitControls} from "three/addons";
import CustomObject from "./CustomObject.js";

extend({OrbitControls: OrbitControls})

export default function Experience() {
    const {camera, gl} = useThree()
    const cubeRef = useRef()

    const frame = useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)
    });

    return <>
        <orbitControls args={[camera, gl.domElement]}/>

        <directionalLight position={[1, 2, 3]} intensity={2}/>
        <ambientLight intensity={0.6}/>

        <mesh position-x={-2}>
            <sphereGeometry/>
            <meshStandardMaterial color={"orange"}/>
        </mesh>

        <mesh scale={1.5} position-x={2} ref={cubeRef}>
            <boxGeometry scale={1.5}/>
            <meshStandardMaterial color={"mediumpurple"}/>
        </mesh>

        <mesh rotation-x={-Math.PI * 0.5} scale={10} position-y={-2}>
            <planeGeometry/>
            <meshStandardMaterial color={"greenyellow"}/>
        </mesh>

        <CustomObject/>
    </>
}