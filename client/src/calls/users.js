const {axiosInstance} = require('./index')

export const RegisterUser = async (value)=>{
    try{
        const response = await axiosInstance.post('api/users/register',value)
        return response;
    }
    catch(error){
        console.log(error)
    }
}

