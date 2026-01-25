import {Clone, useGLTF} from "@react-three/drei";

export default function model() {
    const model = useGLTF('./hamburger-draco.glb')

    return <>
        <Clone object={model.scene} scale={0.35} position-y={-1}/>
        <Clone object={model.scene} scale={0.35} position-y={0}/>
    </>
}

useGLTF.preload('./hamburger-draco.glb')