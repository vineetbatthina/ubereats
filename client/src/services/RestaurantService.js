import axios from 'axios';

export async function getAllRestaurants() {

    const response = await fetch('http://localhost:3080/api/restuarants');
    const data = await response.json();
    return data;
}

export async function createRestaurant(restuarant) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restuarant)
    };
    console.log("Client Side restaurant object Sent:" + restuarant);
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/createRestaurant', requestOptions);
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

    let resProfile = null;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/getRestaurantProfile', requestOptions);
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

export async function getRestaurantProfileByID(request) {

    let resProfile = null;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/getRestaurantProfileById', requestOptions);
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantProfile)
    };
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/saveRestaurantProfile', requestOptions);
        return fetchResponse.status;
    } catch (e) {
        console.log(e);
        return -1;
    }
}

export async function saveDish(dish) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dish)
    };
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/saveDish', requestOptions);
        return fetchResponse.status;
    } catch (e) {
        console.log(e);
        return -1;
    }
}

export async function getDishes(emailId) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailId)
    };
    let dishes = null;
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/getDishes', requestOptions);
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailId)
    };
    let orders = null;
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/getOrdersByResId', requestOptions);
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/updateOrder', requestOptions);
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/updateDish', requestOptions);
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
        responseUrl = await axios.post('http://localhost:3080/api/imageUpload/customerProfile', imageData);
        console.log(responseUrl);
    } catch (e) {
        console.log(e);
    }
    return responseUrl;
}