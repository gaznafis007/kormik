import Banner from "./Banner/Banner";
import Brands from "./Brands/Brands";
import Gallery from "./Gallery/Gallery";
import HeroSection from "./HeroSection/HeroSection";
import PopularStats from "./PopuplarStats/PopularStats";
import Reviews from "./Review/Reviews";

const Home = () => {

  return (
    <section className="my-4">
     <Banner/>
     <Brands/>
     <PopularStats/>
     <Gallery/>
     <HeroSection/>
     <Reviews/>
    </section>
  );
};

export default Home;
