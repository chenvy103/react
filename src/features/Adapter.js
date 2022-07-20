import {InvitationToken} from './RegisterService'

export function convertTo(data){
    return{
        "invitationToken" : InvitationToken,
        "name" : data.name,
        "email" : data.email,
        "password" : data.password,
        "passwordConfirmation" : data.pwconfirm
    }
}
