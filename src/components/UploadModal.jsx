import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import withPrivate from "../hoc/withPrivate";
import API from "../api";

function UploadModal({ isOpen, setIsOpen }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setTitle("");
      setDescription("");
      setImagePreview(null);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!image || !title || !description) {
      alert("Please provide a title, description, and an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await API.post(
        "/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload successful:", response.data);
      toast.success(response.data.message);
      setIsOpen(false);
    } catch (error) {
      console.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white p-6 rounded-lg shadow-xl w-96"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload Image</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </button>
            </div>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label className="block mb-4 cursor-pointer">
              <span className="px-4 py-2 bg-gray-200 rounded-lg shadow-sm inline-block">
                Upload Image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="imagePreview"
                className="w-full h-48 object-cover rounded-lg border"
              />
            )}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full mt-4 py-2 rounded-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4e38f5] hover:bg-[#3d2bc1] text-white"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l-4 4m0 0l4 4v4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Uploading...
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default withPrivate(UploadModal)
