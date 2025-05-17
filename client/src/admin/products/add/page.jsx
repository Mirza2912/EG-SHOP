// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default function AddProductPage() {
//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center gap-4">
//         <Link href="/admin/products">
//           <Button variant="ghost" size="icon" className="h-8 w-8">
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//         </Link>
//         <h1 className="text-2xl font-bold">Add New Product</h1>
//       </div>

//       <Card className="p-6">
//         <form className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="name">Product Name</Label>
//               <Input id="name" placeholder="e.g. Organic Apples" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Select>
//                 <SelectTrigger id="category">
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="fruits">Fruits</SelectItem>
//                   <SelectItem value="vegetables">Vegetables</SelectItem>
//                   <SelectItem value="organic">Organic</SelectItem>
//                   <SelectItem value="seasonal">Seasonal</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="price">Price ($)</Label>
//               <Input id="price" type="number" step="0.01" placeholder="0.00" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="stock">Stock Quantity</Label>
//               <Input id="stock" type="number" placeholder="0" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="origin">Origin</Label>
//               <Input
//                 id="origin"
//                 placeholder="e.g. Local Farm, California, Imported"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="freshness">Freshness (Days)</Label>
//               <Input id="freshness" type="number" placeholder="7" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               placeholder="Describe the product, including details about taste, texture, and usage suggestions."
//               rows={4}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="nutrition">Nutrition Information</Label>
//             <Textarea
//               id="nutrition"
//               placeholder="Enter nutrition facts and health benefits."
//               rows={3}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Product Images</Label>
//             <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
//               <div className="mx-auto flex flex-col items-center">
//                 <svg
//                   className="h-12 w-12 text-gray-400"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1}
//                     d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 <p className="mt-2 text-sm text-gray-500">
//                   Drag and drop images here, or click to browse
//                 </p>
//                 <Input id="images" type="file" multiple className="hidden" />
//                 <Button variant="outline" size="sm" className="mt-4">
//                   Upload Images
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3">
//             <Button variant="outline">Cancel</Button>
//             <Button className="bg-orange-500 hover:bg-orange-600">
//               Save Product
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  createNewCategory,
  getAllCategories,
} from "../../../Store/Category/CategorySliceReducers";
import FloatingInput from "../../../components/FloatingInput/FloatingInput";
import LoadingButton from "../../../components/LoadingButton/LoadingButton";
import { createNewProduct } from "../../../Store/Products/ProductSliceReducers";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const { isLoading, productCreateMessage } = useSelector(
    (state) => state.products
  );

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

  const navigate = useNavigate();
  // const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const removeImageFile = (index) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);
  };

  // const addImageLink = () => {
  //   if (linkInput.trim()) {
  //     setImages([...images, linkInput.trim()]);
  //     setLinkInput("");
  //   }
  // };

  // const removeImageLink = (index) => {
  //   setImages(images.filter((_, i) => i !== index));
  // };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    dispatch(createNewCategory({ name: newCategory }));
    setFormData({ ...formData, category: newCategory });
    setShowCategoryInput(false);
    setNewCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (Number(formData.discount) < 0) {
      toast.error("Discount cannot be negative");
      return;
    }

    // Append files to FormData
    // imageFiles.forEach((file) => data.append("images", file));
    images.forEach((file) => {
      data.append("images", file);
    });
    dispatch(createNewProduct(data));
    if (productCreateMessage) {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        discount: "",
        category: "",
        isReturnAble: false,
        isFeatured: false,
      });
      navigate("/admin/products");
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <div className="mt-12 flex flex-col items-center">
        <h2 className="lg:text-6xl text-5xl font-bold text-gray-900 text-center mb-3">
          Create Product
        </h2>
        <div className="flex items-center justify-center text-gray-900 gap-1 text-md font-normal">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/admin/dashboard/products">Products</Link>
          <span>/</span>
          <span>Create</span>
        </div>
        <div className="mt-5">
          <Link
            to={"/admin/dashboard/products"}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center text-sm"
          >
            Go to products
          </Link>
        </div>
      </div>

      <section className="container mx-auto px-4 py-5 mb-5">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-xl p-6">
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="col-span-1 md:col-span-2">
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
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
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
            </div>

            {/* Image Upload */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Images from Device
              </label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {images.length > 0 && (
                <ul className="text-sm mt-2 text-gray-600 list-disc list-inside">
                  {images.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      {file.name}
                      <button
                        type="button"
                        onClick={() => removeImageFile(index)}
                        className="text-red-500 ml-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Add Image URLs
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  placeholder="https://image-link.com"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <button
                  type="button"
                  onClick={addImageLink}
                  className="bg-indigo-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
              {images.length > 0 && (
                <ul className="text-sm mt-2 text-gray-600 list-disc list-inside">
                  {images.map((link, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      {link}
                      <button
                        type="button"
                        onClick={() => removeImageLink(index)}
                        className="text-red-500 ml-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div> */}

            {/* Checkboxes */}
            <div className="mt-4 flex items-center space-x-3">
              <input
                type="checkbox"
                name="isReturnAble"
                checked={formData.isReturnAble}
                onChange={handleChange}
              />
              <label className="text-sm">Returnable</label>
            </div>

            <div className="mt-2 flex items-center space-x-3">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <label className="text-sm">Featured Product</label>
            </div>

            <div className="mt-6">
              <LoadingButton isLoading={isLoading}>
                Create Product
              </LoadingButton>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateProduct;
