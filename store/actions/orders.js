import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const { token, userId } = getState().auth;
        const response = await fetch(`https://rn-complete-guide-ea9db.firebaseio.com/orders/${userId}.json?auth=${token}`);
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const ordersData = await response.json();
        if (!ordersData) {
            throw new Error('You don\'t have any orders yet!');
        }
        const orders = Object.keys(ordersData).map((id) => {
            const { cartItems, totalPrice, date } = ordersData[id];
            return new Order(id, cartItems, totalPrice, date);
        });
        dispatch({ type: SET_ORDERS, payload: { orders } });
    };
};

export const addOrder = (cartItems, totalPrice) => {
    return async (dispatch, getState) => {
        const { token, userId } = getState().auth;
        const payload = { cartItems, totalPrice, date: new Date().toISOString() };
        const response = await fetch(`https://rn-complete-guide-ea9db.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const { name } = await response.json();
        payload.id = name;
        dispatch({ type: ADD_ORDER, payload });
    };
};
