import React, { Component } from 'react';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile:''
    };
  }

  componentWillMount(){
    const {userProfile,getProfile} = this.props.auth;
    if (!userProfile){
      getProfile((err,profile)=>{
        this.setState({profile});
      });
    } else {
      this.setState({profile: userProfile});
    }
  }
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                You are logged in! Access Token is {profile.sub}
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
