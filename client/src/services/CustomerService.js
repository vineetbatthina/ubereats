export async function getAllRestaurants() {
    let data =null;
    const response = await fetch('http://localhost:3080/api/getAllRestaurants');
    data = await response.json();
    return data;
}

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