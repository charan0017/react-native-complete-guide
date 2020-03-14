import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT: {
            const { title, imageUrl, description, price } = action.payload;
            const newProduct = new Product(Date.now().toString(), 'u1', title, imageUrl, description, price);
            return {
                ...state,
                availableProducts: [newProduct].concat(state.availableProducts),
                userProducts: [newProduct].concat(state.userProducts)
            };
        }
        case UPDATE_PRODUCT: {
            const { id, title, imageUrl, description } = action.payload;
            const userProductIndex = state.userProducts.findIndex(product => product.id);
            if (userProductIndex < 0) return state;
            const nextState = {
                ...state,
                userProducts: [...state.userProducts]
            };
            const { price } = state.userProducts[userProductIndex];
            const updatedProduct = new Product(id, 'u1', title, imageUrl, description, price);
            nextState.userProducts[userProductIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(product => product.id);
            if (availableProductIndex < 0) return nextState;
            nextState.availableProducts = [...state.availableProducts];
            nextState.availableProducts[availableProductIndex] = updatedProduct;
            return nextState;
        }
        case DELETE_PRODUCT: {
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.payload),
                availableProducts: state.availableProducts.filter(product => product.id !== action.payload)
            }
        }
        default: return state;
    }
};
