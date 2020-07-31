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

    //create new object - sphere
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    //add material for the sphere
    let material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
    //combine geometry + material = figure
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(2, 2, -2);


    //add it at the scene
    scene.add(mesh);
    /*
    * As we can see - our figure is black
    * cuz we need light
    * and we create it
     */
    let light = new THREE.PointLight(0xFFFFFF, 1, 500);
    //put light into (10, 0, 25) position
    light.position.set(10, 0, 25);
    //add light at the scene
    scene.add(light);

    //render the scene
    let render = function() {
        //loop which as page resize or refresh — rerender the scene
        requestAnimationFrame(render);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    render();

    this.tl = new TimelineMax().delay(0.3);
    this.tl.to(this.mesh.scale, 1, {x: 2, ease: Expo.easeOut});
    this.tl.to(this.mesh.scale, 0.5, {x: 0.5, ease: Expo.easeOut});
    this.tl.to(this.mesh.position, 0.5, {x: 2, ease: Expo.easeOut});
    this.tl.to(this.mesh.rotation, 0.5, {y: Math.PI*0.5, ease: Expo.easeOut}, '=-1.5');


}

sceneOnLoad();