import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../../helpers/db';
import ENV from '../../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const loadPlaces = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchPlaces();
            dispatch({ type: SET_PLACES, payload: { places: dbResult.rows._array } });
        } catch (e) {
            throw e;
        }
    };
};

export const addPlace = (title, imageUri, lat, lng) => {
    return async (dispatch) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${ENV.googleApiKey}`);
        // if (!response.ok) {
        //     throw new Error(`Something went wrong!`);
        // }
        const responseData = await response.json();
        // if (!responseData.results) {
        //     throw new Error(`Something went wrong!`);
        // }
        // const address = responseData.results[0].formatted_address;
        const address = 'Fake address';
        const fileName = imageUri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: imageUri,
                to: newPath
            });
            const { insertId: id } = await insertPlace(title, imageUri, address, lat, lng);
            dispatch({ type: ADD_PLACE, payload: { id, title, imageUri: newPath, address, coords: { lat, lng } } });
        } catch (e) {
            throw e;
        }
    };
};
