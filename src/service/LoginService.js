import { baseURL } from './fetchAPI';
import { setLocalStorageItem } from './LocalStorageService'

export async function login(account){
    try{
        console.log('account', account)
        let res = await fetch(`${baseURL}/login`,{
            method: 'POST',
            body: JSON.stringify(account),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const data = await res.json();
        if(data.success == true){
            //saveToken()
            const token = data.data.accessToken
            console.log(token)
            setLocalStorageItem('accessToken', token)
        }

        return data

    } catch(error) {
        console.log('error', error)
    }

}