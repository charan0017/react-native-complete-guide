import React from 'react';

const CreateScreen = (Screen, name, component) => (
    <Screen
        key={`${name}-${Math.random()}`}
        name={name}
        component={component}
        options={component.navigationOptions}
    />
);

export default CreateScreen;
