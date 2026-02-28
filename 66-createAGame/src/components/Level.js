import BlockStart from "./BlockStart.js";
import SpinningBlock from "./SpinningBlock.js";
import LimboBar from "./LimboBar.js";
import AxeTrap from "./AxeTrap.js";
import {useMemo} from "react";
import BlockEnd from "./BlockEnd.js";
import Colliders from "./Colliders.js";

export default function Level({count = 10, types = [SpinningBlock, LimboBar, AxeTrap], seed = 0}) {
    const blocks = useMemo(() => {
        const blocks = []
        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }
        return blocks
    }, [count, types, seed])

    return <>
        <BlockStart/>
        {blocks.map((Block, index) => <Block key={index} position={[0, 0, -(index + 1) * 4]}/>)}
        <BlockEnd position={[0, 0, -(count + 1) * 4]}/>
        <Colliders length={(count + 2) * 4}/>
    </>
}