/* eslint-disable react/no-unescaped-entities */
import { useLoaderData } from "react-router-dom";
import JobSpecification from "./JobSpecification/JobSpecification";
import useAuth from "../../hooks/useAuth/useAuth";
import Button from "../../Shared/Button/Button";
import { useState } from "react";
const Job = () => {
    const {title, jobPoster, jobDescription, skill, projectRate, deadline, postDate, category, jobType} = useLoaderData();
    const [bidForm, setBidForm] = useState(false)
    const posted = postDate.split('T')[0]
    const {user, loading} =useAuth()
    const handleStartBiding = () =>{
        setBidForm(!bidForm)
    }
    if(loading){
        return (
            <h2 className="text-rose-500 text-center text-3xl animate-pulse">Loading..</h2>
        )
    }
    return (
        <section className="mx-8 my-4">
            <h1 className="text-4xl font-bold text-rose-500 capitalize">{title}</h1>
            <h3 className="text-lg font-semibold font-sans text-white">{`@${jobPoster}`}</h3>
            <h3 className="text-lg font-semibold font-sans my-6 text-gray-200">Job posted on: {posted}</h3>
            <h3 className="text-lg font-semibold font-sans my-6 text-gray-200 capitalize">Category: {category}</h3>
            <h3 className="text-lg font-semibold font-sans my-6 text-gray-200 capitalize">job type: {jobType}</h3>
            <JobSpecification title={"description"}>
            {jobDescription}
            </JobSpecification>
            <JobSpecification title={"required skills"}>
            <ul className="text-white capitalize list-disc mx-4">
                {
                    skill.map((oneSkill, idx) => (
                        <li key={idx}>{oneSkill}</li>
                    ))
                }
            </ul>
            </JobSpecification>
            <JobSpecification title={"Salary / Compensation / Rate"}>
                {`${projectRate} $`}
            </JobSpecification>
            <JobSpecification title={"deadline"}>
                {deadline}
            </JobSpecification>
            {
                user.role === 'freelancer' && (
                    bidForm ? (
                        <>
                            <Button handler={handleStartBiding}>cancel bid</Button>    
                        </>
                    ) : <Button handler={handleStartBiding}>submit your bid</Button>
                )
            }
        </section>
    );
};

export default Job;