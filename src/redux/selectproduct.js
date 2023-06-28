const init = {
    brand: [],
    category: [],
    oneproduct: [],
    cart: [],
    whitlist:[]
}

    
const selectproduct = (state = init,action) => {
    switch (action.type) {
        case 'allbrand':
            return {
                ...state,
                brand: action.payload
            }
        case 'allcategory':
            return {
                ...state,
                category: action.payload
            }
         case 'oneproduct':
            return {
                ...state,
                oneproduct: action.payload
            }
            case 'cartdata':
            return {
                ...state,
                cart: action.payload
            }
         case 'whitlistdata':
            return {
                ...state,
                whitlist: action.payload
            }
       
        default:
           return state
    }
}

export default selectproduct;