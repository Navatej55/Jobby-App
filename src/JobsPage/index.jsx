import JobItem from "../JobItem"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import './index.css'
import Header from "../Header"
import BeatLoader from 'react-spinners/BeatLoader'

const employmentTypes = [
  { label: "Full Tme", value: "Full Time" },
  { label: "Part Time", value: "Part Time" },
  { label: "Freelance", value: "Freelance" },
  { label: "Internship", value: "Internship" },
];

const salaryRanges = [
  { label: "10 LPA and above", value: 10 },
  { label: "20 LPA and above", value: 20 },
  { label: "30 LPA and above", value: 30 },
  { label: "40 LPA and above", value: 40 },
];

const JobsPage = ({onJobClick}) => {
  const [profileData, setprofileDta] = useState({})
  const [allJobs, setAllJobs] = useState([])
  // const [jobsData, setJobsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedSalary, setSelectedSalary] = useState(null)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };

    const getResponds = async () => {
      setIsLoading(true);
      try {
        const [profileRes, jobsRes] = await Promise.all([
          fetch("https://apis.ccbp.in/profile", option),
          fetch("https://apis.ccbp.in/jobs", option),
        ]);
        const profile = await profileRes.json();
        const jobs = await jobsRes.json();
        setprofileDta(profile.profile_details);
        // setJobsData(jobs.jobs);
        setAllJobs(jobs.jobs);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
      setIsLoading(false);
    };

    getResponds();
  }, []);

  // Checkbox handler
  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Radio handler
  const handleSalaryChange = (salary) => {
    setSelectedSalary(salary);
  };

  // Search handler
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filter logic
  const filteredJobs = allJobs.filter(job => {
    // Employment type filter
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(job.employment_type);

    // Salary filter (extract number from "10 LPA" etc.)
    const jobSalary = parseInt(job.package_per_annum);
    const matchesSalary =
      !selectedSalary || (jobSalary >= selectedSalary);

    // Search filter
    const matchesSearch = job.title.toLowerCase().includes(searchText.toLowerCase());

    return matchesType && matchesSalary && matchesSearch;
  });

  const renderLoader = () => (
    <div className="loading-container" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <BeatLoader color="#ff5733" />
    </div>
  )
  const allJobsList = () => (
      <div className="job-list">
        {filteredJobs.map(job => (
          <JobItem key={job.id} job={job} onClick={() => onJobClick(job)} />
        ))}
      </div>
  )
  const renderJobsList = () => (
    <>
      <Header />
      <div className="jobs-page">
        <div className="jobs-header">
          <div className="jobs-header-content">
            <div className="profile-info">
              <img src={profileData.profile_image_url} alt="Profile" />
              <p style={{ color: "black" }}>{profileData.name}</p>
              <p style={{ color: "black" }}>{profileData.short_bio}</p>
            </div>
          </div>
          <div className="filter">
            <h1 style={{marginTop: "10px"}}>Type of Employment</h1>
            <ul style={{padding: "15px"}}>
              {employmentTypes.map(type => (
                <li key={type.value}>
                  <input
                    style={{marginTop:"6px"}}
                    type="checkbox"
                    checked={selectedTypes.includes(type.value)}
                    onChange={() => handleTypeChange(type.value)}
                  />
                  <label>{type.label}</label>
                </li>
              ))}
            </ul>
            <hr className="line"/>
            <h1>Salary range</h1>
            <ul style={{padding: "15px"}}>
              {salaryRanges.map(range => (
                <li key={range.value} style={{marginTop:"10px"}}>
                  <input
                    type="radio"
                    checked={selectedSalary === range.value}
                    onChange={() => handleSalaryChange(range.value)}
                  />
                  <label>{range.label}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="jobsList">
          <input
            style={{width:"80%"}}
            className="search-input"
            type="text"
            placeholder="Filter jobs..." 
            value={searchText}
            onChange={handleSearchChange}
          />
          <div className="job-list">
            {isLoading ? renderLoader() : allJobsList()}
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {renderJobsList()}
    </>
  )
}

export default JobsPage;