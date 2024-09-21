import { useState } from 'react';
import useAxios from '../useAxios/useAxios';

const useAxiosForData = (url) => {
    const [datas, setDatas] = useState([]);
    const axiosSecure = useAxios();
    axiosSecure.get(url)
    .then(res=>setDatas(res.data))
    return [datas, setDatas]
};

export default useAxiosForData;