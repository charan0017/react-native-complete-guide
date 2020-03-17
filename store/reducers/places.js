import Place from '../../models/place';
import { ADD_PLACE, SET_PLACES } from '../actions/places';

const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE: {
            const { id, title, imageUri, address, coords } = action.payload;
            const newPlace = new Place(id.toString(), title, imageUri, address, coords.lat, coords.lng);
            return {
                places: [newPlace].concat(state.places)
            };
        }
        case SET_PLACES: {
            const { places } = action.payload;
            return {
                places: places.map(p => new Place(p.id.toString(), p.title, p.imageUri, p.address, p.lat, p.lng))
            }
        }
        default: return state;
    }
};
