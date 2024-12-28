import { useState } from "react";
import UseJobs from "../../hooks/UseJobs";
import HotJobCard from "../Home/HotJobCard";
import { BiSearch } from "react-icons/bi";

const AllJobs = () => {
    const [sort, setSort] = useState(false);
    const [search, setSearch] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const { jobs, loading } = UseJobs(sort, search, minSalary, maxSalary);
    const handleReset = () => {
        setSort(false);
        setSearch('')
        setMaxSalary('')
        setMinSalary('')
    }


    if (loading) {
        return <h2>Data Loading...</h2>
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-center">All Jobs: {jobs.length} </h1>

            <div className="w-11/12 mx-auto py-5 p-3 flex items-center justify-evenly bg-base-200 gap-4 flex-col lg:flex-row">
                <button
                    onClick={() => { setSort(!sort) }}
                    className={`btn btn-neutral ${sort && 'btn-success'}`}>
                    {sort ? ' Sorted by Salary' : 'Sort By Salary'}
                </button>

                <div className="relative">
                    <input type="text"
                        placeholder="search by location"
                        className="input"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search} />
                    <BiSearch className="absolute right-3 top-[55%] transform -translate-y-1/2" size={20} />
                </div>

                <div className="space-x-6">
                    <input type="text"
                        placeholder="filter my min salary"
                        className="input"
                        onChange={(e) => setMinSalary(e.target.value)}
                        value={minSalary} />

                    <input type="text"
                        placeholder="filter my max salary"
                        className="input"
                        onChange={(e) => setMaxSalary(e.target.value)}
                        value={maxSalary} />
                </div>

                <button onClick={handleReset} className="btn btn-neutral">Reset</button>

            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    jobs.map(job => <HotJobCard key={job._id} job={job}></HotJobCard>)
                }
            </div>
        </div>
    );
};

export default AllJobs;