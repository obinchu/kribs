import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineArrowForward } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { AppContext } from './AppContext'; // Ensure to import AppContext if it's defined in another file

const PropertyHero = () => {
  const propertyDetails = useContext(AppContext); 
  const { slug } = useParams();

  // Ensure propertyDetails exists and has properties array
  if (!propertyDetails || propertyDetails.length === 0) {
    return <p>Loading...</p>; // Add a loading or error state
  }

  const selectedItem = propertyDetails[0].properties.find(
    (item) => item.slug === slug
  );

  // Handle case where no property matches the slug
  if (!selectedItem) {
    return <p>Property not found</p>; // Add a fallback if the slug doesn't match any property
  }

  const images = selectedItem.images || []; // Ensure images are present
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ensure there's no index out of bounds issue
  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleBackImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <main className="w-full h-[50vh] md:h-[80vh] flex bg-other">
      <section className="w-full h-full flex flex-col items-center justify-center">
        <div className="relative flex mt-[15%] lg:max-w-7xl w-full h-[90%] lg:my-auto md:rounded justify-between px-2 md:px-0">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className="flex md:h-full w-full h-[80%] md:mx-auto bg-cover bg-center bg-no-repeat rounded"
                style={{
                  backgroundImage: `url(${image})`,
                  display: index === currentImageIndex ? "block" : "none",
                }}
              ></div>
            ))
          ) : (
            <p>No images available</p> // Handle case where there are no images
          )}

          {/* Navigation Controls */}
          {images.length > 1 && (
            <div className="absolute flex w-full h-full justify-center rounded items-center">
              <div className="flex text-other justify-between w-full p-2 px-4">
                <span
                  className={`hover:cursor-pointer me-auto bg-black/50 p-2 ${
                    currentImageIndex === 0 ? "hidden" : ""
                  }`}
                  onClick={handleBackImage}
                >
                  <BiArrowBack size={25} />
                </span>
                <span
                  className={`hover:cursor-pointer text-other ms-auto bg-black/50 p-2 ${
                    currentImageIndex === images.length - 1 ? "hidden" : ""
                  }`}
                  onClick={handleNextImage}
                >
                  <MdOutlineArrowForward size={25} />
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PropertyHero;
