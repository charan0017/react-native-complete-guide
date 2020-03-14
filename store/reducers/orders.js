
import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER: {
            const order = new Order(Date.now().toString(), action.payload.items, action.payload.price);
            return {
                ...state,
                orders: [order].concat(state.orders)
            }
        }
        default: return state;
    }
};
