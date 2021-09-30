import React from 'react';
import '../css/App.css';
import '../css/Generic.css';
import LoginSideBar from './LoginSideBar';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sideNavbarVisible: false,
      location : ''
    };

    this.loadSideNavBar = this.loadSideNavBar.bind(this);
    this.collapseSidebar = this.collapseSidebar.bind(this);
    this.searchByLocation = this.searchByLocation.bind(this);
  }

  loadSideNavBar() {
    this.setState({sideNavbarVisible: !this.state.sideNavbarVisible})
  }

  collapseSidebar() {
    this.setState({ sideNavbarVisible: false })
  }

  searchByLocation(event){
    if(event.key === 'Enter'){
      console.log(this.state.location);
    }
  }

  render() {
    return (
      <div className="landing_page">
        <div>
          {this.state.sideNavbarVisible === true ? <LoginSideBar collapseSidebar={this.collapseSidebar} /> : null}
        </div>
        <div className="navbar">
          <span className="hamburger" onClick={this.loadSideNavBar}>&#9776;</span>
          <a href="/">
            <img alt="Uber Eats Home" role="img" src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" width="146" height="24" />
          </a>
          <input type="text" placeholder="Enter delivery address" value={this.state.location} onChange={(e) => this.setState({ location: e.target.value })} className="location_input" onKeyDown={this.searchByLocation}></input>
          <a href="/userLogin"><button className="button" id="signin_btn" href="/userLogin">Sign In</button></a>
        </div>
      </div>

    );
  }
}

export default LandingPage;
