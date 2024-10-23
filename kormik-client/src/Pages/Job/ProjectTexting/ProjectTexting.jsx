import useAuth from "../../../hooks/useAuth/useAuth";
import Button from "../../../Shared/Button/Button";
import Heading from "../../../Shared/Heading/Heading";


const ProjectTexting = () => {
    const {user} = useAuth()
    return (
        <div className="p-6 w-full md:w-1/3 overflow-y-auto border-2 rounded-md border-slate-900 shadow-md shadow-slate-300">
            <Heading>project corresponding</Heading>
            <h2 className="text-rose-500 text-center">This is new section to maintaining streak</h2>
            {
                user?.email === 'employer' ? 
                <Button>Accept the project file</Button>
                :
                <Button>submit project file</Button>
            }
        </div>
    );
};

export default ProjectTexting;