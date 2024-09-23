import Banner from "./Banner/Banner";
import Brands from "./Brands/Brands";
import PopularStats from "./PopuplarStats/PopularStats";
import Reviews from "./Review/Reviews";

const Home = () => {

  return (
    <section className="my-4">
     <Banner/>
     <Brands/>
     <PopularStats/>
     <Reviews/>
    </section>
  );
};

export default Home;
