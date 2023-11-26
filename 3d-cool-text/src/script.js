import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
alert("Welcome to the future which will predict your bf/gf name....")
const a = prompt("Hey please enter your beautiful name!!")
alert("Touch the bubble to burst out in order to search your bf/gf name ")

// Base
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const matcaptexture = textureLoader.load('./textures/matcaps/1.png')
const matcaptexture1 = textureLoader.load('./textures/matcaps/8.png')
const fontloader = new FontLoader()

fontloader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            "Click to reveal the name ",
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5,
            }
        )

        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcaptexture })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        let donutgeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const donusmateral = new THREE.MeshMatcapMaterial({ matcap: matcaptexture1 })

        const donuts = []

        for (let i = 0; i <= 1000; i++) {
            const donut = new THREE.Mesh(donutgeometry, donusmateral)
            scene.add(donut)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            donuts.push(donut)
        }

        const raycaster = new THREE.Raycaster()
        const raycasterText = new THREE.Raycaster();
        const mouse = new THREE.Vector2()

        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

            raycaster.setFromCamera(mouse, camera)

            const intersects = raycaster.intersectObjects(donuts)

            if (intersects.length > 0) {
                const selectedDonut = intersects[0].object
                scene.remove(selectedDonut)
                donuts.splice(donuts.indexOf(selectedDonut), 1)
            }
        })

        window.addEventListener('click', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

            raycaster.setFromCamera(mouse, camera)

            const intersectsDonuts = raycaster.intersectObjects(donuts)
            if (intersectsDonuts.length > 0) {
                const selectedDonut = intersectsDonuts[0].object
                scene.remove(selectedDonut)
                donuts.splice(donuts.indexOf(selectedDonut), 1)
            }

            raycasterText.setFromCamera(mouse, camera);
            const intersectsText = raycasterText.intersectObject(text);

            if (intersectsText.length > 0) {
                prompt("Do you like somebody?")
                prompt("Type the first letter of your crush name..")
                alert("Click ok to get your partner name")
                alert("Abe chutiye kya karega name janke ...pategi/patega toh waise bhi nhi...face dekha/dekhi  hai apna/apni....")
            }
        })

    }
)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
