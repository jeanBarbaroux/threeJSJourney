import floor1Material from "../objects/Floor1Material.js";
import Floor from "./Floor.js";
import {useGLTF} from "@react-three/drei";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {RigidBody} from "@react-three/rapier";

export default function BlockEnd({position = [0, 0, 0]}) {
    const hamburger = useGLTF('./hamburger.glb')
    const burger = useRef(null)

    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const eulerRotation = new THREE.Euler(0, time, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        burger.current.setNextKinematicRotation(quaternionRotation)
    })
    return <>
        <RigidBody
            type="kinematicPosition"
            ref={burger}
            position={[position[0], position[1] + 0.1, position[2]]}
            colliders="hull"
            restitution={0.2}
            friction={0}
        >
            <primitive object={hamburger.scene} position-y={0.5} scale={0.15}/>
        </RigidBody>
        <Floor position={position} texture={floor1Material}/>
    </>
}