import * as React from 'react';
import { Modal, Portal, Text } from 'react-native-paper';

const UserModel = ({ visible, setVisible, UserObject }) => {
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>{UserObject.name}</Text>
            </Modal>
        </Portal>
    );
};

export default React.memo(UserModel);


