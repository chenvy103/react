import {convertTo, convertErrorBack} from '../features/Adapter'

const link = 'http://192.168.1.22:8000/api/v1.0'
export const token = 'dad76242c437811a0778b406b3ae73a2'

export async function getInvitation(){
    const res = await fetch(`${link}/invitation/${token}`);
    
    if(res.status == 200){
        const data = await res.json();
        return data.data
    }else{
        console.log("Error", res.json());
    }

}

export async function register(userData){
    console.log('user', userData)
    let res = await fetch(`${link}/register`,{
        method: 'POST',
        body: JSON.stringify(convertTo(userData)),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    
    return await res.json();
    // throw error
}