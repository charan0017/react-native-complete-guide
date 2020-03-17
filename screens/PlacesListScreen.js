import React, { useEffect } from 'react';
import { Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButton } from '../components/UI';
import { PlaceItem } from '../components';
import * as placesActions from '../store/actions/places';

const PlacesListScreen = ({ navigation }) => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);

    return (
        <FlatList
            data={places}
            renderItem={({ item: place }) => (
                <PlaceItem
                    title={place.title}
                    image={place.imageUri}
                    address={place.address}
                    onSelect={() => navigation.navigate('PlaceDetail', { placeId: place.id })}
                />
            )}
        />
    )
};

PlacesListScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'All Places',
        headerRight: () => (
            <HeaderButtons title='new-place-icon' HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add Place'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => navigation.navigate('NewPlace')}
                />
            </HeaderButtons>
        )
    };
};

export default PlacesListScreen;
