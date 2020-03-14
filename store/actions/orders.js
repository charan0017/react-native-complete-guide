export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalPrice) => ({
    type: ADD_ORDER,
    payload: {
        items: cartItems,
        price: totalPrice
    },
});
