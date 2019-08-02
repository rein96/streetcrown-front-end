const init = {
    products : []
}

export default (state = init , action) => {
    switch(action.type) {

        case 'GET_PRODUCTS' :
            return{
                ...state,
                products : action.payload
            }

        default:
            return state


    }
}