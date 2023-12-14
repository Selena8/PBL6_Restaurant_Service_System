import React, {useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import helvetikerFont from "three/examples/fonts/helvetiker_bold.typeface.json";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const ThreeGrid = ({ Width, Depth,objects}) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff);

  useEffect(() => {
    const container = document.getElementById("grid-container");
    const controls = new OrbitControls(camera, container);
    controls.enableRotate = true;
    controls.enableZoom = true;

    const gridWidth = Width;
    const gridDepth = Depth;

    // Tạo lưới 3D
    const gridSize = 1;
    for (let i = 0; i <= gridWidth; i += gridSize) {
      const gridLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i, 0, 0),
          new THREE.Vector3(i, 0, gridDepth),
        ]),
        new THREE.LineBasicMaterial({ color: 0x000000 })
      );
      scene.add(gridLine);
    }

    for (let i = 0; i <= gridDepth; i += gridSize) {
      const gridLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, i),
          new THREE.Vector3(gridWidth, 0, i),
        ]),
        new THREE.LineBasicMaterial({ color: 0x000000 })
      );
      scene.add(gridLine);
    }

    // Tạo và hiển thị ruler và chỉ số
    createRuler(scene, gridWidth, gridDepth, gridSize);
    createIndices(scene, gridWidth, gridDepth, gridSize);

    // Tạo trục toạ độ
    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);


    // Hiển thị các đối tượng trong scene
    displayObjects(scene, objects);

    // Thiết lập camera và renderer
    const updateCamera = () => {
      camera.position.set(80,45, 80);
      camera.lookAt(0, 0, 0);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
    };

    updateCamera();
    renderer.setSize(1000, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Render scene
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, [Width, Depth,objects]);

  return (
    <div className="w-full h-screen" id="grid-container">
      <style>
        {`
          #grid-container {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

// Hàm tạo lưới và ruler
const createRuler = (scene, gridWidth, gridDepth, gridSize) => {
  const widthRuler = new THREE.Group();
  const widthRulerLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(gridWidth, 0, 0),
    ]),
    new THREE.LineBasicMaterial({ color: 0xff0000 })
  );
  widthRuler.add(widthRulerLine);
  scene.add(widthRuler);

  const depthRuler = new THREE.Group();
  const depthRulerLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, gridDepth),
    ]),
    new THREE.LineBasicMaterial({ color: 0x0000ff })
  );
  depthRuler.add(depthRulerLine);
  scene.add(depthRuler);
};

// Hàm tạo và hiển thị chỉ số
const createIndices = (scene, gridWidth, gridDepth, gridSize) => {
  for (let i = 0; i <= gridWidth; i += gridSize) {
    const textGeometry = new TextGeometry(i.toString(), {
      font: new FontLoader().parse(helvetikerFont),
      size: 0.2,
      height: 0.01,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(i, -0.2, -0.2);
    scene.add(textMesh);
  }

  for (let i = 0; i <= gridDepth; i += gridSize) {
    const textGeometry = new TextGeometry(i.toString(), {
      font: new FontLoader().parse(helvetikerFont),
      size: 0.2,
      height: 0.01,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-0.2, -0.2, i);
    scene.add(textMesh);
  }
};

// Hàm hiển thị các đối tượng trong scene
const displayObjects = (scene, objects) => {
  console.log(objects);
  const gltfLoader = new GLTFLoader();

  objects.forEach((object) => {
    if (object.shapeType === "wall") {
      const wallGeometry = new THREE.BoxGeometry(
        object.width,
        object.height,
        object.depth
      );
      const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xe57f58 });
    
      // Create edges geometry
      const edgesGeometry = new THREE.EdgesGeometry(wallGeometry);
      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
      const edgesMesh = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    
      // Create the main wall mesh
      const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    
      // Set positions and rotations
      const radians = THREE.MathUtils.degToRad(object.rotation);
      wallMesh.position.set(
        object.x,
        object.y,
        object.z
      );
      wallMesh.rotation.set(0, radians, 0);
      edgesMesh.position.set(
        object.x,
        object.y,
        object.z
      );
      edgesMesh.rotation.set(0, radians, 0);
    
      // Add both the wall and edges to the scene
      scene.add(wallMesh);
      scene.add(edgesMesh);
    } else if (object.shapeType=== "table") {
      gltfLoader.load(object.path, (gltf) => {
        const model = gltf.scene;
        const radians = THREE.MathUtils.degToRad(object.rotation);
        model.position.set(
          object.x,
          object.y,
          object.z
        );
        model.rotation.set(0, radians, 0);
        // Tính toán tỷ lệ thay đổi kích thước để đạt được chiều rộng, chiều cao và chiều sâu
        const desiredWidth = object.width;
        const desiredHeight = object.height;
        const desiredDepth = object.depth;

        const currentBoundingBox = new THREE.Box3().setFromObject(model);
        const currentWidth =
          currentBoundingBox.max.x - currentBoundingBox.min.x;
        const currentHeight =
          currentBoundingBox.max.y - currentBoundingBox.min.y;
        const currentDepth =
          currentBoundingBox.max.z - currentBoundingBox.min.z;

        const scaleX = desiredWidth / currentWidth;
        const scaleY = desiredHeight / currentHeight;
        const scaleZ = desiredDepth / currentDepth;
        model.scale.set(scaleX, scaleY, scaleZ);

        // Add the model to your scene
        scene.add(model);
        // Define colors for different parts
        const Color_Brown = new THREE.MeshBasicMaterial({ color: 0x784c35 });
        const Color_Black = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const Color_Blue = new THREE.MeshBasicMaterial({ color: 0x485464 });
        const Color_White = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const transparentMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
        });
        // Add more colors as needed
        model.traverse((child) => {
          if (child.isMesh) {
            if (child.name === "Box016_03_-_Default_0") {
              child.material = Color_Brown;
            } else if (child.name === "Box024_03_-_Default_0") {
              child.material = Color_Brown;
            } else if (child.name === "Box008_03_-_Default_0") {
              child.material = Color_Brown;
            } else if (child.name === "Box032_03_-_Default_0") {
              child.material = Color_Brown;
            } else if (child.name === "Cylinder001_01_-_Default_0") {
              child.material = Color_Black;
            } else if (child.name === "Cylinder002_02_-_Default_0") {
              child.material = Color_Blue;
            } else if (child.name === "Plane001_07_-_Default_0") {
              child.material = transparentMaterial;
            }
          }
        });

        //Tính toán và in ra kích thước
        const boundingBox = new THREE.Box3();
        boundingBox.setFromObject(model);

        const width = boundingBox.max.x - boundingBox.min.x;
        const height = boundingBox.max.y - boundingBox.min.y;
        const depth = boundingBox.max.z - boundingBox.min.z;
      });
    } else if (object.shapeType === "flower_bed") {
      gltfLoader.load(object.path, (gltf) => {
        const model = gltf.scene;
        const radians = THREE.MathUtils.degToRad(object.rotation);
        model.position.set(
          object.x,
          object.y,
          object.z
        );
        model.rotation.set(0, radians, 0);
        // Tính toán tỷ lệ thay đổi kích thước để đạt được chiều rộng, chiều cao và chiều sâu 
        const desiredWidth = object.width;
        const desiredHeight = object.height;
        const desiredDepth = object.depth;

        const currentBoundingBox = new THREE.Box3().setFromObject(model);
        const currentWidth =
          currentBoundingBox.max.x - currentBoundingBox.min.x;
        const currentHeight =
          currentBoundingBox.max.y - currentBoundingBox.min.y;
        const currentDepth =
          currentBoundingBox.max.z - currentBoundingBox.min.z;

        const scaleX = desiredWidth / currentWidth;
        const scaleY = desiredHeight / currentHeight;
        const scaleZ = desiredDepth / currentDepth;
        model.scale.set(scaleX, scaleY, scaleZ);

        // Add the model to your scene
        scene.add(model);
        // Define colors for different parts
        const Color_Brown = new THREE.MeshBasicMaterial({ color: 0x958c8b });
        const Color_Pubble = new THREE.MeshBasicMaterial({ color: 0x523073 });
        const transparentMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
        });
        // Add more colors as needed

        // Traverse through the model's hierarchy and set colors based on the part's name or other criteria
        model.traverse((child) => {
          if (child.isMesh) {
            // Check the name of the part or other criteria to determine which color to use
            if (child.name === "GardenUrn_GardenUrn_0") {
              child.material = Color_Brown;
            } else if (child.name === "Frowers_Flowers_0") {
              child.material = Color_Pubble;
            }
          }
        });

        //Tính toán và in ra kích thước
        const boundingBox = new THREE.Box3();
        boundingBox.setFromObject(model);

        const width = boundingBox.max.x - boundingBox.min.x;
        const height = boundingBox.max.y - boundingBox.min.y;
        const depth = boundingBox.max.z - boundingBox.min.z;
      });
    }
  });
};

export default ThreeGrid;
