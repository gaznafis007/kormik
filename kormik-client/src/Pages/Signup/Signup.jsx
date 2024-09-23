import Heading from "../../Shared/Heading/Heading";


const Signup = () => {
    return (
        <section>
            <Heading>welcome! land your first project with us</Heading>
            <form  className="bg-gray-800 md:w-1/2 mx-4 md:mx-auto rounded-md shadow-md shadow-slate-600 p-8">
            
                <div className="flex flex-col gap-4">
                    <label className="capitalize text-rose-500">your name</label>
                    <input type="text" name="name" className="w-full p-2 rounded-md border border-rose-500" />
                </div>

            </form>
        </section>
    );
};

export default Signup;