import React, { useEffect, useState } from 'react';
import API from '../api/api';
import '../style/OnlineJobs.css';

function OnlineJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await API.get('online-jobs/');
      setJobs(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch online jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="onlinejobs-container">
      <h2 className="onlinejobs-heading">🌐 Latest Online Jobs (Adzuna)</h2>

      <input
        type="text"
        placeholder="Search by job title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="onlinejobs-search"
      />

      {loading ? (
        <p className="onlinejobs-loading">🔄 Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p className="onlinejobs-empty">🚫 No jobs found.</p>
      ) : (
        <div className="onlinejobs-grid">
          {filteredJobs.map((job, idx) => (
            <div key={idx} className="onlinejob-card">
              <h3 className="onlinejob-title">{job.title}</h3>
              <p className="onlinejob-company">
                {job.company} &nbsp; | &nbsp; <span>{job.location}</span>
              </p>
              <p className="onlinejob-desc">
                {job.description?.slice(0, 200)}...
              </p>
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-link"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OnlineJobs;
