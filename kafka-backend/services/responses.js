const successResponse = (data = {}) => {
    const responseData = {
        code: 200,
        data: {
            success: true,
            message: "Successful",
            ...data
        }
    };
    console.log("Successfully handled the request");
    console.log(responseData);
    return responseData;
}

const internalError = (data ={}) =>{

    const responseData = {
        code: 500,
        data: {
            success: false,
            message: "Internal Server Error",
            ...data
        }
    };

    console.log("Internal Server Error");
    console.log(responseData);
    return responseData;
}

const duplicateEntryError = () =>{

    const responseData = {
        code: 201,
        data: {
            success: false,
            message: "Duplicate Entry found"
        }
    };

    console.log("Duplicate Entry found");
    console.log(responseData);
    return responseData;
}


module.exports = { successResponse, internalError, duplicateEntryError};