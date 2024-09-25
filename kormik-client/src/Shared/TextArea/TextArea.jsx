

// eslint-disable-next-line react/prop-types
const TextArea = ({label, type, name, placeholder}) => {
    return (
        <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">
                {label}
              </label>
              <textarea
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full p-6 rounded-md border border-rose-500"
              />
            </div>
    );
};

export default TextArea;