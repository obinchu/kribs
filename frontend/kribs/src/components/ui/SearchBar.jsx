import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="relative w-full text-base">
      <input 
        className="w-full rounded-full outline outline-[2px] outline-secondary ps-[15px] p-[7px] pr-[50px]" 
        type="search" 
        name="search" 
        id="search" 
        placeholder="Search..." 
      />
      <div className="absolute right-[40px] top-1/2 transform -translate-y-1/2 h-6 w-[1px] bg-gray-400"></div>
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-[7px] ">
        <FaSearch className="h-4 w-4 text-primary hover:text-secondary font-thin" />
      </button>
    </div>
  );
};

export default SearchBar;
