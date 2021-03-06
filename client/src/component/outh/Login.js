import React, {Component} from 'react';
// import axios from 'axios'
// import classnames from "classnames";
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom'
import {loginUser} from "../../actions/authActions";
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state ={
      email: '',
      password: '',
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
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData);
    //without Redux
    // axios.post('/api/users/login', user)
    //   .then(res => console.log("Login success full", res))
    //   // .catch(err => console.log("err,", err))
    //   .catch(err => this.setState({errors : err.response.data}))
    // // console.log("form data is ",newUser);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your SocialConnector account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="email"
                  name = "email"
                  placeholder={"Email Address"}
                  value={this.state.name}
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
                {/*    value={this.state.name}*/}
                {/*    onChange={this.onChange}*/}
                {/*  />*/}
                {/*  {errors.email && (<div className="invalid-feedback">{errors.email}*/}
                {/*</div> )}*/}
                {/*</div>*/}

                <TextFieldGroup
                type="password"
                name = "password"
                placeholder="Password"
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
                <input type="submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth,
  errors : state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);