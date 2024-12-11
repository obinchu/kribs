/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchInput = ({ name, options, id, onChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentValue, setCurrentValue] = useState("all");

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    // Update the current value whenever the URL changes
    const valueFromUrl = params.get(name) || "all";
    setCurrentValue(valueFromUrl);
  }, [location.search, name, params]);

  const handleChange = (event) => {
    const value = event.target.value;

    const abbreviatedName =
      name === "Property Type"
        ? "pt"
        : name === "Location"
        ? "loc"
        : name === "Bedrooms"
        ? "bd"
        : name === "Bathrooms"
        ? "br"
        : name === "Price"
        ? "pr"
        : name === "Status"
        ? "st"
        : name;

    if (typeof onChange === "function") {
      onChange(abbreviatedName, value);
      console.log(value,"valu")
    }

    if (value && value !== "all") {
      params.set(abbreviatedName, value);
    } else {
      params.delete(abbreviatedName);
    }

    navigate({ search: params.toString() });
    setCurrentValue(value);
  };

  const uniqueOptions = [
    ...new Set(
      options
        .filter((option) => option)
        .map((option) =>
          String(option).trim().toLowerCase().replace(/\s+/g, "")
        )
    )
  ];
  console.log("unique options", uniqueOptions);

  return (
    <div className="flex flex-col w-full px-2">
      <span className="text-start px-1">{name}</span>
      <div className="relative">
        <select
          className="block w-full bg-white rounded-sm py-2 px-3 text-gray-400 border border-gray-300 hover:border-primary hover:border-[1px] hover:cursor-pointer focus:outline-[1px] focus:outline-primary duration-200 ease-in-out"
          name={name}
          id={id}
          value={currentValue} // Use current state value
          onChange={handleChange}
        >
          <option value="all">Select {name}</option>
          {uniqueOptions.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchInput;
