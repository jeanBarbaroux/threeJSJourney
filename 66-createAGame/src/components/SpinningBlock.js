import boxGeometry from "../objects/BoxGeometry.js";
import obstacleMaterial from "../objects/ObstacleMaterial.js";
import * as THREE from 'three'
import {useFrame} from "@react-three/fiber";
import {useRef, useState} from "react";
import {RigidBody} from '@react-three/rapier'
import Floor from "./Floor.js";
import floor2Material from "../objects/Floor2Material.js";


export default function SpinningBlock({position}) {
    const twister = useRef(null)
    const [speed] = useState(() => (Math.random() + 1) * (Math.random() < 0.5 ? 1 : -1))

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const eulerRotation = new THREE.Euler(0, time * speed, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)
    })

    return <>
        <Floor position={position} texture={floor2Material}/>
        <RigidBody type="kinematicPosition" ref={twister} position={[position[0], position[1] + 0.1, position[2]]}>
            <mesh
                geometry={boxGeometry}
                material={obstacleMaterial}
                scale={[0.4, 4, 3.5]}
                restitution={0.2}
                friction={0}
                receiveShadow
                castShadow
            />
        </RigidBody>
    </>
}