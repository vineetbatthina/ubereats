import React from 'react';
import '../css/App.css';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="navbar">
        <a href="/">
          <img alt="Uber Eats Home" role="img" src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" width="146" height="24" />
        </a>
        <a href="/userLogin"><button className="button" id="signin_btn" href="/userLogin">Sign In</button></a>
      </div>
    );
  }
}

export default LandingPage;
