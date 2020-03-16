import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {
            const { userId } = getState().auth;
            const response = await fetch('https://rn-complete-guide-ea9db.firebaseio.com/products.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const productsData = await response.json();
            const products = [];
            const userProducts = [];
            Object.keys(productsData).forEach(id => {
                const { title, imageUrl, description, price, ownerId } = productsData[id];
                const product = new Product(id, ownerId, title, imageUrl, description, price);
                products.push(product);
                if (ownerId === userId) {
                    userProducts.push(product);
                }
            });
            dispatch({ type: SET_PRODUCTS, payload: { products, userProducts } });
        } catch (e) {
            // send to custom analytics server
            throw e;
        }
    };
};

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        const response = await fetch(`https://rn-complete-guide-ea9db.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({ type: DELETE_PRODUCT, payload: { pid: productId } });
    };
};

export const createProduct = (title, imageUrl, description, price) => {
    return async (dispatch, getState) => {
        const { token, userId: ownerId } = getState().auth;
        const payload = { title, imageUrl, description, price, ownerId };
        const response = await fetch(`https://rn-complete-guide-ea9db.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const { name } = await response.json();
        payload.id = name;
        dispatch({ type: CREATE_PRODUCT, payload });
    };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        const payload = { title, imageUrl, description };
        const response = await fetch(`https://rn-complete-guide-ea9db.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        payload.id = id;
        dispatch({ type: UPDATE_PRODUCT, payload });
    };
};
