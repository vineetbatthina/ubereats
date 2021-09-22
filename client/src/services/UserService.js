export async function getAllUsers() {

    const response = await fetch('http://localhost:3080/api/users');
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
        const fetchResponse = await fetch('http://localhost:3080/api/createUser', requestOptions);
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