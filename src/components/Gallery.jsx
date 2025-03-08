import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import API from "../api";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const response = await API.get("/images");
        setImages(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllImages();
  }, []);

  return (
    <div className="p-4 w-full mx-auto mt-20" >

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-300 h-64 rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3, 1200: 4 }}
        >
          <Masonry gutter="16px">
            {images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={image.image}
                  alt={`Gallery ${index}`}
                  className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};

export default Gallery;
