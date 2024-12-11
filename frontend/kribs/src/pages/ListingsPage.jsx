/* eslint-disable react/prop-types */
import Footer from "../components/footer/Footer"
import Properties from "../components/properties/Properties"
const ListingsPage = ({properties}) => {
  return (
    <div className="bg-other text-primary">
    <Properties data={properties} />
    <Footer />
  </div>
  )
}

export default ListingsPage