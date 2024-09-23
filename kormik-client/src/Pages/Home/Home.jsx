import Banner from "./Banner/Banner";
import Brands from "./Brands/Brands";
import PopularStats from "./PopuplarStats/PopularStats";

const Home = () => {

  return (
    <section className="my-4">
     <Banner/>
     <Brands/>
     <PopularStats/>
    </section>
  );
};

export default Home;
