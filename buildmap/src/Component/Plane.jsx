import React, { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from 'axios';
const Plane = () => {
  const width = 5000;
  const height = 5000;
  const maxX = 100;
  const maxY = 100;
  const labelOffset = 5;
  const gridSize = 50;
  const [objects, setObjects] = useState([]); // State to store objects
  const [draggedObject, setDraggedObject] = useState(null); // State to track the dragged object
  const svgRef = useRef(null);
  const xAxis = Array.from({ length: maxX + 1 });
  const yAxis = Array.from({ length: maxY + 1 });
  const degreeToRadian = (degree) => (degree / 180) * Math.PI;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getData");
        const data = await response.json();
        setObjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const saveObjectsToFile = () => {
    // Chuyển đối tượng thành chuỗi JSON
    const dataToSave = JSON.stringify(objects, null, 2);

    // Gửi dữ liệu lên server Node.js
    fetch('http://localhost:3001/saveFile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: dataToSave }),
    })
    .then(response => response.text())
    .then(message => console.log(message))
    .catch(error => console.error(error));
};
  const handleMouseDown = (e, obj) => {
    // Set the dragged object when mouse down
    setDraggedObject(obj);
    //console.log(obj);
    // console.log(objects);
  };

  const handleMouseMove = (e) => {
    if (draggedObject) {
      // Update the position of the dragged object based on mouse movement
      const newObjects = objects.map((obj) =>
        obj.id === draggedObject.id
          ? {
              ...obj,
              position: {
                x: e.nativeEvent.offsetX / gridSize,
                y: obj.type === "wall" && obj.id === draggedObject.id ? 10 : 0,
                z: e.nativeEvent.offsetY / gridSize,
              },
            }
          : obj
      );
      setObjects(newObjects);
    }
    //console.log(objects);
  };

  const handleMouseUp = () => {
    // Reset the dragged object when mouse up
    setDraggedObject(null);
    saveObjectsToFile();
  };
  return (
    <div
      className="w-full h-full p-4 relative transform scale-[0.3] origin-top-left"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <svg ref={svgRef} width={width} height={height} className="z-10">
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
            {obj.type === "wall" ? (
              <>
                <rect
                  x={(obj.position.x - obj.width / 2) * gridSize}
                  y={(obj.position.z - obj.depth / 2) * gridSize}
                  width={obj.width * gridSize}
                  height={obj.depth * gridSize}
                  fill={`${obj.color}`}
                  transform={`rotate(${-obj.rotation}, ${(obj.position.x) * gridSize}, ${(obj.position.z)* gridSize})`}
                />
                <text
                  x={obj.position.x * gridSize}
                  y={obj.position.z * gridSize}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize={14}
                  fill="#000000"
                >
                  {obj.text}
                </text>
              </>
            ) : obj.type === "table" ? (
              <>
                <rect
                  x={obj.position.x * gridSize}
                  y={(obj.position.z - obj.depth / 2) * gridSize}
                  width={obj.width * gridSize}
                  height={obj.depth * gridSize}
                  fill={`${obj.color}`}
                />
                <text
                  x={(obj.position.x + obj.width / 2) * gridSize}
                  y={obj.position.z * gridSize}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize={20}
                  fill="#000000"
                >
                  {obj.text}
                </text>
              </>
            ) : obj.type === "flower_bed" ? (
              <>
                <rect
                  x={(obj.position.x - obj.width / 2) * gridSize}
                  y={(obj.position.z - obj.depth / 2) * gridSize}
                  width={obj.width * gridSize}
                  height={obj.depth * gridSize}
                  fill={`${obj.color}`}
                />
                <text
                  x={obj.position.x * gridSize}
                  y={obj.position.z * gridSize}
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
          style={{ left: `${i * gridSize + 12}px`, top: `-${labelOffset}px` }}
        >
          {i}
        </div>
      ))}

      {yAxis.map((_, i) => (
        <div
          key={`y-label-${i}`}
          className="absolute top-0 text-[10px]"
          style={{ left: `-${labelOffset}px`, top: `${i * gridSize + 12}px` }}
        >
          {i}
        </div>
      ))}
    </div>
  );
};

export default Plane;
