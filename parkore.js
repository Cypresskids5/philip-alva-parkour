import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now(); //curent time
const velocity = new THREE.Vector3();
const directions = new THREE.Vector3();
let camera, scene, renderer, controls;
init();
animate()
function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    controls = new PointerLockControls(camera, document.body)

    const blocker = document.getElementById('blocker')
    const instructions = document.getElementById('instructions')

    instructions.addEventListener('click', function () {
        controls.lock()
    })
    controls.addEventListener('lock', function () {
        instructions.style.display = 'none'
        blocker.style.display = 'none'
    })
    controls.addEventListener('unlock', function () {
        blocker.style.display = 'block'
        instructions.style.display = ''
    })
    scene.add(controls.getObject())

    const onKeyDown = function (event) {
        switch (event.code) {
            case 'KeyW':
                moveForward = true
                break
            case 'KeyS':
                moveBackward = true
                break
            case 'KeyA':
                moveLeft = true
                break
            case 'KeyD':
                moveRight = true
                break
            case 'Space':
                if (canJump === true) velocity.y += 350
                canJump = true
                break
        }
    }
    const onKeyUp = function (event) {
        switch (event.code) {
            case 'KeyW':
                moveForward = false
                break
            case 'KeyS':
                moveBackward = false
                break
            case 'KeyA':
                moveLeft = false
                break;
            case 'KeyD':
                moveRight = false
                break;
        }
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10)

    const geometry1 = new THREE.SphereGeometry(3, 20, 10)
    const material1 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube1 = new THREE.Mesh(geometry1, material1);
    scene.add(cube1)
    objects.push(cube1)

    const geometry2 = new THREE.SphereGeometry(3, 20, 10)
    const material2 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube2 = new THREE.Mesh(geometry2, material2);
    scene.add(cube2)
    cube2.position.set(23, 23, 23)
    objects.push(cube2)



    const geometry3 = new THREE.SphereGeometry(3, 20, 10)
    const material3 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube3 = new THREE.Mesh(geometry3, material3);
    scene.add(cube3)
    cube3.position.set(27, 27, 27)
    objects.push(cube3)

    const geometry4 = new THREE.SphereGeometry(3, 20, 10)
    const material4 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube4 = new THREE.Mesh(geometry4, material4);
    scene.add(cube4)
    cube4.position.set(35, 35, 35)
    objects.push(cube4)

    const geometry6 = new THREE.SphereGeometry(3, 20, 10)
    const material6 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube6 = new THREE.Mesh(geometry6, material6);
    scene.add(cube6)
    cube4.position.set(56, 56, 56)
    objects.push(cube6)

    const geometry7 = new THREE.SphereGeometry(3, 20, 10)
    const material7 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube7 = new THREE.Mesh(geometry7, material7);
    scene.add(cube7)
    objects.push(cube7)

    const geometry8 = new THREE.SphereGeometry(3, 20, 10)
    const material8 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube8 = new THREE.Mesh(geometry8, material8);
    scene.add(cube8)
    cube8.position.set(63, 63, 63)
    objects.push(cube8)

    const geometry9 = new THREE.SphereGeometry(3, 20, 10)
    const material9 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube9 = new THREE.Mesh(geometry9, material9);
    scene.add(cube9)
    cube9.position.set(70, 70, 70)
    objects.push(cube9)

    const geometry10 = new THREE.BoxGeometry(3, 20, 10)
    const material10 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const sphere10 = new THREE.Mesh(geometry10, material10);
    scene.add(sphere10)
    sphere10.position.set(35, 35, 35)
    objects.push(sphere10)

    const geometry11 = new THREE.SphereGeometry(3, 20, 10)
    const material11 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube11 = new THREE.Mesh(geometry11, material11);
    scene.add(cube11)
    cube11.position.set(40, 40, 40)
    objects.push(cube11)

    const geometry5 = new THREE.TorusGeometry(10, 2, 64, 64)
    const material5 = new THREE.MeshLambertMaterial({ color: 0x212752 });
    const cube5 = new THREE.Mesh(geometry5, material5);
    cube5.rotateX(-1.57);
    scene.add(cube5)
    cube5.position.set(5, 5, 5)
    objects.push(cube5)
    const light = new THREE.AmbientLight(0xffffff, 20);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize)
}
function onWindowResize() {
    camera.aspect = (window.innerWidth, window.innerHeight)
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
    requestAnimationFrame(animate)
    const time = performance.now()

    if (controls.isLocked === true) {
        raycaster.ray.origin.copy(controls.getObject().position)
        raycaster.ray.origin.y -= 10

        const intersections = raycaster.intersectObjects(objects, false)
        const onObject = intersections.length > 0
        const delta = (time - prevTime) / 1000


        velocity.x -= velocity.x * 10.0 * delta
        velocity.z -= velocity.z * 10.0 * delta

        velocity.y -= 9.8 * 100 * delta

        directions.z = Number(moveForward) - Number(moveBackward)
        directions.x = Number(moveRight) - Number(moveLeft)
        directions.normalize()

        if (moveForward || moveBackward) velocity.z -= directions.z * 400.0 * delta
        if (moveLeft || moveRight) velocity.x -= directions.x * 400.0 * delta

        if (onObject === true) {
            velocity.y = Math.max(0, velocity.y)
            canJump = true;
        }
        controls.moveRight(-velocity.x * delta)
        controls.moveForward(-velocity.z * delta)

        controls.getObject().position.y +=  (velocity.y *delta)

        if (controls.getObject().position.y < 10) {
            velocity.y = 0
            controls.getObject().position.y = 10
            canJump = true
        }
    }
    prevTime = time
    renderer.render(scene, camera);
}
