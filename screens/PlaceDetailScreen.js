import React, { useLayoutEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { MapPreview } from '../components';
import Colors from '../constants/Colors';

const PlaceDetailScreen = ({ navigation, route }) => {
    const placeId = route.params?.placeId ?? null;
    const selectedPlace = useSelector(state => state.places.places.find(({ id }) => placeId));
    let selectedLocation;

    if (selectedPlace) {
        selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };
    }

    useLayoutEffect(() => {
        if (!selectedPlace) return;
        navigation.setOptions({
            title: selectedPlace.title
        });
    }, [navigation, selectedPlace]);

    const showMapHandler = () => {
        navigation.navigate('Map', {
            readonly: true,
            initialLocation: selectedLocation
        });
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedPlace.address}</Text>
                </View>
                <MapPreview
                    style={styles.mapPreview}
                    location={selectedLocation}
                    onPress={showMapHandler}
                />
            </View>
        </ScrollView>
    );
};

PlaceDetailScreen.navigationOptions = {
    title: 'Place Detail'
};

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

export default PlaceDetailScreen;
