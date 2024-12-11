/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import SearchInput from "../ui/SearchInput";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";

const PropertiesQuickSearch = ({ uniqueFilteringFeatures }) => {
  const [keys, setKeys] = useState([]);
  const [options, setOptions] = useState({}); 

  // Map abbreviated keys to full names for UI display
  const fullNamesMap = {
    pt: "Property Type",
    loc: "Location",
    bd: "Bedrooms",
    br: "Bathrooms",
    pr: "Price",
    st: "Status"
  };

  // memoize the values so that we dont need to rerun the values again
  const filteredProperties = useMemo(() => uniqueFilteringFeatures.map(property => ({
    pt: property.property_type,
    loc: property.location,
    bd: property.bedrooms,
    br: property.bathrooms,
    pr: property.price,
    st: property.status,
  })), [uniqueFilteringFeatures]);

  useEffect(() => {
    if (filteredProperties.length > 0) {
      const allKeys = Object.keys(filteredProperties[0]);
      setKeys(allKeys);
    }
  }, [filteredProperties]);

  useEffect(() => {
    const newOptions = keys.reduce((acc, key) => {
      const values = [...new Set(filteredProperties.map(prop => prop[key]))];
      acc[key] = values;
      return acc;
    }, {});
    setOptions(newOptions);
  }, [keys, filteredProperties]);
    
  return (
    <form className="flex flex-col h-[500px] w-full mx-auto mt-[2px] rounded bg-white shadow" action="">
      <div className="flex items-center pt-[15px] px-[5px]">
        <HiOutlineAdjustmentsVertical size={30} />
        <span className="flex items-center text-xl font-light text-primary">Filter</span>
      </div>
      <div className="flex flex-col h-full font-normal justify-evenly text-sm bg-transparent">
        {keys.map((item, id) => (
          <SearchInput 
            key={id}
            name={fullNamesMap[item] || item}
            placeholder={`Select ${fullNamesMap[item] || item}`}  
            options={options[item] || []} 
            />
          ))}
      </div>
      <button 
        type="button"
        onClick={() => {
          // Reset filters logic
          // You can clear any state or URL parameters here
        }}
        className="w-[95%] mx-auto mb-[5px] bg-primary text-other rounded-sm text-lg font-extralight p-[5px] hover:bg-transparent hover:outline hover:outline-[2px] hover:text-primary"
      >
        Reset
      </button>
    </form>
  );
};

export default PropertiesQuickSearch;
