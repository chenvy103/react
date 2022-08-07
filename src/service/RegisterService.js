import {convertTo} from '../service/Adapter'
import { baseURL } from './fetchAPI';

import { setLocalStorageItem } from './LocalStorageService'

export const InvitationToken = '0fb89ee8e7cc02b4dad98dddbfc871df'

export async function getInvitation(invitationToken){
    try{
        const res = await fetch(`${baseURL}/invitation/${invitationToken}`);
        return await res.json();
        
    } catch(error) {
        console.log('error', error)
    }

}

export async function register(userData){
    try{
        console.log('user', userData)
        let res = await fetch(`${baseURL}/register`,{
            method: 'POST',
            body: JSON.stringify(convertTo(userData)),
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