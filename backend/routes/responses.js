const successResponse = (response, data = {}) => {
    let responseData = {
        success: true,
        message: "Successful",
        ...data
    };
    console.log("Code: 200");
    console.log(responseData);
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(responseData));
}

const internalError = (response, data ={}) =>{

    let responseData = {
        success: false,
        message: "internal Server Error",
        ...data
    };
    console.log("Error code : 500");
    console.log(responseData);
    response.writeHead(500, {
        'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(responseData));

}

const duplicateEntryError = (response, data ={}) =>{

    let responseData = {
        success: false,
        message: "Duplicate Entry Found",
        ...data
    };
    console.log("Error code : 201");
    console.log(responseData);
    response.writeHead(201, {
        'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(responseData));

}

const responseHandler = (response, result) =>{

    
    console.log("Response is : " + JSON.stringify(result));

    switch (result.code) {
        case 200:
            successResponse(response, result.data);
            break;
        case 201:
            duplicateEntryError(response, result.data);
            break;
        case 500:
            internalError(response, {errorMessage : "Internal server Error"});
            break;
        default:
            internalError(response,{
                errorMessage: "unknown internal error"
            });
    }
}

module.exports = { successResponse, internalError, duplicateEntryError, responseHandler};