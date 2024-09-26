// eslint-disable-next-line react/prop-types
const Card = ({ title, children }) => {
  return (
    <div className="p-6 bg-slate-900 rounded-md">
      <h2 className="text-lg text-rose-500 font-semibold font-sans capitalize">
        {title}
      </h2>
      <p className="py-4 text-white font-semibold font-sans">{children}</p>
    </div>
  );
};

export default Card;
