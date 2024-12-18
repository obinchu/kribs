/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect, useMemo } from "react";
import SearchInput from "../ui/SearchInput";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
const QuickSearch = () => {
  const [keys, setKeys] = useState([]);
  const [options, setOptions] = useState({});

  const uniqueFilteringFeatures = useContext(AppContext) || [];

  // Step 1: Use `useMemo` to derive `filteredProperties` to avoid recomputation
  const filteredProperties = useMemo(() => {
    return uniqueFilteringFeatures.map((property) => ({
      "Property Type": property.property_type,
      Category: property.category,
      Location: property.location,
    }));
  }, [uniqueFilteringFeatures]);

  // Step 2: Extract keys from the filtered properties
  useEffect(() => {
    if (filteredProperties.length > 0) {
      setKeys(Object.keys(filteredProperties[0]));
    }
  }, [filteredProperties]);

  // Step 3: Compute options directly based on `filteredProperties`
  useEffect(() => {
    if (keys.length > 0) {
      const newOptions = keys.reduce((acc, key) => {
        const values = [...new Set(filteredProperties.map((prop) => prop[key]))];
        acc[key] = values;
        return acc;
      }, {});
      setOptions(newOptions);
    }
  }, [filteredProperties, keys]);

  return (

    <div className="h-[35vh] w-full flex flex-col items-center">
    <div className="flex w-full h-full bg-gray-50 items-center">
      <div className="flex flex-col justify-center max-w-7xl mx-auto w-full h-[90%]">
      
      <form className="flex flex-col w-full " action="">
        <span className="flex w-full justify-center text-4xl text-primary font-semibold my-[10px]">Find what fits you</span>
        <span className="flex w-full justify-center text-md text-primary font-normal w-[50%]">We help you find a property that fits Your personality, dream and pocket!</span>
      <div className="flex flex-col my-[5px]">
          <span className="font-semibold text-lg">Search</span>
          <p className="text-sm font-normal">
          Simply write and press search</p>
        </div>
            <div className="relative w-full text-base">
              <input 
                className="w-full outline bg-transparent outline-[2px] outline-tertiary ps-[15px] p-[7px] pr-[50px]" 
                type="search" 
                name="search" 
                id="search" 
                placeholder="Search property" 
              />
            </div>
      <div className="flex-col py-[32px] font-normal text-sm">
      <span className="font-semibold text-md">Advanced Search</span>
      <div className="flex">

        {keys.map((item, id) => (
          <SearchInput
            key={id}
            name={item}
            placeholder={`Select ${item}`}
            options={options[item] || []}
          />
        ))}
      </div>
       
      </div>
      <div className="flex w-full justify-center items-end">
             
              <Link to={"/"} className='flex bg-primary w-full py-[8px] font-light text-lg flex text-sm justify-center text-tertiary hover:bg-transparent  hover:text-primary hover:outline hover:outline-[2px] hover:outline-secondary '>
              <div className="flex w-full h-full justify-center items-center">
              <span className='text-center text-lg font-semibold'>Search</span>
              </div>
           
              </Link>
        </div>
    </form>
      </div>
    </div>
  </div>
  );
};

export default QuickSearch;
