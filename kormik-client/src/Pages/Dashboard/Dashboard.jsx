import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxios from "../../hooks/useAxios/useAxios";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
const Dashboard = () => {
    const {user, isLoading} = useAuth();
    const axiosSecure = useAxios();
    const [profile, setProfile] = useState()
    useEffect(() =>{
        axiosSecure.get(`/users?email=${user?.email}`).then(res =>{
            setProfile(res.data)
            isLoading(false)
            toast.success(`welcome ${res.data?.name}`)
        })
    },[])
    return (
        <section className="p-6">
            <div className="flex flex-col gap-4">
            <UserCircleIcon className="size-32 p-2 border-2 border-white text-white"/>
            <h2 className="text-3xl font-bold text-white">{profile?.name}</h2>
            <p className="text-white font-sans font-semibold">{profile?.email}</p>
            </div>
                <h2 className="font-semibold my-6 text-xl text-white capitalize">other information</h2>
            <div className="flex flex-col md:flex-row gap-4 text-white my-4">
                <p>Country: {profile?.country}</p>
                <p>
                    {
                        profile?.employerCompanyName ? profile?.employerCompanyName : profile?.title
                    }
                </p>
            </div>
        </section>
    );
};

export default Dashboard;