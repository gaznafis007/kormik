import Heading from "../../../Shared/Heading/Heading";

const Brands = () => {
  return (
    <section>
        <Heading>Our popular clients</Heading>
      <div className="flex flex-col md:flex-row gap-4 font-bold font-sans text-4xl text-gray-400 p-6 justify-around">
        <h2>OpenAi</h2>
        <h2>Netflix</h2>
        <h2>AirBnB</h2>
        <h2>Uber</h2>
      </div>
    </section>
  );
};

export default Brands;
