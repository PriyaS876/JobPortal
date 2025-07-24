import React, { useEffect, useState } from 'react';
import API from '../api/api';
import '../style/JobList.css';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await API.get('jobs/');
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(term.toLowerCase()) ||
      job.skills_required.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="joblist-container">
      <h2 className="joblist-heading">Available Jobs</h2>

      <input
        type="text"
        placeholder="Search by job title or skills..."
        className="joblist-search"
        value={search}
        onChange={handleSearch}
      />

      {filteredJobs.length === 0 ? (
        <p className="joblist-empty">No jobs available.</p>
      ) : (
        <div className="joblist-grid">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-desc">{job.description}</p>
              <p className="job-skills">
                <strong>Skills:</strong> {job.skills_required}
              </p>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
