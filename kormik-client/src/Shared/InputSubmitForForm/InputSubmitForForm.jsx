

// eslint-disable-next-line react/prop-types
const InputSubmitForForm = ({value, type}) => {
    return (
        <input
            type={type}
            value={value}
            className="mt-6 bg-rose-500 p-3 block w-full capitalize text-white font-sans font-semibold rounded-md mx-auto hover:bg-rose-600"
          />
    );
};

export default InputSubmitForForm;