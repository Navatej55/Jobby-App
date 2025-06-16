import {Link} from 'react-router-dom'
// import { Navigate } from 'react-router-dom'
import Header from '../Header'
// import Cookies from 'js-cookie'
import './index.css'

const Home = () => {
  // const jwtToken = Cookies.get('jwt_token')
  // if (jwtToken === undefined) {
  //   return <Navigate to="/" replace />
  // }
  return (
    <div className="bg-container">
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Find the Jobs that Fits your Life</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/home-sm-bg.png"
            alt="job search"
            className="home-mobile-img"
          />
          <p className="home-description">
            Millions of people are searching for jobs, salary information, company
            reviews. Find the job that fits your abilities and potential.
          </p>
          <Link to="/jobsPage" className="link-item">
            <button type="button" className="shop-now-button shiny-login-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
