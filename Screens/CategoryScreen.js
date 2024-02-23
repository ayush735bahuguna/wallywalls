import { View, Text, StatusBar, FlatList, ScrollView, Dimensions, Touchable, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import HeaderWithDrawerIcon from '../Components/Home/HeaderWithDrawerIcon'
import { Image } from 'expo-image'

const CategoryScreen = ({ navigation }) => {
    const screenWidth = Dimensions.get("window").width;
    const Data = [
        { name: "Mountains", image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: "Cars", image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: "Nature", image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: "Fashion & Beauty", image: 'https://images.unsplash.com/photo-1593178226351-7ffb9d73632a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D' },
        { name: "Animals", image: 'https://plus.unsplash.com/premium_photo-1708366645058-2609c773269e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D' },
        { name: "Sports", image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnRzfGVufDB8fDB8fHww' },
    ]

    const DataGrid = [
        { name: "Street Photography", image: 'https://images.unsplash.com/photo-1707210019732-d55b1bca658c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D' },
        { name: "Bikes", image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlrZXN8ZW58MHx8MHx8fDA%3D' },
        { name: "Science", image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D' },
        { name: "Textures & Patterns", image: 'https://images.unsplash.com/photo-1708461244988-6c1898d91066?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8aVVJc25WdGpCMFl8fGVufDB8fHx8fA%3D%3D' },
        { name: "Food & Drink", image: 'https://images.unsplash.com/photo-1708278419991-b0da8b5acd05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfHhqUFI0aGxrQkdBfHxlbnwwfHx8fHw%3D' },
        { name: "Spirituality", image: 'https://images.unsplash.com/photo-1601779144625-d149a6214af7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Xzh6Rkh1aFJoeW98fGVufDB8fHx8fA%3D%3D' },
    ]

    return (
        <ScrollView>
            <View className='p-3' style={{ marginTop: StatusBar.currentHeight }}>
                <HeaderWithDrawerIcon name='Category' navigation={navigation} />

                <View className='flex flex-wrap items-center justify-center flex-row mt-5'>
                    {DataGrid?.map((item, index) => {
                        return <TouchableWithoutFeedback key={index} onPress={() => {
                            navigation.navigate('Search', { query: item?.name })
                        }}>
                            <View className='m-1 rounded-xl relative'>
                                <Text className='absolute bottom-0 z-10 text-xl text-white font-bold p-2'>{item?.name}</Text>
                                <Image source={{ uri: item?.image }} className='rounded-md' style={{ width: screenWidth / 2 - 20, height: screenWidth / 2 - 30 }} blurRadius={0.5} />
                            </View>
                        </TouchableWithoutFeedback>
                    })}
                </View>



                <View>
                    {Data?.map((item, index) => {
                        return <TouchableWithoutFeedback key={index} onPress={() => {
                            navigation.navigate('Search', { query: item?.name })
                        }}>
                            <View key={index} className='m-1 rounded-xl relative'>
                                <Text className='absolute font-bold bottom-0 z-10 text-xl text-white p-2'>{item?.name}</Text>
                                <Image source={{ uri: item?.image }} className='rounded-md h-[120px] w-full' blurRadius={0.5} />
                            </View>
                        </TouchableWithoutFeedback>
                    })}
                </View>
            </View>
        </ScrollView>

    )
}

export default CategoryScreen