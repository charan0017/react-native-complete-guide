import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token, userId, expirationTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimer(expirationTime));
        dispatch({ type: AUTHENTICATE, payload: { token, userId } });
    };
};

export const signUp = (email, password) => {
    return async (dispatch) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASc3EWlIDPvKi-n0mzbj_Y8loQI5CGSCw', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        });
        if (!response.ok) {
            const errorResData = await response.json();
            const { message: errorId } = errorResData.error;
            let errMsg;
            if (errorId === 'EMAIL_EXISTS') {
                errMsg = 'This email exists already!';
            } else {
                errMsg = 'Something went wrong!';
            }
            throw new Error(errMsg);
        }
        const { idToken: token, localId: userId, expiresIn } = await response.json();
        const expirationTime = parseInt(expiresIn || 0) * 1000;
        dispatch(authenticate(token, userId, expirationTime));
        saveDataToStorage(token, userId, expirationTime);
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASc3EWlIDPvKi-n0mzbj_Y8loQI5CGSCw', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        });
        if (!response.ok) {
            const errorResData = await response.json();
            const { message: errorId } = errorResData.error;
            let errMsg;
            if (errorId === 'EMAIL_NOT_FOUND') {
                errMsg = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                errMsg = 'This password is invalid!';
            } else {
                errMsg = 'Something went wrong!';
            }
            throw new Error(errMsg);
        }
        const { idToken: token, localId: userId, expiresIn } = await response.json();
        const expirationTime = parseInt(expiresIn || 0) * 1000;
        dispatch(authenticate(token, userId, expirationTime));
        saveDataToStorage(token, userId, expirationTime);
    };
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (!timer) return;
    clearTimeout(timer);
};

const setLogoutTimer = (expirationTime) => {
    return (dispatch) => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

const saveDataToStorage = (token, userId, expirationTime = 0) => {
    const expirationDate = new Date(Date.now() + expirationTime);
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token || null,
        userId: userId || null,
        expiryDate: expirationDate.toISOString()
    }));
};
