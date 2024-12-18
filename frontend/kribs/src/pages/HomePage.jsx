import FeaturedListings from "../components/featuredListings/FeaturedListings"
import Gallery from "../components/gallery/Gallery"
import Hero from "../components/hero/Hero"
import NewsLetter from "../components/newsletter/NewsLetter"
import Footer from "../components/footer/Footer"
import QuickSearch from "../components/quickSearch/QuickSearch"
const HomePage = () => {
  return (
    <div className="text-primary">
      <Hero />
      <QuickSearch />
      <FeaturedListings />
      <Gallery />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default HomePage