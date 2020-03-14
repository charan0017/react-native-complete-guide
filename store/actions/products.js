export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (productId) => ({ type: DELETE_PRODUCT, payload: productId });

export const createProduct = (title, imageUrl, description, price) => ({
    type: CREATE_PRODUCT,
    payload: { title, imageUrl, description, price }
});

export const updateProduct = (id, title, imageUrl, description) => ({
    type: UPDATE_PRODUCT,
    payload: { id, title, imageUrl, description }
});