import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ThreeGrid from "./Component/ThreeGrid";
import "./App.css";
import { BiSolidDownArrow, BiSolidLeftArrow } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { TfiSave } from "react-icons/tfi";
import { FaEraser } from "react-icons/fa";
import axios from "axios";
import FileSaver from "file-saver";
const apiUrl = "https://www.api.restaurantservice.online/api/build-map/";
function App() {
  const [gridKey, setGridKey] = useState(0);
  const [objects, setObjects] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [count, setCount] = useState(0);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDropdown2DVisible, setDropdown2DVisible] = useState(false);
  const width = 5000;
  const height = 5000;
  const maxX = 100;
  const maxY = 100;
  const labelOffset = 5;
  const gridSize = 50;
  const [draggedObject, setDraggedObject] = useState(null); // State to track the dragged object
  const [updateObject, setUpdateObject] = useState(null);
  const svgRef = useRef(null);
  const xAxis = Array.from({ length: maxX + 1 });
  const yAxis = Array.from({ length: maxY + 1 });
  const [selectedItem, setSelectedItem] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 });
  // const degreeToRadian = (degree) => (degree / 180) * Math.PI;
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}get-all-object`);
      const responsedata = response.data;
      const data = responsedata.data;

      // Sử dụng await để đảm bảo setObjects đã hoàn tất trước khi đi tiếp
      await setObjects(data);
      console.log(objects);
      setCount(responsedata.count);
      setGridKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateObjectInApi = async (objectId, updatedObjectData) => {
    try {
      await axios.put(`${apiUrl}update-object/${objectId}`, updatedObjectData);
      await fetchData();
    } catch (error) {
      console.error("Error updating object:", error);
    }
  };
  const deleteObject = async (objectId) => {
    try {
      await axios.delete(`${apiUrl}delete-object/${objectId}`);
      await fetchData();
    } catch (error) {
      console.error("Error deleting object:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggle3DDropdown = () => {
    setDropdownVisible(true);
    setDropdown2DVisible(false);
    fetchData();
  };

  const toggle2DDropdown = () => {
    setDropdown2DVisible(true);
    setDropdownVisible(false);
  };
  const handleSaveClick = () => {
    const jsonData = JSON.stringify(objects, null, 2); // Convert the objects array to JSON format
    const blob = new Blob([jsonData], { type: "text/json" }); // Create a Blob with the JSON data
    FileSaver.saveAs(blob, "exported_data.txt"); // Save the Blob as a file
  };

  //ITEM MODEL
  const handleAddClick = () => {
    // Toggle the state to show/hide the images
    setShowImages((prevShowImages) => !prevShowImages);
    setResizingActive(false);
    setObjectInfo(null);
  };
  const handleItemClick = (name) => {
    setSelectedItem(name);
  };

  const handleCoordinateChange = (e) => {
    // Cập nhật giá trị của coordinates khi người dùng nhập liệu vào các trường x, y, z.
    setCoordinates({
      ...coordinates,
      [e.target.name]: parseInt(e.target.value, 10) || null,
    });
  };
  const addObjects = async (newObject) => {
    try {
      // Gửi dữ liệu lên server Node.js bằng Axios
      const response = await axios.post(`${apiUrl}add-object`, newObject);
      await fetchData();
      // Xử lý dữ liệu phản hồi từ server
      console.log(response.data);
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
    }
  };
  const handleSubmit = () => {
    // Tạo đối tượng mới tùy thuộc vào loại đối tượng được chọn
    let newObject;
    if (selectedItem === "Table") {
      newObject = {
        rotation: 0,
        type: 0,
        shapeType: "table",
        width: 10,
        height: 4,
        depth: 10,
        x: coordinates.x,
        y: 0,
        z: coordinates.z,
        color: "#784c35",
        text: "Table",
        path: "/Items/Table/scene.gltf",
      };
    } else if (selectedItem === "Wall") {
      newObject = {
        rotation: 0,
        type: 0,
        shapeType: "wall",
        width: 1,
        height: 20,
        depth: 5,
        x: coordinates.x,
        y: 10,
        z: coordinates.z,
        color: "#e57f58",
        text: "Wall",
        path: "",
      };
    } else if (selectedItem === "Flower-bed") {
      newObject = {
        rotation: 0,
        type: 0,
        shapeType: "flower_bed",
        width: 2,
        height: 5,
        depth: 2,
        x: coordinates.x,
        y: 0,
        z: coordinates.z,
        color: "#958c8b",
        text: "Flower Bed",
        path: "/Items/Flower_bed/scene.gltf",
      };
    }
    addObjects(newObject);
    setSelectedItem(null);
    setCoordinates({ x: 0, y: 0, z: 0 });
  };

  //2D
  const handleMouseDown = (e, obj) => {
    if (eraserActive && obj && obj.id) {
      deleteObject(obj.id);
    } else if (resizingActive && obj && obj.id) {
      getObjectInfo(obj.id);
      console.log(objectInfo);
    } else {
      // Set the dragged object when mouse down
      setDraggedObject(obj);
    }
  };

  const handleMouseMove = (e) => {
    if (draggedObject) {
      // Update the position of the dragged object based on mouse movement
      const newObjects = objects.map((obj) =>
        obj.id === draggedObject.id
          ? {
              ...obj,
              x: e.nativeEvent.offsetX / gridSize,
              y:
                obj.shapeType === "wall" && obj.id === draggedObject.id
                  ? 10
                  : 0,
              z: e.nativeEvent.offsetY / gridSize,
            }
          : obj
      );
      setObjects(newObjects);
      const updatedObjectData = {
        id: draggedObject.id,
        rotation: draggedObject.rotation,
        type: draggedObject.type,
        shapeType: draggedObject.shapeType,
        width: draggedObject.width,
        height: draggedObject.height,
        depth: draggedObject.depth,
        x: e.nativeEvent.offsetX / gridSize,
        y: draggedObject.shapeType === "wall" ? 10 : 0,
        z: e.nativeEvent.offsetY / gridSize,
        color: draggedObject.color,
        text: draggedObject.text,
        path: draggedObject.path,
      };
      setUpdateObject(updatedObjectData);
    }
  };

  const handleMouseUp = () => {
    if (updateObject) {
      setDraggedObject(null);
      updateObjectInApi(updateObject.id, updateObject);
      setUpdateObject(null);
    }
  };

  const [eraserActive, setEraserActive] = useState(false);
  const handleEraseClick = () => {
    setEraserActive((prev) => !prev);
    setResizingActive(false);
    setObjectInfo(null);
  };

  //RESIZING
  const [resizingActive, setResizingActive] = useState(false);
  const [objectInfo, setObjectInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    width: "",
    height: "",
    depth: "",
    rotation: "",
    x: "",
    z: "",
  });

  const getObjectInfo = async (objectId) => {
    try {
      const response = await axios.get(`${apiUrl}get-object/${objectId}`);
      const responsedata = response.data;
      await setObjectInfo(responsedata);
    } catch (error) {
      console.error("Error fetching object information:", error);
    }
  };
  const handleResizingClick = () => {
    setResizingActive((prevResizingActive) => {
      const newResizingActive = !prevResizingActive;
      console.log(newResizingActive);

      if (newResizingActive) {
        setShowImages(false);
        setEraserActive(false);
      } else {
        setObjectInfo(null);
      }

      return newResizingActive;
    });
  };
  const handleEditClick = () => {
    setEditMode(true);
    setUpdatedData({
      width: objectInfo.width,
      height: objectInfo.height,
      depth: objectInfo.depth,
      rotation: objectInfo.rotation,
      x: objectInfo.x,
      z: objectInfo.z,
    });
  };

  const handleUpdateClick = () => {
    const updatedObjectData = {
      ...objectInfo,
      width: updatedData.width,
      height: updatedData.height,
      depth: updatedData.depth,
      rotation: updatedData.rotation,
      x: updatedData.x,
      z: updatedData.z,
    };

    // Check shapeType and adjust y for "wall"
    if (updatedObjectData.shapeType === "wall") {
      updatedObjectData.y = updatedObjectData.height / 2;
    }

    // Update object in the API
    updateObjectInApi(objectInfo.id, updatedObjectData);

    // Reset state
    setEditMode(false);
    setUpdatedData({
      width: "",
      height: "",
      depth: "",
      rotation: "",
      x: "",
      z: "",
    });
    setObjectInfo(updatedObjectData);
  };
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const cursorStyle = eraserActive
    ? "crosshair"
    : resizingActive
    ? "move"
    : "grab";
  return (
    <Router>
      <div className="App">
        <div className="flex h-screen">
          <div className="w-76 h-full p-8 bg-black">
            <h1 className="text-2xl font-semibold mb-4 text-white">PLANNER</h1>
            <div className="mt-4">
              <Link to="/3d" className="text-blue-500">
                <div
                  className={`flex gap-28 ml-[16px] w-64 h-[40px] menu text-black bg-white hover:text-[#000000] hover:bg-[#316aaa] flex items-center cursor-pointer my-5 rounded py-2 px-4 text-lg font-bold`}
                  onClick={toggle3DDropdown}
                >
                  View 3D
                  <span className="ml-2">
                    {isDropdownVisible ? (
                      <BiSolidDownArrow />
                    ) : (
                      <BiSolidLeftArrow />
                    )}
                  </span>
                </div>
              </Link>
            </div>
            {isDropdownVisible && <div></div>}
            <div className="mt-2">
              <Link to="" className="text-blue-500">
                <div
                  className={`flex gap-28 ml-[16px] w-64 h-[40px] menu text-black bg-white hover:text-[#000000] hover:bg-[#316aaa] flex items-center cursor-pointer my-5 rounded py-2 px-4 text-lg font-bold`}
                  onClick={toggle2DDropdown}
                >
                  View 2D
                  <span className="ml-2">
                    {isDropdown2DVisible ? (
                      <BiSolidDownArrow />
                    ) : (
                      <BiSolidLeftArrow />
                    )}
                  </span>
                </div>
              </Link>
            </div>
            {isDropdown2DVisible && (
              <div>
                <div className="flex flex-row gap-1">
                  <div
                    className={`flex flex-row text-[14px] gap-1 text-white block mr-2 border ${
                      showImages ? "border-white" : "border-transparent"
                    } hover:border-white rounded-full px-1 py-1 group-hover:border-white`}
                    onClick={handleAddClick}
                  >
                    <span className="mt-1">
                      <IoIosAddCircle />
                    </span>
                    Add
                  </div>
                  <div
                    className={`flex flex-row text-[14px] gap-1 text-white block mr-2 border ${
                      resizingActive ? "border-white" : "border-transparent"
                    } hover:border-white rounded-full px-1 py-1 group-hover:border-white`}
                    onClick={handleResizingClick}
                  >
                    <span className="mt-1">
                      <TfiRulerAlt2 />
                    </span>
                    Resizing
                  </div>
                  <div
                    className={`flex flex-row text-[14px] gap-1 text-white block mr-2 border ${
                      eraserActive ? "border-white" : "border-transparent"
                    } hover:border-white rounded-full px-1 py-1 group-hover:border-white`}
                    onClick={handleEraseClick}
                  >
                    <span className="mt-1">
                      <FaEraser />
                    </span>
                    Erase
                  </div>
                  <div
                    className="flex flex-row text-[14px] gap-1 text-white block mr-2 border border-transparent hover:border-white rounded-full px-1 py-1 group-hover:border-white"
                    onClick={handleSaveClick}
                  >
                    <span className="mt-1">
                      <TfiSave />
                    </span>
                    Save
                  </div>
                </div>
                {showImages && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-5 pt-5">
                      <img
                        src="/Items/Table/Dining_Table.png"
                        alt="First Image"
                        className="w-20 h-20"
                        name="Table"
                        onClick={() => handleItemClick("Table")}
                      />
                      <img
                        src="/Items/Flower_bed/bathtub_of_flower.png"
                        alt="Second Image"
                        className="w-20 h-20"
                        name="Flower-bed"
                        onClick={() => handleItemClick("Flower-bed")}
                      />
                      <img
                        src="/Items/Wall/Wall.png"
                        alt="Third Image"
                        className="w-20 h-20"
                        name="Wall"
                        onClick={() => handleItemClick("Wall")}
                      />
                    </div>
                    {selectedItem && (
                      <div className="text-white mt-10 flex flex-col gap-2 border border-white rounded px-1 py-1">
                      <form
                        className="flex flex-col gap-5 text-white"
                        onSubmit={handleSubmit}
                      >
                        <div className="flex flex-row gap-5 pt-5 text-white justify-center">
                          <label htmlFor="itemName"  className="font-bold">{selectedItem}</label>
                        </div>
                        <div className="flex flex-row gap-5">
                          <label htmlFor="x" className="mt-2">
                            X:
                          </label>
                          <input
                            className="text-black w-full border rounded px-2 py-2"
                            type="number"
                            id="x"
                            name="x"
                            value={coordinates.x}
                            onChange={handleCoordinateChange}
                          />
                        </div>
                        <div className="flex flex-row gap-5">
                          <label htmlFor="z" className="mt-2">
                            Z:
                          </label>
                          <input
                            className="text-black w-full border rounded px-2 py-2"
                            type="number"
                            id="z"
                            name="z"
                            value={coordinates.z}
                            onChange={handleCoordinateChange}
                          />
                        </div>
                        <div
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                          onClick={handleSubmit}
                        >
                          Submit
                        </div>
                      </form>
                      </div>
                    )}
                  </div>
                )}
                {resizingActive && objectInfo && (
                  <div className="object-info-form text-white mt-10 flex flex-col gap-2 border border-white rounded px-1 py-1">
                    <h3>Object Information</h3>
                    <form className="flex flex-col gap-5">
                      <div className="form-group flex flex-row gap-2">
                        <label htmlFor="objectType">Object Type:</label>
                        <div className="flex flex-row gap-5 text-white">
                          <label htmlFor="itemName">
                            {objectInfo.shapeType}
                          </label>
                        </div>
                      </div>
                      <div className="form-group flex flex-row gap-5">
                        <label className="mt-1" htmlFor="objectWidth">
                          Width:
                        </label>
                        <div className="mr-2">
                          <input
                            className="text-black w-36 border rounded px-1 py-1"
                            type="text"
                            id="objectWidth"
                            name="objectWidth"
                            value={
                              editMode ? updatedData.width : objectInfo.width
                            }
                            readOnly={!editMode}
                            onChange={(e) => handleInputChange(e, "width")}
                          />
                          <label className="mt-1" htmlFor="objectWidth">
                            *5 cm
                          </label>
                        </div>
                      </div>
                      <div className="form-group flex flex-row gap-5">
                        <label className="mt-1" htmlFor="objectHeight">
                          Height:
                        </label>
                        <div className="mr-2">
                          <input
                            className="text-black w-36 border rounded px-1 py-1"
                            type="text"
                            id="objectHeight"
                            name="objectHeight"
                            value={
                              editMode ? updatedData.height : objectInfo.height
                            }
                            readOnly={!editMode}
                            onChange={(e) => handleInputChange(e, "height")}
                          />
                          <label className="mt-1" htmlFor="objectWidth">
                            *5 cm
                          </label>
                        </div>
                      </div>
                      <div className="form-group flex flex-row gap-5">
                        <label className="mt-1" htmlFor="objectDepth">
                          Depth:
                        </label>
                        <div className="mr-2">
                          <input
                            className="text-black w-36 border rounded px-1 py-1"
                            type="text"
                            id="objectDepth"
                            name="objectDepth"
                            value={
                              editMode ? updatedData.depth : objectInfo.depth
                            }
                            readOnly={!editMode}
                            onChange={(e) => handleInputChange(e, "depth")}
                          />
                          <label className="mt-1" htmlFor="objectWidth">
                            *5 cm
                          </label>
                        </div>
                      </div>
                      <div className="form-group flex flex-row gap-5">
                        <label className="mt-1" htmlFor="objectRotation">
                          Rotation:
                        </label>
                        <div className="mr-2">
                          <input
                            className="text-black w-36 border rounded px-1 py-1"
                            type="text"
                            id="objectRotation"
                            name="objectRotation"
                            value={
                              editMode
                                ? updatedData.rotation
                                : objectInfo.rotation
                            }
                            readOnly={!editMode}
                            onChange={(e) => handleInputChange(e, "rotation")}
                          />
                          <label className="mt-1" htmlFor="objectWidth">
                            độ
                          </label>
                        </div>
                      </div>
                      <div className="form-group flex flex-row gap-5">
                        <label className="mt-1" htmlFor="objectX">
                          X:
                        </label>
                        <div className="mr-2">
                          <input
                            className="text-black w-36 border rounded px-1 py-1"
                            type="text"
                            id="objectX"
                            name="objectX"
                            value={editMode ? updatedData.x : objectInfo.x}
                            readOnly={!editMode}
                            onChange={(e) => handleInputChange(e, "x")}
                          />
                          <label className="mt-1" htmlFor="objectWidth">
                            *5 cm
                          </label>
                        </div>
                      </div>
                      <div className="form-group flex flex-row gap-5">
                        <label className="mt-1" htmlFor="objectZ">
                          Z:
                        </label>
                        <div className="mr-2">
                          <input
                            className="text-black w-36 border rounded px-1 py-1"
                            type="text"
                            id="objectZ"
                            name="objectZ"
                            value={editMode ? updatedData.z : objectInfo.z}
                            readOnly={!editMode}
                            onChange={(e) => handleInputChange(e, "z")}
                          />
                          <label className="mt-1" htmlFor="objectWidth">
                            *5 cm
                          </label>
                        </div>
                      </div>
                      <div
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={() => {
                          if (editMode) {
                            handleUpdateClick();
                          } else {
                            handleEditClick();
                          }
                        }}
                      >
                        {editMode ? "UPDATE" : "EDIT"}
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-full p-10 overflow-auto">
            <Routes>
              <Route
                path="/3d"
                element={
                  <ThreeGrid
                    key={gridKey}
                    Width={maxX}
                    Depth={maxY}
                    objects={objects}
                  />
                }
              />
              {/* <Route path="/2d" element={<Plane />} /> */}
            </Routes>
            {isDropdown2DVisible && (
              <div
                className="w-full h-full p-4 relative transform scale-[0.3] origin-top-left"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                <svg
                  ref={svgRef}
                  width={width}
                  height={height}
                  className="z-10"
                  style={{ cursor: cursorStyle }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  {xAxis.map((_, i) => (
                    <g key={`grid-x-${i}`}>
                      <line
                        x1={i * gridSize}
                        y1={0}
                        x2={i * gridSize}
                        y2={height}
                        stroke="gray"
                        strokeWidth="0.5"
                      />
                    </g>
                  ))}
                  {yAxis.map((_, i) => (
                    <g key={`grid-y-${i}`}>
                      <line
                        x1={0}
                        y1={i * gridSize}
                        x2={width}
                        y2={i * gridSize}
                        stroke="gray"
                        strokeWidth="0.5"
                      />
                    </g>
                  ))}

                  <line x1={0} y1={0} x2={width} y2={0} stroke="black" />
                  {xAxis.map((_, i) => (
                    <g key={`x-${i}`}>
                      <line
                        x1={i * gridSize}
                        y1={-labelOffset}
                        x2={i * gridSize}
                        y2={labelOffset}
                        stroke="black"
                      />
                    </g>
                  ))}

                  <line x1={0} y1={0} x2={0} y2={height} stroke="black" />
                  {yAxis.map((_, i) => (
                    <g key={`y-${i}`}>
                      <line
                        x1={-labelOffset}
                        y1={i * gridSize}
                        x2={labelOffset}
                        y2={i * gridSize}
                        stroke="black"
                      />
                    </g>
                  ))}

                  {objects.map((obj) => (
                    <g
                      key={obj.id}
                      onMouseDown={(e) => handleMouseDown(e, obj)} // Attach mouse down event
                      style={{ cursor: "grab" }}
                    >
                      {obj.shapeType === "wall" ? (
                        <>
                          <rect
                            x={(obj.x - obj.width / 2) * gridSize}
                            y={(obj.z - obj.depth / 2) * gridSize}
                            width={obj.width * gridSize}
                            height={obj.depth * gridSize}
                            fill={`${obj.color}`}
                            transform={`rotate(${-obj.rotation}, ${
                              obj.x * gridSize
                            }, ${obj.z * gridSize})`}
                          />
                          <text
                            x={obj.x * gridSize}
                            y={obj.z * gridSize}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize={14}
                            fill="#000000"
                          >
                            {obj.text}
                          </text>
                        </>
                      ) : obj.shapeType === "table" ? (
                        <>
                          <rect
                            x={obj.x * gridSize}
                            y={(obj.z - obj.depth / 2) * gridSize}
                            width={obj.width * gridSize}
                            height={obj.depth * gridSize}
                            fill={`${obj.color}`}
                            transform={`rotate(${-obj.rotation}, ${
                            obj.x * gridSize
                            }, ${obj.z * gridSize})`}
                          />
                          <text
                            x={(obj.x + obj.width / 2) * gridSize}
                            y={obj.z * gridSize}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize={20}
                            fill="#000000"
                          >
                            {obj.text}
                          </text>
                        </>
                      ) : obj.shapeType === "flower_bed" ? (
                        <>
                          <rect
                            x={(obj.x - obj.width / 2) * gridSize}
                            y={(obj.z - obj.depth / 2) * gridSize}
                            width={obj.width * gridSize}
                            height={obj.depth * gridSize}
                            fill={`${obj.color}`}
                            transform={`rotate(${-obj.rotation}, ${
                              obj.x * gridSize
                            }, ${obj.z * gridSize})`}
                          />
                          <text
                            x={obj.x * gridSize}
                            y={obj.z * gridSize}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize={14}
                            fill="#000000"
                          >
                            {obj.text}
                          </text>
                        </>
                      ) : null}
                    </g>
                  ))}
                </svg>

                {xAxis.map((_, i) => (
                  <div
                    key={`x-label-${i}`}
                    className="absolute left-0 text-[10px]"
                    style={{
                      left: `${i * gridSize + 12}px`,
                      top: `-${labelOffset}px`,
                    }}
                  >
                    {i}
                  </div>
                ))}

                {yAxis.map((_, i) => (
                  <div
                    key={`y-label-${i}`}
                    className="absolute top-0 text-[10px]"
                    style={{
                      left: `-${labelOffset}px`,
                      top: `${i * gridSize + 12}px`,
                    }}
                  >
                    {i}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
