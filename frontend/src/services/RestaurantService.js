import axios from 'axios';
import serverUrl from '../utils/clientconfig';

export async function getAllRestaurants() {

    const response = await fetch(`${serverUrl}/kafka/restuarants`);
    const data = await response.json();
    return data;
}

export async function createRestaurant(restuarant) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restuarant)
    };
    console.log("Client Side restaurant object Sent:" + restuarant);
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/createRestaurant`, requestOptions);
        const data = await fetchResponse;
        if (data.status === 200 || data.status === 301) {
            return data.status;
        }
        else {
            return 0;
        }
    } catch (e) {
        console.log(e);
        return -1;
    }
}

export async function getRestaurantProfile(request) {

    const token = localStorage.getItem('token');

    let resProfile = null;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/getRestaurantProfile`, requestOptions);
        const data = await fetchResponse.text();
        if (fetchResponse.status === 200) {
            resProfile = JSON.parse(data);
        }
        return resProfile;
    } catch (e) {
        console.log(e);
        return -1;
    }
}

export async function saveRestaurantProfile(restaurantProfile) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantProfile)
    };
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/saveRestaurantProfile`, requestOptions);
        return fetchResponse.status;
    } catch (e) {
        console.log(e);
        return -1;
    }
}

export async function saveDish(dish) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dish)
    };
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/saveDish`, requestOptions);
        return fetchResponse.status;
    } catch (e) {
        console.log(e);
        return -1;
    }
}

export async function getDishes(emailId) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailId)
    };
    let dishes = null;
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/getDishes`, requestOptions);
        const data = await fetchResponse.json();
        if(fetchResponse.status===200){
            dishes = data;
        }
    } catch (e) {
        console.log(e);
    }
    return dishes;
}

export async function getOrdersByResId(emailId) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailId)
    };
    let orders = null;
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/getOrdersByResId`, requestOptions);
        const data = await fetchResponse.json();
        if(fetchResponse.status===200){
            orders = data;
        }
    } catch (e) {
        console.log(e);
    }
    return orders;
}

export async function updateOrder(request) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/updateOrder`, requestOptions);
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

export async function updateDish(request) {

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/updateDish`, requestOptions);
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

export async function uploadRestaurantImgtoS3(imageData){
    let responseUrl = '';
    try {
        responseUrl = await axios.post(`${serverUrl}/api/imageUpload/customerProfile`, imageData);
        console.log(responseUrl);
    } catch (e) {
        console.log(e);
    }
    return responseUrl;
}