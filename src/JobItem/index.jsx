import React from 'react'
import './index.css'
import { FaStar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { PiShoppingBagFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
const JobItem =({job})=> {
    const navigate = useNavigate()
    const onClickJobItem = () => {
        navigate(`/job/${job.id}`)
    }
    const {
        company_logo_url,
        title,
        rating,
        location,
        employment_type,
        package_per_annum,
        job_description
    } = job
    
    return (
        <li className="job-item card" onClick={onClickJobItem}>
        <div className="job-item-header">
            <img src={company_logo_url} alt="company logo" className="company-logo" style={{borderRadius: "10px"}}/>
            <div className="job-item-title-container">
                <h1 className="job-title">{title}</h1>
                <div style={{display: "flex"}}>
                    <FaStar className='star-icon' />
                    <p className="job-rating">
                        {rating}
                    </p>
                </div>
            </div>
        </div>
        <div className="job-item-details">
            <div className='job-details'>
                <IoLocationSharp className='location-icon'/>
                <p className="job-location">
                    {location}
                    </p>
                <PiShoppingBagFill className='employ' />
                <p className="job-employment-type">
                    {employment_type}
                </p>
            </div>
                <p className="job-package">{package_per_annum}</p>
        </div>
        <hr className='hr'/>
        <h2 className="job-description-heading">Description</h2>
        <p className="job-description">{job_description}</p>
        </li>
    )
}
export default JobItem;