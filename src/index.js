import * as THREE from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';
import './styles/style.css';


function sceneOnLoad() {
    //create scene
    let scene = new THREE.Scene();
    //create camera
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    camera.position.z = 5;
    //add color for renderer
    renderer.setClearColor('#e5e5e5');
    //add size (which will be fullscreen)
    renderer.setSize(window.innerWidth, window.innerHeight);
    //add renderer at the page
    document.body.appendChild(renderer.domElement);
    //every time when the user resize the window...
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    //create new object - sphere
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    //add material for the sphere
    let material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
    //combine geometry + material = figure
    // let mesh = new THREE.Mesh(geometry, material);
    //add it at the scene
    // scene.add(mesh);
    //create new object - sphere
    let meshX;
    meshX = -10;
    for ( let i = 0; i < 25; i++ ) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x += (Math.random() - 0.5) * 10;
        mesh.position.y += (Math.random() - 0.5) * 10;
        mesh.position.z += (Math.random() - 0.5) * 10;
        scene.add(mesh);
        meshX += 1;
    }
    /*
    * As we can see - our figure is black
    * cuz we need light
    * and we create it
     */
    let light = new THREE.PointLight(0xFFFFFF, 1, 1000);
    //put light into (10, 0, 25) position
    light.position.set(0, 0, 0);
    //add light at the scene
    scene.add(light);
    //second light
    light = new THREE.PointLight(0xFFFFFF, 2, 1000);
    //put light into (10, 0, 25) position
    light.position.set(0, 0, 25);
    //add light at the scene
    scene.add(light);

    //render the scene
    let render = function() {
        //loop which as page resize or refresh — rerender the scene
        requestAnimationFrame(render);
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    render();


    function onMouseMove(event) {

        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        let intersects = raycaster.intersectObjects(scene.children, true);
        for (let i = 0; i < intersects.length; i++) {
            let tl = gsap.timeline();
            tl.to(intersects[i].object.scale, {x: 2, duration: 1, ease: 'easeOut'});
            tl.to(intersects[i].object.scale, {x: 0.5, duration: 1, ease: 'easeOut'});
            tl.to(intersects[i].object.position, {x: 2, duration: 1, ease: 'easeOut'});
            tl.to(intersects[i].object.rotation, {y: Math.PI*0.5, duration: 1, ease: 'easeOut'}, '=-1.5');
        }
    }

    window.addEventListener('mousemove', onMouseMove);

}

sceneOnLoad();