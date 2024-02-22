import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Button, Dialog, Portal } from 'react-native-paper';
import Vibrate from '../Vibrate';

const FilterComponent = ({ setSort, Sort }) => {
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
                <Text>Sort by</Text>
            </TouchableOpacity>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Sort by</Dialog.Title>
                    <Dialog.Content>

                        {/* <Text>Orientation</Text>
                        <Text>portrait</Text>
                        <Text>squarish</Text>
                        <Text>landscape</Text> */}
                        <TouchableOpacity onPress={() => { setSort('popular') }}
                            className={`${Sort === 'popular' && 'bg-slate-300'} p-3 rounded-lg`}
                        ><Text>popular</Text></TouchableOpacity>

                        <TouchableOpacity onPress={() => { setSort('latest') }}
                            className={`${Sort === 'latest' && 'bg-slate-300'} p-3 rounded-lg`}
                        ><Text>latest</Text></TouchableOpacity>


                        <TouchableOpacity onPress={() => { setSort('oldest') }}
                            className={`${Sort === 'oldest' && 'bg-slate-300'} p-3 rounded-lg`}
                        ><Text>oldest</Text></TouchableOpacity>

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