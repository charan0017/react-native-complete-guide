import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/actions/places';
import { ImagePicker, LocationPicker } from '../components/';

const NewPlaceScreen = ({ navigation, route }) => {
    const pickedLocation = route.params?.pickedLocation ?? null;
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const dispatch = useDispatch();

    const titleChangeHandler = (text) => {
        // could add validation
        setTitle(text);
    };

    const imageTakenHandler = (imgUri) => {
        setImageUri(imgUri);
    };

    const locationPickedHandler = useCallback((location) => {
        setLat(location.lat);
        setLng(location.lng);
    }, [setLat, setLng]);

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(title, imageUri, lat, lng));
        navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    value={title}
                    onChangeText={titleChangeHandler}
                />
                <ImagePicker onImagePicked={imageTakenHandler} />
                <LocationPicker navigation={navigation} selectedLocation={pickedLocation} onLocationPicked={locationPickedHandler} />
                <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    )
};

NewPlaceScreen.navigationOptions = {
    title: 'Add Place'
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;
