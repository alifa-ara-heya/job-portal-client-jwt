import axios from "axios";
import { useEffect, useState } from "react";

const UseJobs = (sort, search, minSalary, maxSalary, page = 1, limit = 5) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // axios.get(`https://job-portal-server-for-recruiter-part3-swart.vercel.app/jobs?sort=${sort}`)
        axios.get(`https://job-portal-server-for-recruiter-part3-swart.vercel.app/jobs?sort=${sort}&search=${search}&min=${minSalary}&max=${maxSalary}&page=${page}&limit=${limit}`)
            .then(res => {
                setLoading(false)
                // setJobs(res.data) //without pagination
                setJobs(res.data.jobs) //we are sending res as an object
                setTotalPages(res.data.totalPages)
            })
    }, [sort, search, minSalary, maxSalary, page, limit])

    return { jobs, loading, totalPages }
};

export default UseJobs;