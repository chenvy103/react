import {token} from './fetchAPI'

export function convertTo(data){
    return{
        "invitationToken" : token,
        "name" : data.name,
        "email" : data.email,
        "password" : data.password,
        "passwordConfirmation" : data.pwconfirm
    }
}
