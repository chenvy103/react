import { baseURL } from './fetchAPI';
import { getLocalStorageItem, removeLocalStorageItem } from './LocalStorageService'

export async function logout(){
    try{
        const token = getLocalStorageItem('accessToken')
        const res = await fetch(`${baseURL}/logout`,{
            method: 'POST',
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        });

        const data = await res.json();
        if(data.success == true){
            //deleteToken
            removeLocalStorageItem('accessToken')
        }

        return data

    } catch(error) {
        console.log('error', error)
    }

}