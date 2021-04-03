import React, {Component} from 'react';
// import axios from 'axios';
// import classnames from 'classnames';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {registerUser} from "../../actions/authActions";
import PropTypes from 'prop-types'
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:'',
      errors:{}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);

    //this method are using with Redux
    // axios.post('/api/users/register', newUser)
    //   .then(res => console.log("Registration success full", res))
    //   // .catch(err => console.log("err,", err))
    //   .catch(err => this.setState({errors : err.response.data}))
    // // console.log("form data is ",newUser);
    }
  render() {
    const {errors } = this.state;
    // const {user} = this.props.auth;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your SocialConnector account</p>
              <form noValidate onSubmit={this.onSubmit} >
                <TextFieldGroup
                  type="text"
                  name = "name"
                  placeholder={"Name"}
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                {/*<div className="form-group">*/}
                {/*  <input*/}
                {/*    type="text"*/}
                {/*    // className="is-invalid form-control form-control-lg"*/}
                {/*    className={classnames("form-control form-control-lg",*/}
                {/*      {'is-invalid' : errors.name})}*/}
                {/*    placeholder="Name"*/}
                {/*    name="name"*/}
                {/*    value={this.state.name}*/}
                {/*    onChange={this.onChange}*/}
                {/*  />*/}
                {/*  {errors.name && (<div className="invalid-feedback">{errors.name}*/}
                {/*  </div> )}*/}
                {/*</div>*/}
                <TextFieldGroup
                  type="email"
                  name = "email"
                  placeholder={"Email Address"}
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                {/*<div className="form-group">*/}
                {/*  <input*/}
                {/*    type="email"*/}
                {/*    // className="form-control form-control-lg"*/}
                {/*    className={classnames("form-control form-control-lg",*/}
                {/*      {'is-invalid' : errors.email})}*/}
                {/*    placeholder="Email Address"*/}
                {/*    name="email"*/}
                {/*    value={this.state.email}*/}
                {/*    onChange={this.onChange}*/}
                {/*  />*/}
                {/*  {errors.email && (<div className="invalid-feedback">{errors.email}*/}
                {/*  </div> )}*/}
                {/*  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>*/}
                {/*</div>*/}

                <TextFieldGroup
                  type="password"
                  name = "password"
                  placeholder={"Password"}
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                {/*<div className="form-group">*/}
                {/*  <input*/}
                {/*    type="password"*/}
                {/*    // className="form-control form-control-lg"*/}
                {/*    className={classnames("form-control form-control-lg",*/}
                {/*      {'is-invalid' : errors.password})}*/}
                {/*    placeholder="Password"*/}
                {/*    name="password"*/}
                {/*    value={this.state.password}*/}
                {/*    onChange={this.onChange}*/}
                {/*  />*/}
                {/*  {errors.password && (<div className="invalid-feedback">{errors.password}*/}
                {/*  </div> )}*/}
                {/*</div>*/}

                <TextFieldGroup
                  type="password"
                  name = "password2"
                  placeholder={"Confirm password"}
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                {/*<div className="form-group">*/}
                {/*  <input*/}
                {/*    type="password"*/}
                {/*    // className="form-control form-control-lg"*/}
                {/*    className={classnames("form-control form-control-lg",*/}
                {/*      {'is-invalid' : errors.password2})}*/}
                {/*    placeholder="Confirm Password"*/}
                {/*    name="password2"*/}
                {/*    value={this.state.password2}*/}
                {/*    onChange={this.onChange}*/}
                {/*  />*/}
                {/*  {errors.password2 && (<div className="invalid-feedback">{errors.password2}*/}
                {/*  </div> )}*/}
                {/*</div>*/}
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth,
  errors : state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));