import Lottie from "lottie-react";
import { Swiper, SwiperSlide } from "swiper/react";
import freelanceOne from "../../../assets/freelance-lottie-1.json";
import freelanceTwo from "../../../assets/freelance-lottie-2.json";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <section className="flex flex-col md:flex-row justify-between my-6 mx-4 p-4">
            <div>
                <h2 className="text-5xl font-bold capitalize text-rose-600">hire top talent for your next project</h2>
                <p className=" my-8 text-white">
                Connect with skilled professionals across various fields and get your project done faster and smarter. Whether youre looking for developers, designers, writers, or marketers, we have the right talent ready to bring your ideas to life.
                </p>
                <Link to="/postJob" className="text-rose-600 mr-4 capitalize bottom-2 border-red-600 hover:border-0 hover:bg-rose-600 hover:text-white hover:p-4 rounded-md font-semibold">post project</Link>
                <Link to="/postJob" className="text-rose-600 ml-4 capitalize bottom-2 border-red-600 hover:border-0 hover:bg-rose-600 hover:text-white hover:p-4 rounded-md font-semibold">Find project</Link>
            </div>
            <div className="w-1/2 mx-auto hidden md:block">
        <Swiper
            className="h-96 object-contain"
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
        >
            <SwiperSlide>
              <Lottie  className="h-full" animationData={freelanceOne}></Lottie>
            </SwiperSlide>
            <SwiperSlide>
              <Lottie  className="h-full" animationData={freelanceTwo}></Lottie>
            </SwiperSlide>
        </Swiper>
      </div>
        </section>
    );
};

export default Banner;