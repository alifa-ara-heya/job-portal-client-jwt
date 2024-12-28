import { useState } from "react";
import UseJobs from "../../hooks/UseJobs";
import HotJobCard from "../Home/HotJobCard";
import { BiSearch } from "react-icons/bi";

const AllJobs = () => {
    const [sort, setSort] = useState(false);
    const [search, setSearch] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { jobs, loading, totalPages } = UseJobs(sort, search, minSalary, maxSalary, currentPage);
    const handleReset = () => {
        setSort(false);
        setSearch('')
        setMaxSalary('')
        setMinSalary('')
        setCurrentPage(1);
    }

    const handlePageChange = page => {
        setCurrentPage(page)
    }

    if (loading) {
        return <h2>Data Loading...</h2>
    }
    return (
        <div className="w-11/12 mx-auto py-5 p-3 ">
            <h1 className="text-3xl font-bold text-center">All Jobs: {jobs.length} </h1>

            <div className=" py-5 p-3 flex items-center justify-evenly bg-base-200 gap-4 flex-col lg:flex-row">
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

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10' >
                {
                    jobs.map(job => <HotJobCard key={job._id} job={job}></HotJobCard>)
                }
            </div>


            <div className="join flex justify-center items-center">
                {
                    [...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                        >{index + 1}</button>
                    ))
                }

                {/* <button className="join-item btn btn-active">2</button>
                <button className="join-item btn">3</button>
                <button className="join-item btn">4</button> */}
            </div>
        </div>
    );
};

export default AllJobs;