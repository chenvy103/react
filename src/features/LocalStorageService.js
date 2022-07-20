import React from 'react'



export function saveToken(token = {}){
    localStorage.setItem('', JSON.stringify(token));
}


