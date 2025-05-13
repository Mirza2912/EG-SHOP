import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FloatingInput from "../../components/FloatingInput/FloatingInput";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../Store/Category/CategorySliceReducers";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category); // assuming your category state is like this
  // console.log(category);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    category: "",
    isReturnAble: false,
    isFeatured: false,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageFileChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    // You may dispatch an action to add this new category in DB or state
    // dispatch(addCategory(newCategory));
    console.log("New category added:", newCategory);

    setFormData({ ...formData, category: newCategory });
    setShowCategoryInput(false);
    setNewCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    imageFiles.forEach((file) => data.append("images", file));

    console.log("Product form data:", formData);
    console.log("Selected images:", imageFiles);

    // dispatch(createProduct(data));
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      <div className="mt-12">
        <h2 className="lg:text-6xl text-5xl font-bold text-gray-900 text-center mb-3">
          Create Product
        </h2>
        <div className="flex items-center justify-center text-gray-900 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <Link to={"/admin/dashboard/products"}>Products</Link>
          <span>/</span>
          <span>Create</span>
        </div>
      </div>

      <section className="container mx-auto px-4 py-5 mb-5">
        <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow-xl p-6">
          <form onSubmit={submitHandler}>
            <FloatingInput
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              icon={MdOutlineMail}
            />
            <FloatingInput
              label="Description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              icon={MdOutlineMail}
            />
            <FloatingInput
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              icon={MdOutlineMail}
            />
            <FloatingInput
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              icon={MdOutlineMail}
            />
            <FloatingInput
              label="Discount %"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              icon={MdOutlineMail}
            />

            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="flex items-center gap-2">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                >
                  <option value="">Select category</option>
                  {category?.category?.map((cat) => (
                    <option key={cat._id} value={cat?.name}>
                      {cat?.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowCategoryInput(!showCategoryInput)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              {showCategoryInput && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Image Files Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {imageFiles.length > 0 && (
                <ul className="text-sm mt-2 text-gray-600 list-disc list-inside">
                  {imageFiles.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Checkboxes */}
            <div className="mb-4 flex items-center space-x-3">
              <input
                type="checkbox"
                name="isReturnAble"
                checked={formData.isReturnAble}
                onChange={handleChange}
              />
              <label className="text-sm">Returnable</label>
            </div>

            <div className="mb-4 flex items-center space-x-3">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <label className="text-sm">Featured Product</label>
            </div>

            <LoadingButton isLoading={false}>Create Product</LoadingButton>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateProduct;
