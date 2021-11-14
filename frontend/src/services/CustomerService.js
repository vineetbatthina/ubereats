import axios from 'axios';
import serverUrl from '../utils/clientconfig';

export async function getLocalRestaurants(locationJson) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
        body: JSON.stringify(locationJson)
    };
    console.log("Client Side User Sent:"+ locationJson);
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/getLocalRestaurants`, requestOptions);
        let data = await fetchResponse;
        if(data.status === 200 || data.status === 301){
            return data.status;
        }
        else{
            return 0;
        }
    } catch (e) {
        console.log(e);
        return -1;
    }  
}

export async function getDishesbyResId(restaurantId) {

    const token = localStorage.getItem('token');
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
        body: JSON.stringify(restaurantId)
    };
    let dishes = null;
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/getDishesbyResId`, requestOptions);
        const data = await fetchResponse.json();
        if(fetchResponse.status===200){
            dishes = data;
        }
    } catch (e) {
        console.log(e);
    }
    return dishes;
}

export async function sendOrders(order) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
        body: JSON.stringify(order)
    };
    console.log("Client Side order sent:"+ order);
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/sendOrders`, requestOptions);
        let data = await fetchResponse;
        if(data.status === 200){
            return true;
        }
        else{
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }  
}

export async function getOrdersByCustEmail(emailId) {


    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
        body: JSON.stringify(emailId)
    };
    let orders = null;
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/getOrdersByCustEmail`, requestOptions);
        const data = await fetchResponse.json();
        if(fetchResponse.status===200){
            orders = data;
        }
    } catch (e) {
        console.log(e);
    }
    return orders;
}

export async function getCustomerProfileByEmailId(emailId) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
        body: JSON.stringify(emailId)
    };
    let profile = null;
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/getCustomerProfileByEmailId`, requestOptions);
        const data = await fetchResponse.json();
        if(fetchResponse.status===200){
            profile = data[0];
        }
    } catch (e) {
        console.log(e);
    }
    return profile;
}

export async function saveCustomerProfile(request) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
        body: JSON.stringify(request)
    };
    let profile = null;
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/saveCustomerProfile`, requestOptions);
        let data = await fetchResponse;
        if(data.status === 200){
            return true;
        }
        else{
            return false;
        }
    } catch (e) {
        console.log(e);
    }
    return profile;
}

export async function updateCustomerProfile(request) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
        body: JSON.stringify(request)
    };
    let profile = null;
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/updateCustomerProfile`, requestOptions);
        let data = await fetchResponse;
        if(data.status === 200){
            return true;
        }
        else{
            return false;
        }
    } catch (e) {
        console.log(e);
    }
    return profile;
}

export async function getRestaurantsBasedonSearch(request) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
        body: JSON.stringify(request)
    };
    let restaurants = null;
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/getRestaurantsBasedonSearch`, requestOptions);
        const data = await fetchResponse.json();
        if(fetchResponse.status===200){
            restaurants = data;
        }
    } catch (e) {
        console.log(e);
    }
    return restaurants;
}

export async function uploadProfilePicturetoS3(imageData){
    let responseUrl = '';
    try {
        responseUrl = await axios.post(`${serverUrl}/api/imageUpload/customerProfile`, imageData);
        console.log(responseUrl);
    } catch (e) {
        console.log(e);
    }
    return responseUrl;
}

export async function getFavourites(request){

    let currFavourites = [];
    try{
        currFavourites = await axios.post(`${serverUrl}/kafka/getFavourites`,request);
        if(currFavourites.data){
            console.log("Current Favourite Dishes are :" + currFavourites.data[0].favourites);
            return currFavourites.data[0].favourites;
        }
    }
    catch(e){
        console.log(e);
    }
    return currFavourites;

}

export async function updateFavourites(request){

    try{
        const result= await axios.post(`${serverUrl}/kafka/updateFavourites`,request);
        console.log("Current Favourite Dishes are :" + result);
        return result;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

export async function getRestaurantProfileByID(request) {

    let restaurant = null;
    try{
        restaurant = await axios.post(`${serverUrl}/kafka/getRestaurantProfileByID`,request);
        console.log("Current Restaurant is :" + restaurant);
        if(restaurant){
            return restaurant.data;
        }
    }
    catch(e){
        console.log(e);
    }
    return restaurant;
}