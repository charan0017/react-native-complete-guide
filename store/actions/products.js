import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://rn-complete-guide-ea9db.firebaseio.com/products.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const productsData = await response.json();
            const products = Object.keys(productsData).map(id => {
                const { title, imageUrl, description, price } = productsData[id];
                return new Product(id, 'u1', title, imageUrl, description, price);
            });
            dispatch({ type: SET_PRODUCTS, payload: { products } })
        } catch (e) {
            // send to custom analytics server
            throw e;
        }
    };
};

export const deleteProduct = (productId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`https://rn-complete-guide-ea9db.firebaseio.com/products/${productId}.json`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch({ type: DELETE_PRODUCT, payload: { pid: productId } });
        } catch (e) {
            throw e;
        }
    };
};

export const createProduct = (title, imageUrl, description, price) => {
    return async (dispatch) => {
        try {
            const payload = { title, imageUrl, description, price };
            const response = await fetch('https://rn-complete-guide-ea9db.firebaseio.com/products.json', {
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
        } catch (e) {
            throw e;
        }
    };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return async (dispatch) => {
        try {
            const payload = { title, imageUrl, description };
            const response = await fetch(`https://rn-complete-guide-ea9db.firebaseio.com/products/${id}.json`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            payload.id = id;
            dispatch({ type: UPDATE_PRODUCT, payload });
        } catch (e) {
            throw e;
        }
    };
};
