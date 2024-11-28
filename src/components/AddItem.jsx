import React, { useContext, useState } from "react";
import { FaRegFileImage, FaRegUser } from "react-icons/fa";
import { addItem } from "../fireBase/fireBaseUtils";
import { validateAddItemForm } from "../utils/validateForms";
import { UserContext } from "../contexts/UserContextProvider";
import { v4 as uuidv4 } from "uuid"; 

const AddItem = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { userData } = useContext(UserContext);
  if (!userData) {
    return <div>Loading user data...</div>; 
  }
  const [formData, setFormData] = useState({
    brand: "",
    year: "",
    itemName: "",
    state: "",
    place: "",
    zipCode: "",
    description: "",
    price: "",
    username: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateAddItemForm(formData, selectedImage);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const itemId = uuidv4()
    const {
      brand,
      year,
      itemName,
      state,
      place,
      zipCode,
      description,
      price,
      username,
      phone,
    } = formData;

    try {
      await addItem(
        brand,
        year,
        itemName,
        itemId,
        state,
        place,
        zipCode,
        description,
        price,
        username,
        phone,
        selectedImage,
        userData?.uid
      );
      setFormData({
        brand: "",
        year: "",
        itemName: "",
        state: "",
        place: "",
        zipCode: "",
        description: "",
        price: "",
        username: "",
        phone: "",
      });
      setSelectedImage(null);
      setImagePreview(null);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="flex justify-center mb-10">
      <form className="flex flex-col mt-10 rounded-md w-full sm:w-10/12 md:w-8/12 lg:w-7/12 bg-white shadow-md">
        <h1 className="font-semibold text-xl p-5 border-b border-gray-300">
          POST YOUR AD
        </h1>
        <h1 className="font-semibold text-xl p-5">INCLUDE SOME DETAILS</h1>
        <div className="px-5 pb-5 border-b border-gray-300">
          <div className="mb-5">
            <label className="flex gap-2 align-middle mb-2 font-medium">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none"
            />
            {errors.brand && (
              <span className="text-red-500 text-sm">{errors.brand}</span>
            )}
          </div>
          <div className="mb-5">
            <label className="flex gap-3 mb-2 font-medium">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year"
              className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none"
            />
            {errors.year && (
              <span className="text-red-500 text-sm">{errors.year}</span>
            )}
          </div>
          <div className="mb-5">
            <label className="flex gap-3 mb-2 font-medium">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Item Name"
              className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none"
            />
            {errors.itemName && (
              <span className="text-red-500 text-sm">{errors.itemName}</span>
            )}
          </div>

          <div className="mb-5 flex flex-row align-middle gap-4">
            <div>
              <label className="flex gap-3 mb-2 font-medium">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none"
              />
              {errors.state && (
                <span className="text-red-500 text-sm">{errors.state}</span>
              )}
            </div>

            <div>
              <label className="flex gap-3 mb-2 font-medium">Place</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="Place"
                className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none"
              />
              {errors.place && (
                <span className="text-red-500 text-sm">{errors.place}</span>
              )}
            </div>

            <div>
              <label className="flex gap-3 mb-2 font-medium">Zip Code</label>
              <input
                type="number"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none"
              />
              {errors.zipCode && (
                <span className="text-red-500 text-sm">{errors.zipCode}</span>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label className="flex gap-3 mb-2 font-medium">Description</label>
            <textarea
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>
        </div>
        <h1 className="font-semibold text-xl p-5">SET A PRICE</h1>
        <div className="px-5 pb-5 border-b border-gray-300">
          <label className="flex gap-3 mb-2 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 text-lg border border-gray-300 rounded-md outline-none"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price}</span>
          )}
        </div>
        <h1 className="font-semibold text-xl p-5">ADD IMAGES</h1>
        <div className="px-5 pb-5 border-b border-gray-300 flex items-center gap-8">
          <div className="border-2 border-gray-300 h-32 w-32 flex justify-center items-center rounded-md">
            <label className="text-4xl text-gray-500 cursor-pointer">
              <FaRegFileImage />
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          {imagePreview ? (
            <div className="border-2 border-gray-300 h-32 w-32 flex justify-center items-center rounded-md">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image}</span>
          )}
        </div>

        <h1 className="font-semibold text-xl p-5">REVIEW YOUR DETAILS</h1>
        <div className="px-5 pb-5 flex gap-8 border-b border-gray-300">
          <div className="flex justify-center items-center text-4xl text-gray-500">
            <div className="border-2 border-gray-300 p-5 rounded-full">
              <FaRegUser />
            </div>
          </div>
          <div className="flex flex-col w-full gap-5">
            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium flex gap-3">Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Name"
                className="p-3 text-lg border border-gray-300 rounded-md outline-none w-full"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium flex gap-3">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="p-3 text-lg border border-gray-300 rounded-md outline-none  w-full"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="m-6 bg-black px-5 py-3 rounded-md text-white font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItem;
