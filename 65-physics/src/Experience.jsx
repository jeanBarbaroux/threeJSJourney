import {OrbitControls, useGLTF} from '@react-three/drei'
import {Perf} from 'r3f-perf'
import {CuboidCollider, CylinderCollider, InstancedRigidBodies, Physics, RigidBody} from "@react-three/rapier";
import {useEffect, useMemo, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from 'three'

export default function Experience(factory, deps) {
    const cube = useRef(null)
    const twister = useRef(null);
    const {scene} = useGLTF('./hamburger.glb')

    const [hitSound] = useState(() => new Audio('./hit.mp3'))

    const cubeJump = () => {
        const mass = cube.current.mass()
        cube.current.applyImpulse({x: 0, y: mass, z: 0}, true)
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        }, true)
    }

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)
        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        twister.current.setNextKinematicTranslation({x, y: -0.8, z})
    })

    const collisionEnter = () => {
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    const cubesCount = 100

    const cubes = useRef(null)

    useEffect(() => {
        for (let i = 0; i < cubesCount; i++) {
            const matrix = new THREE.Matrix4()
            matrix.compose(
                new THREE.Vector3(0, i * 2, 0),
                new THREE.Quaternion(),
                new THREE.Vector3(1, 1, 1)
            )
            cubes.current.setMatrixAt(i, matrix)
        }
    }, []);

    const instances = useMemo(() => {
        const instances = []
        for (let i = 0; i < cubesCount; i++) {
            instances.push({
                key: 'instance_' + i,
                position: [0, i * 2, 0],
                rotation: [0, 0, 0]
            })
        }
        return instances
    })

    return <>

        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5}/>
        <ambientLight intensity={1.5}/>

        <Physics gravity={[0, -9.81, 0]}>
            <RigidBody colliders="ball">
                <mesh castShadow position={[-2, 2, 0]}>
                    <sphereGeometry/>
                    <meshStandardMaterial color="orange"/>
                </mesh>
            </RigidBody>

            <RigidBody ref={cube} position={[1.5, 2, 0]} restitution={0.5} colliders={false}
                       onCollisionEnter={collisionEnter}>
                <mesh castShadow onClick={cubeJump}>
                    <boxGeometry/>
                    <meshStandardMaterial color="mediumpurple"/>
                </mesh>
                <CuboidCollider args={[0.5, 0.5, 0.5]} mass={0.5}/>
            </RigidBody>

            <RigidBody position={[0, -0.8, 0]} friction={0} type="kinematicPosition" ref={twister}>
                <mesh castShadow scale={[0.4, 0.4, 3]}>
                    <boxGeometry/>
                    <meshStandardMaterial color="red"/>
                </mesh>
            </RigidBody>

            <RigidBody type="fixed">
                <mesh receiveShadow position-y={-1.25}>
                    <boxGeometry args={[10, 0.5, 10]}/>
                    <meshStandardMaterial color="greenyellow"/>
                </mesh>
            </RigidBody>

            <RigidBody colliders={false}>
                <primitive object={scene} scale={0.25}/>
                <CylinderCollider args={[0.5, 1.25]}/>
            </RigidBody>

            <RigidBody type={"fixed"}>
                <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]}/>
                <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]}/>
                <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]}/>
                <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]}/>
            </RigidBody>

            <InstancedRigidBodies instances={instances}>
                <instancedMesh args={[null, null, cubesCount]} ref={cubes} castShadow receiveShadow>
                    <boxGeometry/>
                    <meshStandardMaterial color="tomato"/>
                </instancedMesh>
            </InstancedRigidBodies>
        </Physics>

    </>
}