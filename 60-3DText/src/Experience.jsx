import {Center, OrbitControls, Text3D, useMatcapTexture} from '@react-three/drei'
import {Perf} from 'r3f-perf'
import Donut from "./Donut.js";

export default function Experience() {
    const [matcapTexture] = useMatcapTexture('430404_BD9295_7E1E21_94544C', 256)

    return <>

        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <Center>
            <Text3D font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled={true}
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
            >
                Hello World !
                <meshMatcapMaterial matcap={matcapTexture}/>
            </Text3D>
        </Center>

        {[...Array(100)].map((value, index) =>
            <Donut index={index} texture={matcapTexture}/>
        )}
    </>
}