export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path: [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    }, {
        name: 'grassColorTexture',
        type: 'textureLoader',
        path: 'textures/dirt/color.jpg'
    }, {
        name: 'grassNormalTexture',
        type: 'textureLoader',
        path: 'textures/dirt/normal.jpg'
    }, {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    }
]