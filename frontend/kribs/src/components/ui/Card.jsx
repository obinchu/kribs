/* eslint-disable react/prop-types */
import { IoBedOutline } from "react-icons/io5";
import { PiShowerThin } from "react-icons/pi";
import { MdOutlineSquareFoot } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const Card = ({
  status,
  category,
  title,
  price,
  location,
  area,
  bathrooms,
  bedrooms,
  bgimage,
  path
}) => {
  const amenities = [
    {
      name: "Bed",
      icon: <IoBedOutline size={20} />,
      figure: bedrooms
    },
    {
      name: "Bath",
      icon: <PiShowerThin size={20} />,
      figure: bathrooms
    },
    {
      name: "Sqr ft",
      icon: <MdOutlineSquareFoot size={20} />,
      figure: area
    }
  ];

  const fullImageUrl =
    bgimage && !bgimage.startsWith("http") // If bgimage is not a full URL
      ? `${import.meta.env.VITE_API_URL}${bgimage}`
      : bgimage; // Otherwise, use bgimage as is

  const capitalizeCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Link
      to={path}
      className="flex h-[300px] text-primary flex-col w-[250px] mx-auto justify-between outline outline-primary/10 shadow-sm shadow-primary/20 outline-[1px]  hover:cursor-pointer hover:outline-primary/20 rounded-sm"
    >
      <div
        className="flex h-[200px] rounded-t-sm bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${fullImageUrl})`
        }}
      >
        <div className="flex w-full h-full text-white bg-primary/10 hover:bg-transparent">
          <div className="flex w-full h-full flex-col justify-between">
            <div className="flex w-full h-[50%] justify-center p-[7px]">
              <div className="flex justify-between w-full">
                <span>{status}</span>
                <span>{status}</span>
              </div>
            </div>
            <div className="flex w-full h-[50%] px-[7px] py-[10px]">
              <div className="flex justify-between mt-auto w-full">
                <span>Like</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[100px] w-full text-sm py-[2px]">
        <div className="flex h-full flex-col w-full p-[2px]">
          <span className="text-md font-normal">{title}</span>
          <span className="flex text-xs font-light my-[5px]">
            <CiLocationOn size={15} className="text-primary mr-[5px]" />
            {location}
          </span>
          <div className="flex w-full">
            {amenities.map((item, i) => (
              <div
                key={i}
                className="flex justify-start me-[10px] items-center"
              >
                {item.icon}
                <div className="flex items-center">
                  <span className="text-xs mx-[1px]">{item.figure}</span>
                  <span className="text-xs mx-[1px]">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-auto w-full ">
            <span className="font-normal text-primary text-center px-[2px] text-sm items-center">
              {capitalizeCategory}
            </span>
            <span className="text-primary flex  bg-transparent font-semibold px-[5px] items-center text-md rounded-sm">
              ${price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
