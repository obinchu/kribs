/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import Button from "../ui/Button";
import SearchInput from "../ui/SearchInput";
import { AppContext } from "../../App";

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
    <form className="flex flex-col w-full rounded" action="">
      <div className="flex my-[2px]">
        <input
          className="py-[7px] px-[20px] mx-[2px] bg-primary text-white rounded-md"
          type="button"
          value="Sale"
        />
        <input
          className="py-[7px] px-[20px] mx-[2px] bg-primary text-white rounded-md"
          type="button"
          value="Rent"
        />
      </div>
      <div className="flex py-[32px] font-normal text-sm rounded-md shadow-lg bg-[#ffffff]">
        {keys.map((item, id) => (
          <SearchInput
            key={id}
            name={item}
            placeholder={`Select ${item}`}
            options={options[item] || []}
          />
        ))}
        <div className="flex w-[50%] justify-center items-end">
          <Button name={"Search"} icon={<BiSearch size={20} />} path={""} />
        </div>
      </div>
    </form>
  );
};

export default QuickSearch;
