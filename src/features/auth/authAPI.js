import axiosInstance from "../../api/axiosInstance";

export const loginUserAPI=async (formData)=>{
    const res=await axiosInstance.post('/auth/login',formData);
    console.log("LOGIN API RESPONSE:", res.data);  // Add this
    return res.data;
};

export const registerUserAPI=async(formData)=>{
    const res=await axiosInstance.post('/auth/register',formData);
    return res.data;
}