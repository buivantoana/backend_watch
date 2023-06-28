const init = {
    checklogin: false,
    loginuser:{}
}

    
const admin = (state = init,action) => {
    switch (action.type) {
        case 'checklogin':
            return {
                ...state,
                checklogin: action.payload
            }
         case 'loginuser':
            return {
                ...state,
                loginuser: action.payload
            }
        case 'logout':
            return {
                ...state,
                loginuser: {check:false}
            }
       
        default:
           return state
    }
}

export default admin;