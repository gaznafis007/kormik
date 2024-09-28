/* eslint-disable react/no-unescaped-entities */
import { useLoaderData } from "react-router-dom";
import Heading from "../../Shared/Heading/Heading"
const Job = () => {
    const job = useLoaderData();
    console.log(job)
    return (
        <div>
            <Heading>This is specific job's page</Heading>
        </div>
    );
};

export default Job;