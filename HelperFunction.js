// class Person {
//     name;
  
//     constructor(name) {
//       this.name = name;
//     }
  
//     introduceSelf() {
//       console.log(`Hi! I'm ${this.name}`);
//     }
// }

import * as THREE from 'three';
//import {GUI} from 'dat.gui';
import * as dat from 'https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js';

function Controller(gui, object, renderer, scene, camera, path_to_texture, plane, light, helper){
    const Scale={
        ScaleX: 1,
        ScaleY: 1,
        ScaleZ: 1
    }

    const Object_Position={
        PositionX: 0,
        PositionY: 0,
        PositionZ: 0
    }

    const Camera_Position={
        PositionX: 0,
        PositionY: 0,
        PositionZ: 10
    }
    
    const Segments={
        widthSegments: 1,
        heightSegment: 1,
        depthSegments: 1
    }
    const wireframe={
        option: false
    }

    const Light = {
        option: false
    }

    const DirectionalLightHelper={
        option: false
    }

    

    const Light_Position={
        PositionX: 0,
        PositionY: 5,
        PositionZ: 1
    }

    const Texture={
        option: false
    }

    const Texture_Light={
        option:false
    }

    gui.add(wireframe, 'option').name('wireframe').onChange(
        (value)=>{
            if (value){
                object.material = new THREE.MeshNormalMaterial({wireframe:true});
            }
            else{
                object.material = new THREE.MeshNormalMaterial({wireframe:false});
            }
        }
    );

    

    const Scale_Menu = gui.addFolder('Scale');
    Scale_Menu.add(Scale, 'ScaleX', 0.1, 2).name('ScaleX').onChange((value)=>{object.scale.x = value; renderer.render( scene, camera );});
    Scale_Menu.add(Scale, 'ScaleY', 0.1, 2).name('ScaleY').onChange((value)=>{object.scale.y = value; renderer.render( scene, camera );});
    Scale_Menu.add(Scale, 'ScaleZ', 0.1, 2).name('ScaleZ').onChange((value)=>{object.scale.z = value; renderer.render( scene, camera );});

    const Object_Position_Menu = gui.addFolder('Object Position');
    Object_Position_Menu.add(Object_Position, 'PositionX', -5, 5, 0.01).name('PositionX').onChange((value)=>{object.position.x = value; renderer.render(scene, camera); });
    Object_Position_Menu.add(Object_Position, 'PositionY', -5, 5, 0.01).name('PositionY').onChange((value)=>{object.position.y = value; renderer.render(scene, camera); });
    Object_Position_Menu.add(Object_Position, 'PositionZ', -5, 5, 0.01).name('PositionZ').onChange((value)=>{object.position.z = value; renderer.render(scene, camera); });

    const Camera_Position_Menu = gui.addFolder('Camera Position');
    Camera_Position_Menu.add(Camera_Position, 'PositionX', -5, 5, 0.01).name('PositionX').onChange((value)=>{camera.position.x = value; renderer.render(scene, camera); });
    Camera_Position_Menu.add(Camera_Position, 'PositionY', -5, 5, 0.01).name('PositionY').onChange((value)=>{camera.position.y = value; renderer.render(scene, camera); });
    Camera_Position_Menu.add(Camera_Position, 'PositionZ', -5, 15, 0.01).name('PositionZ').onChange((value)=>{camera.position.z = value; renderer.render(scene, camera); });



    gui.add(Light, 'option').name('DirectionalLight').onChange((value)=>{
            if (value==true){
                light.visible = true;
                object.material = new THREE.MeshStandardMaterial();
                plane.material = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide});
                light.castShadow = true;
                renderer.shadowMap.enabled = true;
                plane.receiveShadow = true;
                object.castShadow=true;
                
            }
            else{
                light.visible = false;
                object.material = new THREE.MeshNormalMaterial();
                plane.material = new THREE.MeshNormalMaterial( {side: THREE.DoubleSide} );
                light.castShadow = false;
                renderer.shadowMap.enabled = false;
                plane.receiveShadow = false;
            }
            renderer.render( scene, camera );
    });

    gui.add(DirectionalLightHelper, 'option').name('LightHelper').onChange((value)=>{
        if (value==true){
            helper.visible = true;
        }
        else{
            helper.visible = false;
        }
        renderer.render( scene, camera );
});

    

    const Light_Position_Menu = gui.addFolder('Light Position');
    Light_Position_Menu.add(Light_Position, 'PositionX', -30, 30, 0.1).name('X').onChange((value)=>{light.position.x=value;});
    Light_Position_Menu.add(Light_Position, 'PositionY', -30, 30, 0.1).name('Y').onChange((value)=>{light.position.y=value;});
    Light_Position_Menu.add(Light_Position, 'PositionZ', -30, 30, 0.1).name('Z').onChange((value)=>{light.position.z=value;});
    

    gui.add(Texture, 'option').name('Texture').onChange(
        (value)=>{
            if (value){
                const texture = new THREE.TextureLoader().load( path_to_texture ); 
                object.material = new THREE.MeshBasicMaterial( { map:texture } );
            }
            else{
                object.material = new THREE.MeshNormalMaterial();
            }
            renderer.render( scene, camera );

        }
    );

    gui.add(Texture_Light, 'option').name('Texture and Light').onChange(
        (value)=>{
            if (value){
                const texture = new THREE.TextureLoader().load( path_to_texture ); 
                object.material = new THREE.MeshStandardMaterial( { map:texture } );
                plane.material = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide});
                light.visible = true;
               // object.material = new THREE.MeshPhongMaterial();
                light.castShadow = true;
                renderer.shadowMap.enabled = true;
                plane.receiveShadow = true;
                object.castShadow=true;
            }
            else{
                object.material = new THREE.MeshNormalMaterial();
                plane.material = new THREE.MeshNormalMaterial( {side: THREE.DoubleSide} );

                light.visible = false;
            }

        }
    );
    
    return gui;
}
export {Controller};