import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import background from "../assets/bkg_skeleton_img.svg";
import API from "../api";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const response = await API.get("/images");
        setImages(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllImages();
  }, []);

  return (
    <div className="p-4 w-full mx-auto mt-20">
      {loading ? (
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            0: 1,
            200: 2,
            750: 3,
            900: 4,
            1100: 5,
            2500: 6,
          }}
        >
          <Masonry gutter="1rem" className="mt-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonTheme
                baseColor="transparent"
                highlightColor="#4A4A4A"
                lineHeight={0}
                key={index}
              >
                <div
                  className="relative rounded-md shadow-md"
                  style={{
                    border: "1px solid #4A4A4A",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Skeleton height={300} />
                  <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
                    <div className="absolute top-0 left-0 flex w-full justify-between items-start">
                      <Skeleton
                        circle={true}
                        height={40}
                        width={40}
                        style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}
                      />
                      <Skeleton
                        height={20}
                        width={100}
                        style={{ marginTop: "1.3rem" }}
                      />
                    </div>
                    <img src={background} alt="/" className="w-20 h-20" />
                  </div>
                </div>
              </SkeletonTheme>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3, 1200: 4 }}
        >
          <Masonry gutter="16px">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-lg shadow-md relative group"
              >
                <img
                  src={image.image}
                  alt={`Gallery ${index}`}
                  className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="text-white font-medium text-sm px-2 py-1 rounded">{image.title || "Untitled"}</span>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};

export default Gallery;