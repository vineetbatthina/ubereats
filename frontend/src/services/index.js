import serverUrl from "../utils/clientconfig";

export const login = async (credentials) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    };

    const response = {
        restaurantOwner: '',
        code: -1,
        errorMessege : ''
    }
    console.log("User Trying to Login");
    try {
        const fetchResponse = await fetch(`${serverUrl}/kafka/login`, requestOptions);
        const data = await fetchResponse;
        if(data.status === 200 ){
            response.restaurantOwner = data.statusText;
            response.code = data.status;
            return response;
        }
        else if (data.status === 400 ){
            response.code = data.status;
            response.errorMessege = data.statusText;
            return response;
        }
        else{
            response.code = 0;
            return response;
        }
    } catch (e) {
        console.log(e);
        response.code = -1;
        return response;
    }
}
