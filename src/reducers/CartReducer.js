const init = {
    carts : []
}

export default (state = init , action) => {
    switch(action.type) {

        case 'GET_CARTS' :
            return{
                carts : action.payload
            }

        case 'LOGOUT' :
            return {
                carts : []
            }

        default:
            return state
    }
}