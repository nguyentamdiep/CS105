import * as THREE from 'three';
//import {GUI} from 'dat.gui';
import * as dat from 'https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js';

import {Controller} from '../HelperFunction.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );


//renderer.shadowMap.type = THREE.PCFShadowMap;

document.body.appendChild( renderer.domElement );


camera.position.z = 5;
//console.log(camera);

var width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1;
const geometry = new THREE.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments  );

const material = new THREE.MeshNormalMaterial();

const cube = new THREE.Mesh( geometry, material );
//console.log(cube);

scene.add( cube );

const plane_geometry = new THREE.PlaneGeometry( 5, 5 );
const plane_material = new THREE.MeshNormalMaterial( {side: THREE.DoubleSide} );
const plane = new THREE.Mesh( plane_geometry, plane_material );
plane.rotation.x = Math.PI/2;
plane.position.y=-2;
plane.position.z=-1;
scene.add( plane );

const light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
light.position.set(0, 5, 1);
scene.add( light );
//light.visible = false;
//console.log('light: ', light.visible);

const helper = new THREE.DirectionalLightHelper( light, 5 );
scene.add( helper );
helper.visible=false;
light.visible = false;


var gui = new dat.GUI();


var path_to_texture ='box_texture.jpg';
gui = Controller(gui, cube, renderer, scene, camera, path_to_texture, plane, light, helper);

//console.log(light.castShadow);


function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();






