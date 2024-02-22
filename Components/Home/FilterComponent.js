import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Button, Dialog, Portal } from 'react-native-paper';
import Vibrate from '../Vibrate';

const FilterComponent = () => {
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    return (
        <View>
            <TouchableOpacity
                onPress={() => { Vibrate(); showDialog() }}
                className='flex items-center justify-between flex-row gap-3'>
                <View className='p-2 bg-slate-200 rounded-full flex items-center justify-center'>
                    <Ionicons name="filter" size={24} color="black" />
                </View>
                <Text>filter</Text>
            </TouchableOpacity>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Filter</Dialog.Title>
                    <Dialog.Content>

                        <Text>Orientation</Text>
                        <Text>sort by</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

export default FilterComponent