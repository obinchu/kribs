import FeaturedListings from "../components/featuredListings/FeaturedListings"
import Gallery from "../components/gallery/Gallery"
import Hero from "../components/hero/Hero"
import NewsLetter from "../components/newsletter/NewsLetter"
import Footer from "../components/footer/Footer"
const HomePage = () => {
  return (
    <div className="bg-other text-primary">
      <Hero />
      <FeaturedListings />
      <Gallery />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default HomePage