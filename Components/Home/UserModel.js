import * as React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';

import { Entypo } from '@expo/vector-icons';

const UserModel = ({ visible, setVisible, UserObject }) => {
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 10 };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text className='font-bold text-2xl text-center mb-4'>{UserObject.name}</Text>
                <View className='flex items-center justify-center'>
                    <TouchableOpacity
                        className='flex flex-row gap-2 py-2 w-1/2'
                        onPress={() => { Linking.openURL('https://www.instagram.com/' + UserObject.social?.instagram_username) }}
                    >
                        <Entypo name="instagram" size={24} color="red" />
                        <Text>Instragram handle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='flex flex-row gap-2 py-2 w-1/2'
                        onPress={() => { Linking.openURL(UserObject.social?.portfolio_url) }}
                    >
                        <Entypo name="link" size={24} color='black' />
                        <Text>Website link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='flex flex-row gap-2 py-2 w-1/2 '
                        onPress={() => { Linking.openURL('https://twitter.com/' + UserObject.social?.twitter_username) }}
                    >
                        <Entypo name="twitter" size={24} color="blue" />
                        <Text>twitter account</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Portal>
    );
};

export default React.memo(UserModel);


