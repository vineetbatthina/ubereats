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