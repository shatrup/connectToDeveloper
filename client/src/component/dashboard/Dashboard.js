import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getCurrentProfile, deleteAccount} from "../../actions/profileAction";
import Spinner from "../common/Spinner"
import {Link} from "react-router-dom";
import ProfileActions from "./ProfileAction";
// import PrivateRoute from "../common/PrivateRoute";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    // console.log("Set State ", state.profile);
  }

  onDeleteClick(e){
    this.props.deleteAccount();
  }
  render() {
    const {user} = this.props.auth;
    const {profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner/>;
    }
     else {
       //Checked user Logged in
       if (Object.keys(profile).length > 0){
         dashboardContent = (
           <div>
             <p className="lead text-muted" > Welcome <Link to={`/profiles/${profile.handle}`}> {user.name} </Link></p>
             <ProfileActions />
             <Experience experience={profile.experience}/>
             <Education education={profile.education} />
             {/*TODO: exp and edu */}
             <div style={{marginBottom: '60px'}}/>
             <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger"> Delete My Account</button>
           </div>
         )
       } else {
         dashboardContent = (
           <div>
             <p className="lead text-muted"> Welcome {user.name}</p>
             <p>You have not yet setup profile, please add some info</p>
             <Link to="/create-profile" className="btn btn-lg btn-info" > Create Profile</Link>
           </div>
         )
       }
      }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display4"> DashBoard</h1>
              {dashboardContent}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile : PropTypes.func.isRequired,
  deleteAccount : PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);