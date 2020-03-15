import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS: {
            const { orders } = action.payload;
            return { ...state, orders };
        }
        case ADD_ORDER: {
            const { id, cartItems, totalPrice, date } = action.payload;
            const order = new Order(id, cartItems, totalPrice, date);
            return {
                ...state,
                orders: [order].concat(state.orders)
            }
        }
        default: return state;
    }
};
