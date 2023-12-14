import React, { useState } from "react";

const Item_Model = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 });

  const handleItemClick = (name) => {
    setSelectedItem(name);
    // Nếu bạn muốn thực hiện một số logic khác khi click vào mỗi hình ảnh, bạn có thể thêm nó ở đây.
  };

  const handleCoordinateChange = (e) => {
    // Cập nhật giá trị của coordinates khi người dùng nhập liệu vào các trường x, y, z.
    setCoordinates({ ...coordinates, [e.target.name]: parseInt(e.target.value, 10) || null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện các hành động bạn muốn với thông tin được nhập và tên của mục đã chọn ở đây.
    console.log("Selected Item:", selectedItem);
    console.log("Coordinates:", coordinates);
    // Đặt selectedItem và coordinates về giá trị mặc định để ẩn form sau khi đã xử lý.
    setSelectedItem(null);
    setCoordinates({ x: 0, y: 0, z: 0 });
  };

  return (
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
        name="Flower_Bed"
        onClick={() => handleItemClick("Flower_Bed")}
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
        <form className="flex flex-col gap-5 text-white" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-5 pt-5 text-white"> 
            <label htmlFor="itemName">{selectedItem}</label>
          </div>
          <div className="flex flex-row gap-2">
            <label htmlFor="x">X    :</label>
            <input
              className="text-black"
              type="number"
              id="x"
              name="x"
              value={coordinates.x}
              onChange={handleCoordinateChange}
            />
          </div>
          <div className="flex flex-row gap-2"> 
            <label htmlFor="z">Y    :</label>
            <input
              className="text-black"
              type="number"
              id="z"
              name="z"
              value={coordinates.z}
              onChange={handleCoordinateChange}
            />
          </div>
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Item_Model;
