import {ContactShadows, Environment, Float, Html, PresentationControls, Text, useGLTF} from '@react-three/drei'

export default function Experience() {
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')

    return <>

        <color args={['#241a1a']} attach="background"/>


        <Environment preset="city"/>

        <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            damping={0.1}
            snap
        >
            <Float rotationIntensity={0.4}>
                <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color={'#fff5dd'}
                    rotation={[-0.1, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                />
                <primitive object={computer.scene} position-y={-1.2}/>
                <Html
                    transform
                    wrapperClass="htmlScreen"
                    distanceFactor={1.17}
                    position={[0, 0.38, -1.4]}
                    rotation-x={-0.256}
                >
                    {/*This is obviously not my website, this is Bruno Simon’s one.*/}
                    <iframe src="https://chartogne-taillet.com/fr"/>
                </Html>
                <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={1}
                    position={[2, 0.75, 0.75]}
                    rotation-y={-1.5}
                    maxWidth={2}
                    textAlign="center"
                >
                    Jean Barbaroux
                </Text>
            </Float>
        </PresentationControls>

        <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
        />
    </>
}