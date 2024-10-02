
// eslint-disable-next-line react/prop-types
const InputField = ({label, inputType, inputName, className, handler}) => {
  return (
    <div className="flex flex-col gap-4 my-2">
      <label className="capitalize text-rose-500">{label}</label>
      <input
        type={inputType}
        name={inputName}
        onChange={handler}
        className={`w-full p-2 rounded-md border border-rose-500 ${className}`}
      />
    </div>
  );
};

export default InputField;
