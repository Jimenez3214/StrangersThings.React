import React, { useState } from "react";

const EditListing = ({ token, postId, handleEdit }) => {
  const [editedData, setEditedData] = useState({
    description: "",
    price: "",
    location: "",
  });

  const handleSave = async () => {
    const payload = {
      description: editedData.description,
      price: editedData.price,
      location: editedData.location,
    };

    await handleEdit(postId, payload);
    setEditedData({
      description: "",
      price: "",
      location: "",
    });
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      <p>
        Description:
        <input
          type="text"
          value={editedData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </p>
      <p>
        Price:
        <input
          type="text"
          value={editedData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
        />
      </p>
      <p>
        Location:
        <input
          type="text"
          value={editedData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </p>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditListing;
