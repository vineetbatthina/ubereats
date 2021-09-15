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

    try {
        const fetchResponse = await fetch('http://localhost:3080/api/createUser', requestOptions);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }  
}