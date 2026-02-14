import {Clone} from "@react-three/drei";

export default function Donut(props) {
    return <Clone
        key={props.index}
        position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ]}
        scale={0.2 + Math.random() * 0.2}
        rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            0
        ]}
    >
        <torusGeometry/>
        <meshMatcapMaterial matcap={props.texture} args={[1, 0.6, 16, 32]}/>
    </Clone>
}