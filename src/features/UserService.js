import { baseURL } from './fetchAPI';

export async function getUserData(token){
    try{
        console.log('accessToken', token)
        const res = await fetch(`${baseURL}/me`,{
            'Authorization' : `Bearer ${token}`
        });
        return await res.json();

    } catch(error) {
        console.log('error', error)
    }
}