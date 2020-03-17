import React, { useState, useLayoutEffect, useCallback } from 'react';
import { Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const TouchableCmp = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const MapScreen = ({ navigation, route }) => {
    const readonly = route.params?.readonly ?? false;
    const initialLocation = route.params?.initialLocation ?? false;
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    let markerCoordinates;
    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = (event) => {
        if (readonly) return;
        const { latitude: lat, longitude: lng } = event.nativeEvent.coordinate;
        setSelectedLocation({ lat, lng });
    };

    const saveSelectedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            // could show an alert
            return;
        }
        navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
    }, [selectedLocation]);

    useLayoutEffect(() => {
        if (readonly) {
            navigation.setOptions({
                title: 'Selected Map Location'
            });
            return;
        }
        navigation.setOptions({
            title: 'Select Map Location',
            headerRight: () => (
                <TouchableCmp style={styles.headerButton} onPress={saveSelectedLocationHandler}>
                    <Text style={styles.headerButtonText}>Save</Text>
                </TouchableCmp>
            )
        });
    }, [navigation, saveSelectedLocationHandler, readonly]);

    if (selectedLocation) {
        const { lat: latitude, lng: longitude } = selectedLocation;
        markerCoordinates = { latitude, longitude };
    }

    return (
        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}
        >
            {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates} />}
        </MapView>
    );
};


MapScreen.navigationOptions = {
    title: 'Map'
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default MapScreen;
