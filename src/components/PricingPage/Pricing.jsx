import { useEffect } from "react";
import ProfileSidebar from "../Profile/ProfileSidebar";
import { fetchPlans } from "../../services/slices/planSlice";
import Footer from "../Home/Footer/Footer";
import Breadcrumbs from "../BreadCrumbs/Breadcrumbs";
import "./pricing.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Pricing = () => {
  const dispatch = useDispatch();
  const { data: plans, loading, error } = useSelector((state) => state.plans);
  // console.log(plans);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  return (
    <>
      <div className="profile-header">
        <h2>Pricing Plans</h2>
        <div style={{ marginRight: "8vw", width: "fit-content" }}>
          <Breadcrumbs />
        </div>
      </div>
      <div className="pricing-container">
        {/* <div className="pricing-sidebar">
        <ProfileSidebar />
      </div> */}
        <div>
          <div className="background-pricing"></div>
          <div className="benefits-pricing">
            <div className="card-content">
              <div className="benefits-img">
                <div className="ribbon">Benefits</div>
              </div>
              <div className="description-content">
                <div className="description-container">
                  <p>Simple Registration</p>
                  <p>Post Jobs In Just A Few Clicks</p>
                  <p>Payment Through PayPal And Stripe</p>
                  <p>Easy-To-Use Interfaces And Application Tracking System</p>
                  <p>Multiple Membership Plans To Fit Your Need</p>
                </div>
                <Link to="/EmployerRegister">
                  <button>Register as Employeer</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <h2>Employer Membership Pricing</h2>
        <div className="cards-wrapper">
          {plans.map((plan, idx) => (
            <div key={idx} className="card-pricing-plan">
              <div className="card-header">{plan.title}</div>
              <div className="card-price">{plan.price}</div>
              <div className="card-duration">{plan.duration}</div>
              <div className="card-section">
                <p>📝 Job Postings: {plan.jobPostings}</p>
                <p>👀 Candidate Views: {plan.candidateViews}</p>
                <p>📄 Job Description : {plan.jobDescriptionLength}</p>
                <p>📥 Resume Download : {plan.resumeDownloadLimit}</p>
                <p>📅 Job Visibility: {plan.jobVisibilityDays} days</p>
                <p>⭐ Featured Jobs: {plan.featuredJobs ? "Yes" : "No"}</p>
                <p>📧 Email Alerts: {plan.emailAlerts ? "Yes" : "No"}</p>
                <p>
                  📊 Profile Analytics: {plan.profileAnalytics ? "Yes" : "No"}
                </p>
                <p>🛠️ Support Priority: {plan.supportPriority}</p>
                <p>🏷️ Company Branding: {plan.branding ? "Yes" : "No"}</p>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
