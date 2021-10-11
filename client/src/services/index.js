import serverUrl from "../utils/clientconfig";
const TOKEN_KEY = 'jwt';

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
        const fetchResponse = await fetch(`${serverUrl}/api/login`, requestOptions);
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

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}