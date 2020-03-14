import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalPrice: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const { id, title, price } = action.payload;
            let cartItem = state.items[id];
            if (cartItem) {
                cartItem = new CartItem(cartItem.quantity + 1, price, title);
            } else {
                cartItem = new CartItem(1, price, title);
            }
            return {
                ...state,
                items: { ...state.items, [id]: cartItem },
                totalPrice: state.totalPrice + cartItem.price
            };
        }
        case REMOVE_FROM_CART: {
            const { payload: pid } = action;
            const cartItem = state.items[pid];
            if (!cartItem) return state;
            const nextState = { ...state, items: { ...state.items } };
            nextState.items[pid] = new CartItem(cartItem.quantity - 1, cartItem.price, cartItem.title);
            if (nextState.items[pid].quantity <= 0) {
                delete nextState.items[pid];
            }
            nextState.totalPrice -= cartItem.price;
            return nextState;
        }
        case ADD_ORDER: return initialState;
        case DELETE_PRODUCT: {
            const existingCartItem = state.items[action.payload];
            if (!existingCartItem) return state;
            const nextState = {
                ...state,
                items: { ...state.items }
            };
            nextState.totalPrice -= existingCartItem.sum;
            delete nextState.items[action.payload];
            return nextState;
        }
        default: return state;
    }
};
