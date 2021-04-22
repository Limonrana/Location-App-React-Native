import React from 'react';
import { Button, Image, Modal, Text, View } from 'react-native';

const PlaceDetails = ({ place, handleHideModal, handleDeteteItem }) => (
    <Modal>
        <View>
            <Image source={place.imageLink} style={{ width: '100%', height: 300 }} />
            <Text style={{ margin: 15, textAlign: 'center', fontSize: 40 }}>{place.value}</Text>
            <Button
                title="Delete"
                color="red"
                onPress={() => {
                    handleDeteteItem(place.key);
                }}
            />
            <Button title="Close" onPress={() => handleHideModal()} />
        </View>
    </Modal>
);

export default PlaceDetails;
