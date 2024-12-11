/* eslint-disable react/prop-types */
import Footer from "../components/footer/Footer"
import Properties from "../components/properties/Properties"
const Listing = ({properties}) => {
  return (
    <div className="bg-primary text-primary">
    <Properties data={properties} />
    <Footer />
  </div>
  )
}

export default Listing