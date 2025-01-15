

// eslint-disable-next-line react/prop-types
const TextArea = ({label, type, name, placeholder, handler, defaultValue}) => {
    return (
        <div className="flex flex-col gap-4 my-2">
              <label className="capitalize text-rose-500">
                {label}
              </label>
              <textarea
              onChange={handler}
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full p-6 rounded-md border border-rose-500"
                defaultValue={defaultValue}
              />
            </div>
    );
};

export default TextArea;