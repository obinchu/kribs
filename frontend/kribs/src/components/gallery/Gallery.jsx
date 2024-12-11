/* eslint-disable react-hooks/exhaustive-deps */
import { useContext,useMemo } from "react"
import { AppContext } from "../../App"
import { Link } from "react-router-dom";
const Gallery = () => {

const GalleryData = useContext(AppContext) || [];

console.log("gallery data",GalleryData)

const groupedProperties = useMemo(() => {
    const propertyGroups = {};
  
    GalleryData.forEach((property) => {
      const { property_type } = property;
  
      if (!propertyGroups[property_type]) {
        propertyGroups[property_type] = [];
      }
  
      propertyGroups[property_type].push(property);
    });
  
    return Object.keys(propertyGroups).map((type) => ({
      property_type: type,
      properties: propertyGroups[type],
    }));
  }, [GalleryData]);
  
  console.log("grouped properties",groupedProperties);
  

const firstRowData = {
    firstAndLastColumn:[
    {
        name:"Residential",
        description:"Packed with the latest residential properties"
    },
    {
        name:"Commercial",
        description:"Packed with the latest commercial properties"
    }
],
middleColumn:[
    {
        name:"Apartment",
        total:7,
        image:"./src/assets/images/house2.jpg"
    }
]
}

  return (
    <div className="w-full h-[100vh] bg-transparent flex flex-col justify-center">
        <div className="flex flex-col w-full max-w-7xl justify-center align-center items-center mx-auto h-[85%]">
        <div className="flex flex-col justify-center items-center">
            <span className="text-4xl font-extralight m-[5px]">Explore Different Properties </span>
          </div>
        <div className="flex w-[75%] p-[10px]  h-[100%]">
        <div className="grid grid-cols-1 grid-rows-3 w-[35%] gap-[10px] p-[10px]  my-auto h-[90%]">

        <div className="flex flex-col w-full h-full">
                        <div className="flex flex-col  justify-center mt-auto h-[60%] ">
                        <span className="text-2xl font-light text-primary m-[5px]">{firstRowData.firstAndLastColumn[0].name}</span>
                        <p className="text-md font-light text-gray-700 m-[7px]">{firstRowData.firstAndLastColumn[0].description}</p>
                        </div>
                        <div className="flex h-[40%]">
                        <hr className=" mt-auto mb-[20px]  border border-primary w-[30%] border-[1px]" />
                        </div>
                    </div>
                    <div className="flex w-full h-full rounded-md">
                        {
                            firstRowData.middleColumn.map((data,i)=>{
                                return(
                                    <div key={i} className="flex w-full h-full bg-cover bg-center bg-no-repeat rounded-md"
                                    style={{
                                      backgroundImage: `url('./src/assets/images/house2.jpg')`,
                                    }}>
                                        <div className="flex w-full h-full text-white flex-col rounded-md bg-black/30">
                                             <div className="flex  flex-col p-4">
                                             <span>{data.total}Properties</span>
                                             <span>{data.name}</span>
                                             </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                                      
                    <div className="flex flex-col w-full h-full">
                        <div className="flex flex-col  justify-center mt-auto h-[60%] ">
                        <span className="text-2xl font-extralight text-primary m-[5px]">{firstRowData.firstAndLastColumn[1].name}</span>
                        <p className="text-md font-light text-gray-700 m-[7px]">{firstRowData.firstAndLastColumn[1].description}</p>
                        </div>
                        <div className="flex h-[40%]">
                        <hr className=" mt-auto mb-[20px]  border border-primary w-[30%] border-[1px]" />
                        </div>
                    </div>
                    
                 
            </div>
            <div className="grid grid-cols-2 w-[65%] my-auto rounded-md gap-[10px] p-[10px] h-[90%]">
  {
    groupedProperties.map((group, key) => {
      // Define a different class for the first item
      const isFirstItem = key === 0;
      const itemClass = isFirstItem 
        ? "row-span-2 h-full" // First item spans two rows, making it taller
        : "row-span-1 h-full"; // Other items span one row

      return (
        <div key={key} className={`flex w-full text-primary flex-col rounded-md  bg-cover bg-center bg-no-repeat shadow-sm rounded-md ${itemClass}`}   style={{
            backgroundImage: `url(${group.properties[0].cover_image})`,
          }}>
          <div className="flex flex-col justify-between w-full h-full bg-black/30 hover:bg-black/10 hover:cursor-pointer text-other1 rounded-md p-4">
            <div className="flex flex-col">
            <span className="text-sm font-light">{group.properties.length} Properties</span>
            <span className="text-xl font-extralight">{group.property_type}s</span>
            </div>
            <div className="flex">
            <Link to={""} className='transparent w-[120px] h-[40px] mx-[5px] font-normal text-lg flex items-center text-white hover:cursor-pointer hover:text-primary '>
                 <span className='text-lg font-extralight'>View</span>
            </Link>
            </div>
          </div>
        </div>
      );
    })
  }
</div>

            </div>
        </div>
    </div>
  )
}

export default Gallery