import { Fragment,useContext } from 'react';
import { AppContext } from '../../../App';
import { Link } from 'react-router-dom';
import { BiUser, BiPlus } from "react-icons/bi";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import styles from "./LargeScreen.module.css";

const LargeScreensNavBar = () => {
  const properties = useContext(AppContext) || [];
  
  const uniqueCategories = [...new Set(properties.map(property => property.category))];

console.log("unique categories"+ uniqueCategories);


  const headerUrls = [
    {urlName:"Home",urlPath:"/"},
    {urlName:"Listing",
    extras:uniqueCategories.map(category => ({ name: category, path: `/listing/${category}` }))
    },
    {urlName:"Pages",
    extras:[
        {
            name:"About Us"
        },
        {
            name:"Contact Us"
        }
    ]
    },
    {
    urlName:"Services", 
    extras: [
        { name: "Building & Construction" },
        { name: "Archtectural Designs" },
        { name: "Structural Designs" },
        { name: "Renovations" },
        { name: "Landscaping" },
        { name: "Interior Designs" },
        { name: "Remodelling Extensions" },
        { name: "Construction Project" },
        { name: "Management" },
        { name: "Consultancy" }
      ]},
    {urlName:"Blog",urlPath:"/"}
]

  return (
    <div className='hidden lg:flex fixed w-full bg-primary z-50 shadow-sm font-normal items-center justify-centre align-center text-tertiary text-sm'>
      <div className='w-full flex relative max-w-7xl mx-auto justify-between'>
        <div className="flex items-center font-normal  text-2xl py-[5px] my-[5px]">
          KULPROPERTIES
        </div>
        <div className="flex justify-between gap-[2px]">
          <ul className='flex text-tertiary items-center justify-between'>
            {
              headerUrls.map((link, i) => (
                <div key={i} className="relative mx-1 p-2 flex items-center text-tertiary group hover:cursor-pointer">
                  {
                    link.urlPath ?
                      <Link to={link.urlPath} className='items-center hover:text-secondary hover:cursor-pointer px-[5px]' key={link.urlName}>{link.urlName}</Link>
                      :
                      <span className='items-center flex  hover:cursor-pointer p-0'>
                        {link.urlName}
                        {link.extras && link.extras.length > 0 && (
                          <div>
                           <span className="transition duration-300 flex group-hover:hidden relative hover:cursor-pointer">
                          <RxCaretDown size={25} />
                        </span>
                            <span className="transition-transform duration-300 hidden group-hover:flex relative hover:cursor-pointer">
                              <RxCaretUp size={25} />
                              <ul className="bg-transparent absolute top-full w-[200px] right-1 mt-2">
                                <ul className={`bg-primary/90 ${styles.dropdown}`}>
                                  {link.extras.map((item, index) => (
                                    <Fragment key={index}>
                                      {item.path ? (
                                        <Link
                                          to={`${item.path}`}
                                          className={`m-1 text-base flex flex-col p-[5px] hover:font-medium ${index !== link.extras.length - 1 ? "border-b border-secondary/80" : ""}`}
                                        >
                                          {item.name}
                                        </Link>
                                      ) : (
                                        <span
                                          className={`m-1 text-base flex flex-col p-[5px] hover:font-medium ${index !== link.extras.length - 1 ? "border-b border-secondary/80" : ""}`}
                                        >
                                          {item.name}
                                        </span>
                                      )}
                                    </Fragment>
                                  ))}
                                </ul>
                              </ul>
                            </span>
                           
                          </div>
                        )}
                      </span>
                  }
                </div>
              ))
            }
          </ul>
          <div className="flex h-full items-center ustify-center gap-[7px]">
          <Link
                to={""}
                className="flex bg-transparent transition ease-in-out w-[130px] h-[40px] mx-[5px] font-light text-lg flex text-sm justify-center text-white hover:bg-white/50 rounded-sm hover:text-primary outline outline-[1px] outline-secondary "
              >
                <div className="flex w-full h-full justify-center items-center">
                  <span className="text-center text-md font-semibold">
                    Account
                  </span>
                  <span className="m-[5px]">
                    <BiUser size={20} />
                  </span>
                </div>
              </Link>
              <Link
                to={""}
                className="flex bg-other/50 transition ease-in-out w-[130px] h-[40px] mx-[5px] font-light text-lg flex text-sm justify-center text-primary hover:bg-transparent rounded-sm hover:text-white hover:outline hover:outline-[2px] hover:outline-secondary "
              >
                <div className="flex w-full h-full justify-center items-center">
                  <span className="text-center text-md font-semibold">
                    Create Listing
                  </span>
                  <span className="m-[5px]">
                    <BiPlus size={20} />
                  </span>
                </div>
              </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LargeScreensNavBar;
