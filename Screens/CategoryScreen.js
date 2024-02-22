import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import HeaderWithDrawerIcon from '../Components/Home/HeaderWithDrawerIcon'

const CategoryScreen = ({ navigation }) => {
    return (
        <View className='p-3' style={{ marginTop: StatusBar.currentHeight }}>
            <HeaderWithDrawerIcon name='Category' navigation={navigation} />
        </View>
    )
}

export default CategoryScreen