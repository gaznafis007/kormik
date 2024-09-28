

// eslint-disable-next-line react/prop-types
const JobSpecification = ({title, children}) => {
    return (
        <>
            <h3 className="text-rose-500 font-semibold mt-8 mb-2">{title}</h3>
            <p className="my-4 text-white">{children}</p>
        </>
    );
};

export default JobSpecification;