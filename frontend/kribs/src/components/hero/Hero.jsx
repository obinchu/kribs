import { useEffect, useState, useMemo } from "react";
import styles from "./hero.module.css";
import { CiLocationOn } from "react-icons/ci";
import {Link} from "react-router-dom"

const SLIDE_DURATION = 5000; // Time each slide is displayed (in ms)

const Hero = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Start at the first real slide
  const [timer, setTimer] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/properties");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  // Memoize the unique items
  const firstItemsArray = useMemo(() => {
    const firstItemsMap = new Map();
    data.forEach((property) => {
      if (!firstItemsMap.has(property.property_type)) {
        firstItemsMap.set(property.property_type, property);
      }
    });
    return Array.from(firstItemsMap.values()).sort((a, b) =>
      a.property_type.localeCompare(b.property_type)
    );
  }, [data]);

  // Start and manage the slide timer
  useEffect(() => {
    if (firstItemsArray.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const updatedData = [...firstItemsArray];
        updatedData.push(updatedData.shift()); // Move the first item to the end
        setData(updatedData); // Update the data array with the new order
        return (prevIndex + 1) % updatedData.length;
      });
    }, SLIDE_DURATION);

    setTimer(interval);

    return () => {
      clearInterval(interval); // Cleanup on component unmount or dependencies change
    };
  }, [firstItemsArray.length]);

  // Handle counter button click
  const handleSlideChange = (index) => {
    if (timer) {
      clearInterval(timer); // Clear existing timer when a manual slide change occurs
    }
    setCurrentIndex(index); // Change the slide index

    // Restart the timer after changing the slide manually
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const updatedData = [...firstItemsArray];
        updatedData.push(updatedData.shift()); // Move the first item to the end
        setData(updatedData); // Update the data array with the new order
        return (prevIndex + 1) % updatedData.length;
      });
    }, SLIDE_DURATION);

    setTimer(interval); // Update the timer state
  };

  // Handle case when there are no properties
  if (firstItemsArray.length === 0) {
    return (
      <div className="h-[85vh] w-full flex items-center justify-center">
        No properties available.
      </div>
    );
  }

  return (
    <div className="relative h-[80vh] w-full overflow-hidden flex flex-col items-center">
      {/* Slider */}

      <div
        className={`flex h-full w-full transition-transform duration-700 ease-in-out`}
        style={{
          transform: `translateX(${-100 * currentIndex}%)`
        }}
      >
        {firstItemsArray.map((property, index) => {
          const fullImageUrl =
            property?.cover_image && !property?.cover_image.startsWith("http")
              ? `${import.meta.env.VITE_API_URL}${property.cover_image}`
              : property?.cover_image;

          return (
            <div
              key={index}
              className={`${styles.overlay} flex-shrink-0 h-full w-full bg-cover bg-center bg-no-repeat`}
              style={{
                backgroundImage: `url(${fullImageUrl})`
              }}
            >
              <div className="flex max-w-7xl mx-auto h-full text-white">
                <div className="flex w-full h-full justify-between">
                  <div className="flex w-full h-[90%] my-auto items-center">
                    <div className="flex flex-col h-[200px] w-[60%] me-auto justify-between py-[5px]">
                      <span className="text-other font-light text-4xl">
                        {property?.property_type?.charAt(0).toUpperCase() +
                          property?.property_type?.slice(1)}
                      </span>
                      <span className="flex justify-start items-center text-white font-light text-xl">
                        <CiLocationOn size={25} />
                        {property?.location}
                      </span>
                      <p className="text-sm font-normal  leading-relaxed">
                        {property?.description}
                      </p>

                      <span className="text-white font-light text-xl">
                        ${property?.price}
                      </span>
          <Link
                to={""}
                className="flex bg-transparent transition ease-in-out w-[130px] h-[40px] mx-[5px] font-light text-lg flex text-sm justify-center text-white hover:bg-white/50 rounded-sm hover:text-primary outline outline-[2px] outline-secondary "
              >
                <div className="flex w-full h-full justify-center items-center">
                  <span className="text-center text-lg font-normal">
                    Explore
                  </span>
                  
                </div>
              </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Counter */}
      <div className="absolute bottom-5 right-5 flex space-x-2">
        {firstItemsArray.map((_, index) => (
          <button
            key={index}
            className="text-[22px] text-white border-b duration-500 ease-in-out font-thin hover:cursor-pointer"
            style={{
              borderBottom: currentIndex === index ? `2px solid white` : `none`
            }}
            onClick={() => handleSlideChange(index)}
          >
            0{index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
