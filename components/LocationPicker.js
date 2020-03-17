import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = ({ navigation, selectedLocation, onLocationPicked }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState(null);

    useEffect(() => {
        if (!selectedLocation) return;
        setPickedLocation(selectedLocation);
        onLocationPicked(selectedLocation);
    }, [selectedLocation, onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use the app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) return;
        setIsFetching(true);
        try {
            const locationData = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            const location = {
                lat: locationData.coords.latitude,
                lng: locationData.coords.longitude
            };
            setPickedLocation(location);
            onLocationPicked(location);
        } catch (e) {
            Alert.alert(
                'Could not fetch location',
            'Please try again later or pick a location on the map.',
            [{ text: 'Okay' }]
            );
        }
        setIsFetching(false);
    };

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    };

    return (
        <View style={styles.locationPicker}>
                <MapPreview
                    style={styles.mapPreview}
                    location={pickedLocation}
                    onPress={pickOnMapHandler}
                >
                {isFetching
                    ? <ActivityIndicator style='large' color={Colors.primary} />
                    : <Text>No location chosen yet!</Text>}
                </MapPreview>
            <View style={styles.actions}>
                <Button title='Get User Location' color={Colors.primary} onPress={getLocationHandler} />
                <Button title='Pick on Map' color={Colors.primary} onPress={pickOnMapHandler} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;
