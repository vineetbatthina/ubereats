import axios from 'axios';
import serverUrl from '../utils/clientconfig';

export async function getAllUsers() {

    const response = await fetch(`${serverUrl}/api/users`);
    const data = await response.json();
    return data;
}

export async function createUser(user) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log("Client Side User Sent:"+ user);
    try {
        const fetchResponse = await fetch(`${serverUrl}/api/createUser`, requestOptions);
        const data = await fetchResponse;
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

export async function getAllRestaurants() {
    let data =null;
    const response = await fetch(`${serverUrl}/api/getAllRestaurants`);
    data = await response.json();
    return data;
}

export async function uploadDishtoS3(imageData){
    let responseUrl = '';
    try {
        responseUrl = await axios.post(`${serverUrl}/api/imageUpload/dish`, imageData);
        console.log(responseUrl);
    } catch (e) {
        console.log(e);
    }
    return responseUrl;
}
