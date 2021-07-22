function main() {
  const canvas = document.querySelector('#bg');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  //Sceen
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('lightblue');


  // //Cube
  // const cube = new THREE.Mesh(
  //   new THREE.BoxBufferGeometry(3, 3, 3),
  //   new THREE.MeshPhongMaterial({color: 'red'}),
  // );
  // scene.add(cube);

  //Earth

  const sphere = new THREE.Mesh(new THREE.
    SphereGeometry(5, 50, 50), new THREE.
    MeshBasicMaterial({
      map: new THREE.TextureLoader().load(
        './img/earth.jpg'
      )
    }))
    scene.add( sphere );

    //Atmosphere

    const atmosphere = new THREE.Mesh(new THREE.
      SphereGeometry(5.3, 50, 50), new THREE.
      MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          './img/cloud.png'
        ),transparent: true, opacity: 0.5, color: 0xFFFFFF
      }))
      scene.add( atmosphere );



  //Light


  function addLight(...pos) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
  }
  addLight(-1, 2, 4);
  addLight( 1, -1, -2);

  

  //Helpers

  const gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);
  gridHelper.position.set(0, -5, 0);


  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }



  

 

  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
      
    atmosphere.rotation.y += 0.001;



    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();