const host = "http://10.0.2.2:5000";

export const API_URL = `${host}/api`;

export const APIS = {
    createUser : API_URL + "/users/create-user",
    resendOtp : API_URL + "/users/resend-otp",
    verifyOtp: API_URL + "/users/verify-otp",
    addName: API_URL+"/users/add-name",
    addAddress: API_URL+"/users/add-address",
};