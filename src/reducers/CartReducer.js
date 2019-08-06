const init = {
    carts : []
}

export default (state = init , action) => {
    switch(action.type) {

        case 'GET_CARTS' :
            return{
                carts : action.payload
            }

        default:
            return state
    }
}