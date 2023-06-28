export const check = (data) => {
    return {
        type: 'checklogin',
        payload:data
    }
}

export const allbrand = (data) => {
    return {
        type: 'allbrand',
        payload:data
    }
}
export const allcategory = (data) => {
    return {
        type: 'allcategory',
        payload:data
    }
}

export const oneproduct = (data) => {
    return {
        type: 'oneproduct',
        payload:data
    }
}

export const loginuser = (data) => {
    return {
        type: 'loginuser',
        payload:data
    }
}
export const logout = () => {
    return {
        type: 'logout',
        
    }
}
export const cartdata = (data) => {
    return {
        type: 'cartdata',
        payload:data
    }
}
export const whitlistdata = (data) => {
    return {
        type: 'whitlistdata',
        payload:data
    }
}





