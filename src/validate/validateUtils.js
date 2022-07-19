/**
 * 
 * @param {*} error 
 * @returns {
 *  name: {mess: ''},
 *  email: {mess: ''}
 * }
 */
export function convertToUseFormErrors(error){
    var result = {}
    Object.keys(error).forEach(key =>{
        const messObj = { message: error[key][0] };
        result = {...result, [key] : messObj}
    })
    return result;
}

/**
 * 
 * @param {*} err 
 * @param {*} setError 
 * @param {*} propsMap 
 * {
 *  key : replaceKey
 * }
 */
export function showError(err, setError, propsMap = {}){
  const convertedError = convertToUseFormErrors(err)
  Object.keys(convertedError).forEach(key=>{
    const customKey = propsMap[key] ? propsMap[key] : key;
    setError(customKey, convertedError[key])
  })
}