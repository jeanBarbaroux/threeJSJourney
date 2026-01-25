import {OrbitControls} from '@react-three/drei'
import {Perf} from 'r3f-perf'
import {Suspense} from "react";
import Placeholder from "./components/Placeholder.js";
import {Hamburger} from "./components/Hamburger.js";
import Fox from "./components/Fox.js";

export default function Experience() {


    return <>
        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} shadow-normalBias={0.04}/>
        <ambientLight intensity={1.5}/>

        <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry/>
            <meshStandardMaterial color="greenyellow"/>
        </mesh>
        <Suspense
            fallback={
                <Placeholder position={0.5} scale={[2, 3, 2]} color="red"/>
            }
        >
            <Hamburger scale={0.35}/>
        </Suspense>
        <Suspense>
            <Fox scale={0.025} position={[-3, 0, 0]}/>
        </Suspense>
    </>
}