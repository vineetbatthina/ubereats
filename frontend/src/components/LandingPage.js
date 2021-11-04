import React from 'react';
import '../css/App.css';
import '../css/Generic.css';
import { getAllRestaurants } from "../services/UserService";
import RestaurantCard from "./Common/RestaurantCard";
import LandingNavBar from './LandingNavBar';
import { connect } from 'react-redux';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sideNavbarVisible: false,
      location: '',
      restaurants: [],
      nearByRestaurants: [],
      otherRestaurants: [],
      showRestaurant: false,
      restaurantIdSelected: '',
      locationAvailable: false
    };

    this.loadSideNavBar = this.loadSideNavBar.bind(this);
    this.collapseSidebar = this.collapseSidebar.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
  }

  loadSideNavBar() {
    this.setState({ sideNavbarVisible: !this.state.sideNavbarVisible })
  }

  collapseSidebar() {
    this.setState({ sideNavbarVisible: false })
  }

  locationChangeHandler(location) {

    let nearByRestaurants = [];
    let otherRestaurants = [];

    this.state.restaurants.forEach((restaurant) => {
      if (restaurant.store_location === location) {
        nearByRestaurants.push(restaurant);
      }
      else {
        otherRestaurants.push(restaurant);
      }
    })

    this.setState({
      nearByRestaurants: nearByRestaurants,
      otherRestaurants: otherRestaurants,
      locationAvailable: (location!=='') ? true : false 
    })

  }

  async componentDidMount() {
    const initMap = new Map();
    localStorage.restaurantMap = JSON.stringify(Array.from(initMap));
    const locationAvailable = (localStorage.getItem('location')) ? true : false;
    const restaurants = await getAllRestaurants();
    const nearByRestaurants = [];
    const otherRestaurants = [];

    if (restaurants) {

        restaurants.forEach((restaurant) => {
          if (restaurant.store_location === localStorage.getItem('location')) {
            nearByRestaurants.push(restaurant);
          }
          else {
            otherRestaurants.push(restaurant);
          }
        })
      

      this.setState({
        restaurants: restaurants,
        showRestaurant: false,
        restaurantIdSelected: '',
        locationAvailable: locationAvailable,
        nearByRestaurants: nearByRestaurants,
        otherRestaurants: otherRestaurants
      })

      const restaurantMap = new Map(JSON.parse(localStorage.restaurantMap));
      restaurants.forEach((restaurant) => {
        restaurantMap.set(restaurant.restaurant_id, restaurant.store_name)
      })
      localStorage.restaurantMap = JSON.stringify(Array.from(restaurantMap));
    }

    console.log(localStorage.restaurantMap);
  }

  render() {
    let hideNearByRestuarants = false;
    hideNearByRestuarants = (localStorage.getItem('location')) ? false : true;

    if (this.state) {
      hideNearByRestuarants = !this.state.locationAvailable || this.state.nearByRestaurants.length === 0;
    }

    return (
      <div>
        <LandingNavBar changedLocation={this.locationChangeHandler} />
        <div style={{ marginLeft: "3%" }}>
          <div hidden={hideNearByRestuarants}>
            <div>
              <h2>Serving Near You</h2>
            </div>
            <div >
              {
                this.state.nearByRestaurants.map((restaurant) => {
                  return (
                    <div className="col" key={restaurant.restaurant_id}>
                      <RestaurantCard restaurantName={restaurant.store_name} restaurantDescription={restaurant.description} restaurantImg={restaurant.restaurant_img} restaurantId={restaurant.restaurant_id} pathName="/restaurantDisplayForGuest" source="guest" />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div hidden={this.state.otherRestaurants.length===0}>
            <div>
              <h2>Our Restaurant Partners </h2>
            </div>
            <div className="row">
              {
                this.state.otherRestaurants.map((restaurant) => {
                  return (
                    <div className="col-3" key={restaurant.restaurant_id}>
                      <RestaurantCard restaurantName={restaurant.store_name} restaurantDescription={restaurant.description} restaurantImg={restaurant.restaurant_img} restaurantId={restaurant.restaurant_id} pathName="/restaurantDisplayForGuest" source="guest" />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.userReducer.location
  };
};

export default connect(mapStateToProps)(LandingPage)
