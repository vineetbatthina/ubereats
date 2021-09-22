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
    console.log("Client Side restaurant object Sent:"+ restuarant);
    try {
        const fetchResponse = await fetch('http://localhost:3080/api/createRestaurant', requestOptions);
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