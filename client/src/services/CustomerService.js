export async function getLocalRestaurants(locationJson) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationJson)
    };
    console.log("Client Side User Sent:"+ locationJson);
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/getLocalRestaurants', requestOptions);
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantId)
    };
    let dishes = null;
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/getDishesbyResId', requestOptions);
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    };
    console.log("Client Side order sent:"+ order);
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/sendOrders', requestOptions);
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailId)
    };
    let orders = null;
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/getOrdersByCustEmail', requestOptions);
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailId)
    };
    let profile = null;
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/getCustomerProfileByEmailId', requestOptions);
        const data = await fetchResponse.json();
        if(fetchResponse.status===200){
            profile = data;
        }
    } catch (e) {
        console.log(e);
    }
    return profile;
}

export async function saveCustomerProfile(request) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    let profile = null;
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/saveCustomerProfile', requestOptions);
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    let profile = null;
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/updateCustomerProfile', requestOptions);
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