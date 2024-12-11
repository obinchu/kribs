/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useMemo } from "react";
import Card from "../ui/Card";
import { AppContext } from "../../App";
import Button from "../ui/Button";
import { FaArrowRight } from "react-icons/fa";

const FeaturedListings = () => {
  const [array, setArray] = useState([]);

  const properties = useContext(AppContext) || [];
  console.log(properties,"featured listings properties")

  const firstItemsArray = useMemo(() => {
    const firstItems = {};

    properties.forEach((property) => {
      if (!firstItems[property.category]) {
        firstItems[property.category] = property;
      }
    });

    return Object.values(firstItems);
  }, [properties]);

  useEffect(() => {
    if (JSON.stringify(array) !== JSON.stringify(firstItemsArray)) {
      setArray(firstItemsArray);
    }
  }, [firstItemsArray]);

  return (
    <div className="h-[55vh] w-full flex flex-col items-center">
      <div className="flex w-full h-full bg-gray-50 items-center">
        <div className="flex flex-col justify-center max-w-7xl mx-auto w-full h-[90%]">
          <div className="flex flex-col justify-center items-center h-[30%]">
            <span className="text-4xl font-extralight m-[5px]"> Featured Listings</span>
            <p className="text-md font-light w-[30%] text-center">Here are some of the many kul properties available on kul properties</p>
          </div>
          <div className="flex justify-center w-[75%] mx-auto h-[70%]">
            <div className="grid grid-cols-3 grid-rows-1 w-full h-full">
              {
                array.map((property, i) => (
                  <Card
                    key={i}
                    status={property.status}
                    category={property.category}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    bedrooms={property.bedrooms}
                    area={property.area}
                    bathrooms={property.bathrooms}
                    bgimage={property.cover_image}
                  />
                ))
              }
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
            icon={<FaArrowRight size={20}/>}
            path={"/listings"}
            name={"View All"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedListings;
