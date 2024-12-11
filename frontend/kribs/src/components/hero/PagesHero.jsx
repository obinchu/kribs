// import QuickSearch from "../quickSearch/QuickSearch"
const PagesHero = () => {
  return (
    <div className="flex flex-col  bg-white justify-center w-full h-[50vh]">
    <div className="flex w-full max-w-7xl mx-auto  h-[80%]">
      <div className="flex flex-col justify-start w-[40%] bg-transparent rounded-s-lg">
       <div className="flex flex-col justify-between my-auto  align-start h-[200px] w-[80%] py-[5px]">
       <div className="flex text-xl text-primary font-normal p-[2px]">KULPROPERTIES</div>
        <div className="flex text-5xl font-light tracking-wide w-[95%] my-[2px] ">Highly Flexible And Reliable Real Estate Marketplace</div>
        <div className="flex text-black font-light text-md my-[2px]">We are recognized for exceeding client expectations and delivering great results through dedication, ease of process, and extraordinary services to our worldwide clients.</div>
       </div>
       
      </div>
      <div className='flex w-[60%] '>
    <div className="flex w-[90%] mx-auto mt-auto h-[90%] bg-cover bg-center bg-no-repeat "
  style={{
    backgroundImage: `url('./assets/images/house2.jpg')`,
  }}>

    </div>
  </div>

     </div>

</div>
  )
}

export default PagesHero