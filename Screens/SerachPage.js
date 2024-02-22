import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const SerachPage = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <SafeAreaView>
            <ScrollView className='p-4' >

                <Searchbar
                    placeholder="Search photos..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    autoFocus={true}
                />
                <View className='m-1 p-2 flex gap-2 flex-row items-center justify-start mt-2'>
                    <MaterialIcons name="history" size={24} color="black" />
                    <Text>Cats</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SerachPage