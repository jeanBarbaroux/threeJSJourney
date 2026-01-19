import {
    Float,
    Html,
    MeshReflectorMaterial,
    OrbitControls,
    PivotControls,
    Text,
    TransformControls
} from "@react-three/drei";
import {useRef} from "react";

export default function Experience() {
    const cubeRef = useRef()
    const sphereRef = useRef()


    return <>
        <OrbitControls makeDefault/>
        <directionalLight position={[1, 2, 3]} intensity={4.5}/>
        <ambientLight intensity={1.5}/>

        <PivotControls anchor={[0, 0, 0]} depthTest={false}>
            <mesh position-x={-2} ref={sphereRef}>
                <sphereGeometry/>
                <meshStandardMaterial color="orange"/>
                <Html
                    position={[1, 1, 0]}
                    wrapperClass="label"
                    center
                    distanceFactor={8}
                    occlude={[sphereRef, cubeRef]}
                >
                    That’s a sphere 👍
                </Html>
            </mesh>
        </PivotControls>

        <mesh position-x={2} scale={1.5} ref={cubeRef}>
            <boxGeometry/>
            <meshStandardMaterial color="mediumpurple"/>
        </mesh>
        <TransformControls object={cubeRef}/>

        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry/>
            <MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} color="greenyellow"/>
        </mesh>
        <Float speed={4} floatIntensity={2} rotationIntensity={4}>
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={1}
                position-y={2}
                maxWidth={2}
                textAlign="center"
            >
                I LOVE R3F
                <meshNormalMaterial/>
            </Text>
        </Float>
    </>
}