import { baseURL } from './fetchAPI';
import { getLocalStorageItem } from './LocalStorageService';

export async function createInvite(role){
    try{
        const token = getLocalStorageItem('accessToken')
        let res = await fetch(`${baseURL}/invitationToken`,{
            method: 'POST',
            body: JSON.stringify({isAdmin: role}),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(res)

        return await res.json();

    } catch(error) {
        console.log('error', error)
    }
} 