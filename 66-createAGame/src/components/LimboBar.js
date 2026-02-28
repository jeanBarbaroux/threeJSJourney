import boxGeometry from "../objects/BoxGeometry.js";
import obstacleMaterial from "../objects/ObstacleMaterial.js";
import {useFrame} from "@react-three/fiber";
import {useRef, useState} from "react";
import {RigidBody} from '@react-three/rapier'
import Floor from "./Floor.js";
import floor2Material from "../objects/Floor2Material.js";


export default function LimboBar({position}) {
    const limbo = useRef(null)
    const [speed] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const y = Math.sin(time + speed) + 1.15
        limbo.current.setNextKinematicTranslation({x: position[0], y, z: position[2]})
    })

    return <>
        <Floor position={position} texture={floor2Material}/>
        <RigidBody type="kinematicPosition" ref={limbo} position={[position[0], position[1] + 0.1, position[2]]}>
            <mesh
                geometry={boxGeometry}
                material={obstacleMaterial}
                scale={[4, 0.2, 0.2]}
                restitution={0.2}
                friction={0}
                receiveShadow
                castShadow
            />
        </RigidBody>
    </>
}