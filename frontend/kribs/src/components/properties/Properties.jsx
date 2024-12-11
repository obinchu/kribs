/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import PropertiesQuickSearch from "../quickSearch/PropertiesQuickSearch";
import SearchBar from "../ui/SearchBar";
import { IoGridOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";

const Properties = ({ data }) => {
  // Memoize the properties data for optimization
  const propertiesData = useMemo(() => data || [], [data]);

  const { category, location: categoryLocation } = useParams();
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(routerLocation.search);

  // Define filter keys to map between URL params and property attributes
  const filterKeys = useMemo(
    () => [
      { key: "pt", fullName: "property_type" },
      { key: "loc", fullName: "location" },
      { key: "br", fullName: "bedrooms" },
      { key: "bt", fullName: "bathrooms" },
      { key: "pr", fullName: "price" },
      { key: "st", fullName: "status" },
    ],
    []
  );

  // Initialize filter values from URL parameters
  const [filterValues, setFilterValues] = useState(() => {
    const initialValues = {};
    filterKeys.forEach(({ key }) => {
      initialValues[key] = searchParams.get(key) || "";
    });
    return initialValues;
  });

  // Update filter values when URL search changes
  useEffect(() => {
    const updatedValues = {};
    filterKeys.forEach(({ key }) => {
      updatedValues[key] = searchParams.get(key) || "";
    });
    setFilterValues(updatedValues);
  }, [routerLocation.search, filterKeys]);

  // Update URL parameters when filter values change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key]) params.set(key, filterValues[key]);
    });
    navigate({ search: params.toString() }, { replace: true });
  }, [filterValues, navigate]);

  // Filter properties based on filter values and other params
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((property) => {
      const propertyPrice = parseFloat(property.price);
      return (
        (!category || property.category === category) &&
        (!categoryLocation || property.location.includes(categoryLocation)) &&
        (!filterValues.pt || property.property_type === filterValues.pt) &&
        filterKeys.every(({ key, fullName }) => {
          if (key === "br" || key === "bt") {
            return !filterValues[key] || property.unit[fullName] === parseInt(filterValues[key]);
          }
          return !filterValues[key] || property[fullName] === filterValues[key];
        })
      );
    });
  }, [propertiesData, filterValues, category, categoryLocation, filterKeys]);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  return (
    <div className="h-[110vh] w-full bg-transparent flex flex-col items-center">
      <div className="flex w-full h-full bg-gray-50 items-center">
        <div className="flex flex-col justify-center max-w-7xl mx-auto w-full h-full">
          <div className="flex flex-col justify-end items-center w-full h-[10%] py-[10px]">
            <div className="flex w-full justify-between">
              <span className="text-2xl font-extralight m-[5px]">Featured Listings</span>
              <div className="flex items-center p-[10px]">
                <CiBoxList className="mx-[5px] text-primary hover:cursor-pointer" size={25} />
                <IoGridOutline className="mx-[5px] text-primary hover:cursor-pointer" size={25} />
              </div>
            </div>
          </div>
          <div className="flex justify-between h-[80%]">
            <div className="flex w-[19%]">
              <PropertiesQuickSearch 
                uniqueFilteringFeatures={propertiesData} 
                setFilterValues={setFilterValues} 
              />
            </div>
            <div className="flex flex-col w-[80%] justify-evenly h-full">
              <div className="flex flex-col justify-between items-start w-full mx-auto h-[8%]">
                <SearchBar />
                <div className="flex text-primary text-base font-normal justify-center items-center">
                  <span className="mx-[5px] text-sm text-center">{filteredProperties.length}</span>
                  <span className="text-sm">Available</span>
                </div>
              </div>
              <div className="grid grid-cols-4 grid-rows-3 h-full">
                {currentItems.map((property, i) => (
                  <Card
                    key={i}
                    status={property.status}
                    category={property.property_type}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    bedrooms={property.bedrooms}
                    area={property.area}
                    bathrooms={property.bathrooms}
                    bgimage={property.cover_image}
                    path={`/kulproperties/propertydetails/${property.slug}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-[10%]">
            {totalPages > 1 &&
              Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`mx-[5px] py-[7px] px-[12px] cursor-pointer ${
                    i + 1 === currentPage
                      ? "outline outline-primary outline-[2px] bg-transparent text-primary"
                      : "bg-transparent outline outline-secondary/50 outline-[2px] text-primary hover:bg-gray-200 hover:outline-primary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
