import React, { useState } from 'react';
import API from '../api/api';
import '../style/ResumeUpload.css'; // Custom styling

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await API.post('resumes/upload/', formData);
      setSkills(res.data.skills || []);
      setError("");
    } catch (err) {
      setError("Failed to upload resume. Please try again.");
    }
  };

  return (
    <div className="resume-upload-container">
      <h2 className="resume-upload-title">Upload Your Resume</h2>

      <input
        type="file"
        className="file-input"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="upload-button" onClick={handleUpload}>
        Upload Resume
      </button>

      <div className="skills-list">
        {error && <p className="error-message">{error}</p>}
        {skills.length > 0 && (
          <>
            <h2>Extracted Skills:</h2>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;
