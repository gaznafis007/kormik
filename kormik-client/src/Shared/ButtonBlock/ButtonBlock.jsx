

// eslint-disable-next-line react/prop-types
const ButtonBlock = ({handler, children, params}) => {
    return (
        <button onClick={params ? () => handler(params) : handler} className="my-6 bg-rose-500 p-3 block w-full md:w-1/3 capitalize text-white font-sans font-semibold rounded-md mx-4 md:mx-auto hover:bg-rose-600">{children}</button>
    );
};

export default ButtonBlock;