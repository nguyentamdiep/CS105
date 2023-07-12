import * as THREE from 'three';
//import {GUI} from 'dat.gui';
import * as dat from 'https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js';
import { TeapotGeometry } from './TeapotGeometry.js';

import {Controller} from '../HelperFunction.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5	;

const geometry = new TeapotGeometry(0.6); 

const material = new THREE.MeshNormalMaterial( {  } ); 


const teapot = new THREE.Mesh( geometry, material ); 
//console.log(teapot);
scene.add( teapot );

//const light = new THREE.PointLight(0xffffff, 1, 100);

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

const helper = new THREE.DirectionalLightHelper( light, 5 );
scene.add( helper );
helper.visible=false;
light.visible = false;




//console.log('light: ', light.visible);

var gui = new dat.GUI();

var path_to_texture='teapot_texture.jpg';
gui = Controller(gui, teapot, renderer, scene, camera, path_to_texture, plane, light, helper);

//scene.add(gui);


function animate() {
	requestAnimationFrame( animate );
	teapot.rotation.x += 0.01;
	teapot.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();




