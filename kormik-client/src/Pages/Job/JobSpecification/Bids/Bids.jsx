import { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios/useAxios";
import Heading from "../../../../Shared/Heading/Heading"
import Card from "../../../../Shared/Card/Card";

// eslint-disable-next-line react/prop-types
const Bids = ({jobId}) => {
    const axiosSecure = useAxios();
    const [bids, setBids] = useState([])
    useEffect(() =>{
        axiosSecure.get(`/bids?jobId=${jobId}`)
        .then(res => setBids(res.data))
    },[])
    return (
        <div className="p-6 border-2 rounded-md border-rose-500 shadow-md shadow-rose-300">
            <Heading>All the pitches</Heading>
            {
                bids.map(bid =>(
                    <Card key={bid._id} title={bid.bidTitle}></Card>
                ))
            }
        </div>
    );
};

export default Bids;