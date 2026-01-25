import {useAnimations, useGLTF} from "@react-three/drei";
import {useEffect} from "react";
import {useControls} from "leva";

export default function Fox(props) {
    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)

    const {animationName} = useControls('Fox animation', {
        animationName: {options: animations.names}
    })

    useEffect(() => {
        const action = animations.actions[animationName]
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [animationName]);

    return <>
        <primitive object={fox.scene} scale={props.scale} position={props.position}></primitive>
    </>
}

useGLTF.preload('./Fox/glTF/Fox.gltf')