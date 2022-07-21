import { baseURL } from './fetchAPI';
import { getLocalStorageItem } from './LocalStorageService';

export async function getCurrentUser(){
    const token = getLocalStorageItem('accessToken')
    //console.log('getToken', token)
    if(token !== null){
        const data = await getUserData(token)
        console.log('userData', data)
        return data
    }
}

export async function getUserData(token){
    try{
        const res = await fetch(`${baseURL}/me`,{
            method: 'get',
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        });
        return await res.json();

    } catch(error) {
        console.log('error', error)
        return error
    }
}