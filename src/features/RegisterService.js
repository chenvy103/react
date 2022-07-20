import {convertTo} from '../features/Adapter'
import { baseURL } from './fetchAPI';



export const InvitationToken = '860f25a8d889e8c00113bcac2c63fd4e'

export async function getInvitation(){
    const res = await fetch(`${baseURL}/invitation/${InvitationToken}`);
    
    if(res.status == 200){
        const data = await res.json();
        return data.data
    }else{
        console.log("Error", res.json());
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
        }

        return data

    } catch(error) {
        console.log('error', error)
    }
}