// eslint-disable-next-line react/prop-types
const Button = ({children, handler, params, className}) => {
    return (
        <button
          onClick={ params ? () => handler(params) : handler}
          className={`flex flex-row items-center gap-2 my-2 bg-rose-500 p-3 text-white font-sans font-semibold rounded-md mx-auto hover:bg-rose-600 ${className}`}
        >
          {children}
        </button>
    );
};

export default Button;